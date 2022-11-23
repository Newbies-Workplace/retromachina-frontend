import {useRetro} from "../../../context/RetroContext.hook"
import styles from "./ReflectionView.module.scss"
import {Column} from "../../../component/column/Column"
import DeleteIconSvg from "../../../assets/icons/delete-icon.svg"
import { useUser } from "../../../context/UserContext.hook"

export const ReflectionView = () => {
    const {user} = useUser();
    const {teamUsers, columns, cards, setWriting, createCard, deleteCard} = useRetro()

    return (
        <div className={styles.container}>
            {columns?.map((column) => {
                const columnCards = cards.filter(c => c.columnId === column.id)

                return (
                    <Column
                        cardContent={(cardId)=>{
                            return <DeleteIconSvg style={{cursor: "pointer"}} onClick={() => deleteCard(cardId)}/>
                        }}
                        key={column.id}
                        columnData={column}
                        cards={columnCards.filter((card) => card.authorId === user?.user_id)}
                        onCardCreated={(value) => {
                            createCard(value, column.id)
                        }}
                        onIsWriting={(value) => {
                            setWriting(value, column.id);
                        }}
                        users={teamUsers}
                    />
                )
            })}
        </div>
    );
}

