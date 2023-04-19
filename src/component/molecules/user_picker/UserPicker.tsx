import React, {useState} from "react";
import CloseIcon from "../../../assets/icons/close-icon.svg";
import styles from "./UserPicker.module.scss";

interface UserPickerProps {
    users: string[]
    onAdd: (email: string) => void
    onDelete: (email: string) => void
}

export const UserPicker: React.FC<UserPickerProps> = ({users, onAdd, onDelete}) => {
    const [value, setValue] = useState<string>("")

    const onMailAdd = () => {
        const mailRegex = /\S+@\S+\.\S+/;

        if (value.trim().length == 0 || !mailRegex.test(value)) {
            return;
        }

        onAdd(value);
        setValue("");
    }

    return (
        <div className={styles.picker}>
            {users.map((email) => (
                <User
                    key={email}
                    email={email}
                    onDelete={() => onDelete(email)} />
            ))}

            <div className={styles.inputWrapper}>
                <input
                    className={styles.input}
                    value={value}
                    placeholder="Podaj adres email..."
                    onBlur={onMailAdd}
                    onChange={(e) => setValue(e.currentTarget.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            onMailAdd();
                        }
                    }} />

                {value.length > 0 &&
                    <CloseIcon
                        className={styles.close}
                        onClick={() => setValue("")} />
                }
            </div>
        </div>
    );
}


interface UserProps {
    email: string
    onDelete: () => void
}

const User: React.FC<UserProps> = ({email, onDelete}) => {
    return (
        <div className={styles.user}>
            {email}

            <CloseIcon
                className={styles.close}
                onClick={onDelete} />
        </div>
    );
}