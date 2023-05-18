import React, {useEffect, useState} from 'react';
import {Button} from '../../atoms/button/Button';
import styles from './TeamForm.module.scss'
import AddIconSvg from '../../../assets/icons/add-icon.svg'
import DeleteIcon from '../../../assets/icons/delete-icon.svg'
import { TeamRequest } from '../../../api/team/Team.interface';
import {Input} from "../../atoms/input/Input";
import {UserPicker} from "../../molecules/user_picker/UserPicker";

interface CreateTeamFormProps {
    userEmail: string
    team: TeamRequest | null
    onSubmit: (team: TeamRequest) => void
    onDelete?: () => void
    deletable?: boolean
}

export const TeamForm: React.FC<CreateTeamFormProps> = ({userEmail, team, onSubmit, onDelete, deletable}) => {
    //todo change emails to users
    const [emails, setEmails] = useState(team?.emails || []);
    const [name, setName] = useState(team?.name || "");

    const onAddEmail = (email: string) => {
        setEmails([...emails, email]);
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
                        <h1>Członkowie</h1>

                        <UserPicker
                            users={emails}
                            onAdd={(email) => onAddEmail(email)}
                            onDelete={(email) => onDeleteEmailClick(emails.indexOf(email))} />
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