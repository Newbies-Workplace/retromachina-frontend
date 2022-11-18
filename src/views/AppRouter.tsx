import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomeView from "./home/HomeView";
import {SignInView} from "./auth/signIn/SignInView";
import Loading from './auth/LoadingPage/LoadingPage';
import {RequireAuth} from '../component/require_auth/RequireAuth';
import {RetroCreateView} from './retro_create/RetroCreateView';
import TeamEditView from './team_edit/TeamEditView';
import ActiveRetro from './active_retro/ActiveRetro';
import {TeamCreateView} from "./team_create/TeamCreateView";

export const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route
                    path="/signin"
                    element={<SignInView/>}/>
                <Route
                    path="/loading"
                    element={<Loading/>}/>

                <Route
                    path="/"
                    element={<RequireAuth><HomeView/></RequireAuth>}/>

                <Route
                    path="/team/create"
                    element={<RequireAuth><TeamCreateView/></RequireAuth>}/>
                <Route
                    path="/team/:teamId/edit"
                    element={<RequireAuth><TeamEditView/></RequireAuth>}/>
                <Route
                    path="/tasks"
                    element={<RequireAuth><p>Lista Zadań</p></RequireAuth>}/>

                <Route
                    path="/retro/create"
                    element={<RequireAuth><RetroCreateView/></RequireAuth>}/>
                <Route
                    path="/retro/:retroId"
                    element={<RequireAuth><ActiveRetro/></RequireAuth>}/>

                <Route
                    path="*"
                    element={<span>404</span>}/>
            </Routes>
        </Router>
    )
}