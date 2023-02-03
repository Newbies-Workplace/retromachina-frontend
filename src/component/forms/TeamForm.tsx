import React, {useEffect, useState} from 'react';
import {Button} from '../button/Button';
import styles from './TeamForm.module.scss'
import AddIconSvg from '../../assets/icons/add-icon.svg'
import DeleteIcon from '../../assets/icons/delete-icon.svg'
import { TeamRequest } from '../../api/team/Team.interface';
import {Input} from "../input/Input";

interface CreateTeamFormProps {
    userEmail: string
    team: TeamRequest | null
    onSubmit: (team: TeamRequest) => void
    onDelete?: () => void
    deletable?: boolean
}

export const TeamForm: React.FC<CreateTeamFormProps> = ({userEmail, team, onSubmit, onDelete, deletable}) => {
    const [emails, setEmails] = useState(team?.emails || []);
    const [name, setName] = useState(team?.name || "");
    const [email, setEmail] = useState("");

    const onAddEmail = () => {
        const mailRegex = /\S+@\S+\.\S+/;

        if (email.trim().length == 0 || !mailRegex.test(email)) {
            return;
        }

        setEmails([...emails, email]);
        setEmail("")
    }

    const onDeleteEmailClick = (index: number) => {
        let newEmails = [...emails];
        newEmails.splice(index, 1);

        setEmails(newEmails);
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
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    onAddEmail()
                                }
                            }}
                            right={<AddIconSvg style={{cursor: 'pointer'}} onClick={() => onAddEmail()}/>}
                            style={{border: "none", paddingLeft: "10px"}}/>
                    </div>
                </div>
                <div className={styles.actionSection}>
                    { deletable
                        ? (
                            <Button style={{backgroundColor: "#DC6E47"}} onClick={onDelete}>
                                Usuń
                            </Button>
                        )
                        : <span />
                    }

                    <Button onClick={onSubmitClick}>
                        Zapisz
                    </Button>
                </div>
            </div>
        </div>
    );
}