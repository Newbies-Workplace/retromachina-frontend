import {useUser} from '../../context/UserContext.hook'
import {useNavigate} from 'react-router'
import {TeamForm} from '../../component/forms/TeamForm';
import {Team} from '../../interfaces/Team.interface';
import Navbar from '../../component/navbar/Navbar';
import {createTeam} from '../../api/team/Team.service';
import React from "react";
import {HeaderBar} from "../../component/header_bar/HeaderBar";

export const TeamCreateView: React.FC = () => {
    const { user, refreshUser } = useUser();
    const navigate = useNavigate()

    const onSubmit = (team: Team) => {
        createTeam(team).then((response) => {
            if (response.status == 201) {
                refreshUser()
                    .then(() => {
                        navigate("/");
                    })
            } else {
                //coś się musi stać???
                console.log(response.status);
            }
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
