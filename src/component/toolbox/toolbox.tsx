import styles from './toolbox.module.scss'
import Button from "../button/Button";
import TickIconSvg from '../../assets/icons/tick.svg'
import RightArrowIconSvg from '../../assets/icons/right-arrow.svg'
import LeftArrowIconSvg from '../../assets/icons/left-arrow.svg'
import HourglassIconSvg from '../../assets/icons/hourglass.svg'
import VoteIcongSvg from '../../assets/icons/vote.svg'
import ProgressBar from "@ramonak/react-progress-bar";
import { useState } from "react";
import cs from 'classnames';
import { useUser } from '../../context/UserContext.hook';

interface ToolboxProps {
    isScrumMaster: boolean,
    isVotingVisible: boolean,
    //isFinishVisible:boolean,


}


const Toolbox: React.FC<React.PropsWithChildren<ToolboxProps>> = ({ children, isScrumMaster, isVotingVisible, isFinishOn }) => {

    const [peopleReady, setPeopleReady] = useState(0);
    const [isReady, setReady] = useState(false);

    return (

        <div className={styles.toolbox}>
            <div className={styles.timerbox}>
                {isScrumMaster && (
                    <>

                        <Button size="medium" className={styles.timer}>
                            <HourglassIconSvg />
                        </Button>
                    </>
                )
                }
            </div>


            <div className={styles.votebox}>
                {isVotingVisible && isScrumMaster && (
                    <>
                        <Button size="medium" className={styles.voteboxbutton}>
                            <VoteIcongSvg />
                        </Button>
                    </>
                )
                }

            </div>
            <div className={styles.midbox}>
                <Button size="medium" className={cs(styles.readybutton, { [styles.ready]: isReady })} onClick={() => setReady(!isReady)}>
                    <TickIconSvg />
                </Button>
                <ProgressBar
                    completed={peopleReady}
                    maxCompleted={10}
                    bgColor="#73bda8"
                    isLabelVisible={false}
                    labelColor="#e80909"
                    height="10px"
                    baseBgColor="#F4F2E6"
                />
            </div>
            <div className={styles.votestatebox}>
                {isVotingVisible && (
                    <>
                        <div className={styles.votestate}>
                            {children}
                        </div>
                    </>
                )
                }
            </div>
            {isScrumMaster && (
                <>
                    <div className={styles.buttonbox}>
                        <Button size="small" className={styles.button}>
                            <LeftArrowIconSvg />
                        </Button>
                        <Button size="small" className={styles.button}>
                            <RightArrowIconSvg />
                        </Button>

                    </div>
                </>
            )
            }
        </div>


    );
}
export default Toolbox