import styles from './TeamCreateCard.module.scss'
import AddIconSvg from '../../assets/icons/add-icon.svg'
import Button from '../button/Button'

const TeamCreateCard = () => {

    return(
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <form>
                    <div className={styles.teamName}>
                        <label >Team</label>
                        <input type="text" name="" id="" placeholder='Nazwa Zespołu' />
                    </div>
                    <div className={styles.scrumMaster}>
                        <label>Scrum Master</label>
                        <p>Ty</p>
                    </div>
                    <div className={styles.members}>
                        <label>Członkowie</label>
                        <div className={styles.mailBox}>piotrek@ziomson.pl <div><AddIconSvg/></div></div>
                        <div className={styles.plus}><input type="text" className={styles.newTeam} placeholder='Wpisz Email'/><div><AddIconSvg/></div></div>
                    </div>
                </form>
            <div className={styles.submitButton}><Button>Zapisz</Button></div>
            </div>
        </div>
    )

}

export default TeamCreateCard 