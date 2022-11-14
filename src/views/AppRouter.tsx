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
                            element={<RequireAuth><Loading/></RequireAuth>}
                            path="/loading"/>
                        
                        <Route
                            element={<RequireAuth><CreateTeamview/></RequireAuth>}
                            path="/create"/>

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