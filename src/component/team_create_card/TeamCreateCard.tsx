import styles from './TeamCreateCard.module.scss'
import AddIconSvg from '../../assets/icons/add-icon.svg'
import Button from '../button/Button'
import { useRef, useState } from 'react'
import { axiosInstance } from '../../AxiosInstance'
import { useUser } from '../../context/UserContext.hook'
import { useNavigate } from 'react-router'


const TeamCreateCard: React.FC = () => {

    function addEmail() {
        if (!emailInputRef.current 
            || emailInputRef.current.value.trim().length == 0) return;
        
        setEmails([...emails, emailInputRef.current.value]);
        emailInputRef.current.value = "";
        emailInputRef.current.scrollIntoView();
    }

    function deleteEmail(index: number) {
        let _emails = [...emails];
        _emails.splice(index, 1);

        setEmails(_emails);
    }

    function submit() {
        if (!nameInputRef.current 
            || nameInputRef.current.value.trim().length == 0) return;

        console.log("submit!")
        axiosInstance.post("/teams", {
                name: nameInputRef.current.value,
                emails: emails
        }).then((response) => {
            if (response.status == 201) 
                navigate("/")
            else {
                //coś się musi stać???
                console.log(response.status);
            }
        })
    }

    const [emails, setEmails] = useState(Array<string>());
    const emailInputRef = useRef<HTMLInputElement>(null);
    const nameInputRef = useRef<HTMLInputElement>(null);
    const { user } = useUser();
    const navigate = useNavigate()

    if (!user) navigate("/signin");
    console.log(user);


    let counter = -1;

    return(
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <form>
                    <div className={styles.innerFormWrapper}>
                        <div className={styles.teamName}>
                            <label>Team</label>
                            <input ref={nameInputRef} type="text" name="" id="" placeholder='Nazwa zespołu' />
                        </div>
                        <div className={styles.scrumMaster}>
                            <label>Scrum Master</label>
                            <p>Ty ({user?.email})</p>
                        </div>
                        <div className={styles.members}>
                            <label>Członkowie</label>
                                {
                                    emails.map((email: string, key) => {
                                        counter++;
                                        
                                        return <div className={styles.mailBox} key={key}>
                                            {email}
                                            <div className={styles.clickable} onClick={deleteEmail.bind(this, counter)}><AddIconSvg/></div>
                                        </div>
                                    })
                                }
                                <div className={styles.emailWrapper}>
                                    <input ref={emailInputRef} type="email" className={styles.newTeam} placeholder='Wpisz email'/>
                                    <div className={styles.plus}><AddIconSvg onClick={addEmail}/></div>
                                </div>
                        </div>
                    </div>
                </form>
                <div className={styles.submitButtonWrapper}>
                    <div className={styles.submitButton}>
                        <Button onClick={submit}>Zapisz</Button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default TeamCreateCard 