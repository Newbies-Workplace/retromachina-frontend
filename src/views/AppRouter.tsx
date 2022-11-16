import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import HomeView from "./home/HomeView";
import SignInView from "./auth/signIn/SignInView";
import Loading from './auth/signIn/LoadinPage/LoadingPage';
import { UserContext } from '../context/UserContext';
import CreateTeamview from './create_team/CreateTeamView';
import { RequireAuth } from '../component/require_auth/RequireAuth';
import EditTeamView from './edit_team/EditTeamView';

export const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                
                    <Route
                        element={<SignInView/>}
                        path="/signin"/>

                        <Route
                            element={ <RequireAuth><HomeView/></RequireAuth>}
                            path="/"/>

                        <Route
                            element={<Loading/>}
                            path="/loading"/>
                        
                        <Route
                            element={<RequireAuth><CreateTeamview/></RequireAuth>}
                            path="/team/create"/>
                        
                        <Route
                            element={<RequireAuth><EditTeamView/></RequireAuth>}
                            path="/team/:teamId/edit"/>

                        <Route
                            element={<RequireAuth><CreateTeamview /></RequireAuth>}
                            path="/edit"/>

                        <Route
                            element={<RequireAuth><p>Lista Zadań</p></RequireAuth>}
                            path="/tasks"/>

                        <Route
                            element={<RequireAuth><p>Retro</p></RequireAuth>}
                            path="/retro"/>
                    
                    <Route
                        element={<span>404</span>}
                        path="*"/>
            </Routes>
        </Router>
    )
}