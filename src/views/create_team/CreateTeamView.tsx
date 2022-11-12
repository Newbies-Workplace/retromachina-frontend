import Navbar from "../../component/navbar/navbar";
import TeamCreateCard from "../../component/team_create_card/TeamCreateCard";
import HeaderBar from "../../component/header_bar/HeaderBar"

const  CreateTeamview: React.FC = () => {
    return(
        <>
            <Navbar isScrumMaster={true} isOnRun={false} isButtonHiden={true}><HeaderBar text="Edycja Zespołu"></HeaderBar></Navbar>
            <TeamCreateCard />
        </>
    )

}

export default CreateTeamview