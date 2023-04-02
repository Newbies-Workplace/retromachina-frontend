import {useUser} from '../../context/UserContext.hook'
import {useNavigate} from 'react-router'
import {TeamForm} from '../../component/forms/TeamForm';
import {TeamRequest} from '../../api/team/Team.interface';
import Navbar from '../../component/navbar/Navbar';
import {createTeam} from '../../api/team/Team.service';
import React from "react";
import {HeaderBar} from "../../component/header_bar/HeaderBar";
import {toast} from "react-toastify";

export const TeamCreateView: React.FC = () => {
    const { user, refreshUser } = useUser();
    const navigate = useNavigate()

    const onSubmit = (team: TeamRequest) => {
        createTeam(team)
            .then(() => {
                refreshUser()
                    .then(() => {
                        navigate("/");
                    })
            })
            .then(() => {
                toast.success('Zespół stworzono')
            })
            .catch((e) => {
                console.log(e)
                toast.error('Wystąpił błąd')
            })
    }

    return (
        <>
            <Navbar>
                <HeaderBar text="Tworzenie Zespołu" />
            </Navbar>
            <TeamForm onSubmit={onSubmit} userEmail={user?.email || ""} team={null} />
        </>
    );
};
