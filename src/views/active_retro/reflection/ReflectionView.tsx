import {useRetro} from "../../../context/RetroContext.hook"
import styles from "./ReflectionView.module.scss"
import {Column} from "../../../component/column/Column"

export const ReflectionView = () => {
    const {teamUsers, columns, cards, setWriting, createCard} = useRetro()

    return (
        <div className={styles.container}>
            {columns?.map((column) => {
                const columnCards = cards.filter(c => c.columnId === column.id)

                return (
                    <Column
                        key={column.id}
                        columnData={column}
                        cards={columnCards}
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

