import React, {useEffect, useState} from 'react';
import {Button} from '../button/Button';
import styles from './TeamForm.module.scss'
import AddIconSvg from '../../assets/icons/add-icon.svg'
import DeleteIcon from '../../assets/icons/delete-icon.svg'
import { Team } from '../../interfaces/Team.interface';
import {Input} from "../input/Input";

interface CreateTeamFormProps {
    userEmail: string
    team: Team | null
    onSubmit: (team: Team) => void
    onDelete?: () => void
    deletable?: boolean
}

export const TeamForm: React.FC<CreateTeamFormProps> = ({userEmail, team, onSubmit, onDelete, deletable}) => {
    const [emails, setEmails] = useState(team?.emails || []);
    const [name, setName] = useState(team?.name || "");
    const [email, setEmail] = useState("");

    const onAddEmailClick = () => {
        if (email.trim().length == 0) {
            return;
        }

        setEmails([...emails, email]);
        setEmail("")
    }

    const onDeleteEmailClick = (index: number) => {
        let _emails = [...emails];
        _emails.splice(index, 1);

        setEmails(_emails);
    }

    const onSubmitClick = () => {
        onSubmit({
            name: name || "",
            emails: emails
        });
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.formWrapper}>
                    <div className={styles.section}>
                        <h1>Team</h1>
                        <Input value={name} setValue={setName} placeholder={"Nazwa zespołu"} style={{border: "none", paddingLeft: "10px"}}/>
                    </div>

                    <div className={styles.section}>
                        <h1>Scrum Master</h1>
                        <span style={{wordBreak: 'break-all'}}>Ty ({userEmail})</span>
                    </div>

                    <div className={styles.section}>
                        <h1>Członkowie</h1>

                        {emails?.map((email, index) =>
                            <div className={styles.mailBox} key={email}>
                                {email}
                                <DeleteIcon style={{cursor: 'pointer'}} onClick={() => onDeleteEmailClick(index)}/>
                            </div>
                        )}

                        <Input
                            value={email}
                            setValue={setEmail}
                            placeholder={'Wpisz email'}
                            right={<AddIconSvg style={{cursor: 'pointer'}} onClick={() => onAddEmailClick()}/>}
                            style={{border: "none", paddingLeft: "10px"}}/>
                    </div>
                </div>
                <div className={styles.actionSection}>
                    { deletable ? ( 
                        <Button style={{backgroundColor: "#DC6E47"}} onClick={onDelete}>
                            Usuń
                        </Button>
                    ): (
                    <span></span>
                    )}

                    <Button onClick={onSubmitClick}>
                        Zapisz
                    </Button>
                </div>
            </div>
        </div>
    );
}