import styles from './toolbox.module.scss'
import {Button} from "../button/Button";
import TickIconSvg from '../../assets/icons/tick.svg'
import DeleteIconSvg from '../../assets/icons/delete-icon.svg'
import RightArrowIconSvg from '../../assets/icons/right-arrow.svg'
import LeftArrowIconSvg from '../../assets/icons/left-arrow.svg'
import HourglassIconSvg from '../../assets/icons/hourglass.svg'
import VoteIconSvg from '../../assets/icons/vote.svg'
import CheckeredFlagIconSvg from '../../assets/icons/finish-flag-svgrepo-com.svg'
import ProgressBar from "@ramonak/react-progress-bar";
import React, { useCallback, useRef, useState } from "react";
import cs from 'classnames';
import dayjs from 'dayjs';
import useClickOutside from "../../context/useClickOutside";
import { useRetro } from '../../context/RetroContext.hook';
import { useUser } from '../../context/UserContext.hook';

interface ToolboxProps {
    isScrumMaster: boolean
    isVotingVisible: boolean
    isFinishVisible: boolean

    onTimeChanged: (newTime: number | null) => void

    isReady: boolean
    onReadyChange: (ready: boolean) => void
    readyPercentage: number

    onNextClicked: () => void
    onPrevClicked: () => void
}
export const Toolbox: React.FC<React.PropsWithChildren<ToolboxProps>> = (
    {
        children,
        isScrumMaster,
        isVotingVisible,
        isFinishVisible,
        onTimeChanged,

        isReady,
        onReadyChange,
        readyPercentage,

        onNextClicked,
        onPrevClicked,
    }
) => {
    //time
    const [time, setTime] = useState(300)
    const timeText = dayjs(0).add(time, 's').format('m:ss')

    const [isTimerOpen, setOpenTimer] = useState(false)
    const [isVoteOpen, setOpenVote] = useState(false)
    const [isFinishOpen, setOpenFinish] = useState(false)

    const timePopover= useRef<any>();
    const closeTimer = useCallback(() => setOpenTimer(false), []);
    useClickOutside(timePopover, closeTimer);

    const votePopover = useRef<any>();
    const closeVote = useCallback(() => setOpenVote(false),[]);
    useClickOutside(votePopover,closeVote);

    const finishPopover = useRef<any>();
    const closeFinish = useCallback(() => setOpenFinish(false),[]);
    useClickOutside(finishPopover,closeFinish);

    const onClearTimer = () => {
        onTimeChanged(null)
        closeTimer()
        setTime(300)
    }

    const onZeroTimer = () => {
        setTime(0)
    }

    const onIncreaseTimer = (seconds: number) => {
        setTime(old => old + seconds)
    }

    const onStartTimer = () => {
        const targetTime = dayjs()
            .add(time, 's')
            .add(1, 's') // delay
            .valueOf()

        onTimeChanged(targetTime)
        closeTimer()
        setTime(300)
    }
    const {maxVotes,setMaxVotesAmount,votes,endRetro} = useRetro();
    const {user} = useUser()
    const userVotes = maxVotes - votes.filter((vote) => user?.user_id === vote.voterId).length
    return (
        <div className={styles.toolbox}>
            
                {isScrumMaster && (
                    <>
                    <div className={styles.timerbox}>
                        <Button size="medium" className={styles.timerbutton} onClick ={()=> setOpenTimer(true)}>
                            <HourglassIconSvg />
                        </Button>
                        {isTimerOpen && (
                            <div className ={styles.timeBubbleWraper} ref={timePopover}>
                                <div className={styles.timerTop}>
                                    <Button size='small' className={styles.clearButton} onClick={() => onClearTimer()}>
                                        <DeleteIconSvg width={24} height={24}/>
                                    </Button>

                                    <div className={styles.timer}>{timeText}</div>

                                    <Button size="small" onClick={() => onStartTimer()}>
                                        <TickIconSvg  width={24} height={24}/>
                                    </Button>
                                </div>

                                <div className={styles.buttonWraper}>
                                    <Button size="small" onClick={() => onZeroTimer()}>00</Button>
                                    <Button size="small" onClick={() => onIncreaseTimer(30)}>+30s</Button>
                                    <Button size="small" onClick={() => onIncreaseTimer(60)}>+1m</Button>
                                </div>
                            </div>
                        )}
                        </div>
                    </>
                    
                )}
            
            <div className={styles.votebox}>
                {isVotingVisible && isScrumMaster && (
                    <>
                        <Button size="medium" className={styles.voteboxbutton} onClick={()=>setOpenVote(true)}>
                            <VoteIconSvg />
                        </Button>

                        {isVoteOpen && (
                            <div className={styles.voteBubbleWraper} ref={votePopover}>
                                <div className={styles.votetext}>głosów na osobę</div>
                                <div className={styles.buttonWraper}>
                                    <Button size="small" className={styles.plusminusbutton} onClick={() => maxVotes>0&&setMaxVotesAmount(maxVotes-1)}>-</Button>
                                    <div className={styles.numberfield}>{maxVotes}</div>
                                    <Button size="small" className={styles.plusminusbutton} onClick={() => setMaxVotesAmount(maxVotes+1)}>+</Button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
            <div className={styles.midbox}>
                <Button
                    size="medium"
                    className={cs(
                        styles.readybutton,
                        {[styles.ready]: isReady}
                    )}
                    onClick={() => onReadyChange(!isReady)}>
                    <TickIconSvg/>
                </Button>
                <ProgressBar
                    completed={readyPercentage}
                    maxCompleted={100}
                    bgColor="#73bda8"
                    transitionDuration={"0.4s"}
                    isLabelVisible={false}
                    labelColor="#e80909"
                    height="10px"
                    baseBgColor="#F4F2E6"
                />
            </div>
            <div className={styles.votestatebox}>
                {isVotingVisible && (
                    <div className={styles.votestate}>
                        {`${userVotes}/${maxVotes}`}
                        <br/>
                        głosów
                    </div>
                )}

                {isFinishVisible && isScrumMaster && (
                    <>
                        <div className={styles.votebox}>
                            <Button className={styles.finish} size="medium" onClick={()=>setOpenFinish(true)}>
                                <CheckeredFlagIconSvg/>
                            </Button>
                        </div>

                        {isFinishOpen && (
                            <div className={styles.finishBubbleWraper} ref={finishPopover}>
                                <span className={styles.votetext}>Czy na pewno?</span>
                                <div className={styles.buttonWraper}>
                                    <Button  size="small" onClick={()=>setOpenFinish(false)}> Nie </Button>
                                    <Button size="small" className={styles.yesbutton} onClick={endRetro}> Tak </Button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
            
            {isScrumMaster && (
                    <>
                        <div className={styles.buttonbox}>
                            <Button size="small" className={styles.button} onClick={onPrevClicked}>
                                <LeftArrowIconSvg/>
                            </Button>
                            <Button size="small" className={styles.button} onClick={onNextClicked}>
                                <RightArrowIconSvg/>
                            </Button>
                        </div>
                    </>
                
            )}
            </div>
        
    );
}

