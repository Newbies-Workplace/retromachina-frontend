import React, { useRef, useState } from 'react';
import {Button} from '../button/Button';
import styles from './TeamForm.module.scss'
import AddIconSvg from '../../assets/icons/add-icon.svg'
import { Team } from '../../interfaces/Team.interface';

interface CreateTeamFormProps {
    userEmail: string
    team: Team | null
    onSubmit: (team: Team) => void
}

export const TeamForm: React.FC<CreateTeamFormProps> = ({userEmail, team, onSubmit}) => {
    const [emails, setEmails] = useState(team?.emails || []);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const nameInputRef = useRef<HTMLInputElement>(null);

    const addEmail = () => {
        if (!emailInputRef.current || emailInputRef.current.value.trim().length == 0) return;

        setEmails([...emails, emailInputRef.current.value]);
        emailInputRef.current.value = "";
        emailInputRef.current.scrollIntoView();
    }

    const deleteEmail = (index: number) => {
        let _emails = [...emails];
        _emails.splice(index, 1);

        setEmails(_emails);
    }

    const onSubmitClick = () => {
        onSubmit({
            name: nameInputRef.current?.value || "",
            emails: emails
        });
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.innerFormWrapper}>
                    <div className={styles.teamName}>
                        <label>Team</label>
                        <input
                            ref={nameInputRef}
                            type="text"
                            name=""
                            id=""
                            defaultValue={team?.name || ""}
                            placeholder='Nazwa zespołu'/>
                    </div>
                    <div className={styles.scrumMaster}>
                        <label>Scrum Master</label>
                        <p>Ty ({userEmail})</p>
                    </div>
                    <div className={styles.members}>
                        <label>Członkowie</label>
                        {emails?.map((email: string, index) =>
                            <div className={styles.mailBox} key={email}>
                                {email}
                                <div className={styles.clickable} onClick={() => deleteEmail(index)}>
                                    <AddIconSvg/>
                                </div>
                            </div>
                        )}
                        <div className={styles.emailWrapper}>
                            <input ref={emailInputRef} type="email" className={styles.newTeam} placeholder='Wpisz email'/>
                            <div className={styles.plus}>
                                <AddIconSvg onClick={addEmail}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.submitButtonWrapper}>
                    <div className={styles.submitButton}>
                        <Button onClick={onSubmitClick} size="medium">Zapisz</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}