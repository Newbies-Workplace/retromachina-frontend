import Navbar from "../../component/navbar/Navbar"
import { useUser } from "../../context/UserContext.hook";
import Tile from "../../component/header_bar/HeaderBar";
import ColumnHeader from "../../component/column_header/ColumnHeader";
import style from './RetroCreateView.module.scss'
import Button from "../../component/button/Button";
import AddIcon from '../../assets/icons/add-icon.svg'
import ColumnCreate from "../../component/column_create/ColumnCreate";

export const RetroCreateView: React.FC = () => {
    const { user } = useUser();
    const isScrumMaster = user?.user_type == "SCRUM_MASTER";
    return( 
        <>
            <Navbar isScrumMaster={isScrumMaster} isOnRun={false} isButtonHiden={true}><Tile text="Edycja Kolumn"></Tile></Navbar> 
            <div className={style.container}>
                <div className={style.columns}>
                    <ColumnHeader color="green" withDescription={false} header="Pąki">NO siema v2</ColumnHeader>
                    <ColumnHeader color="red" withDescription={true} header="Kwiaty">NO siema v2</ColumnHeader>
                    <ColumnCreate/>
                    <Button size="big" > <p>Nowa Kolumna</p><AddIcon /></Button> 
                </div>
            </div>
        </>
    )
}