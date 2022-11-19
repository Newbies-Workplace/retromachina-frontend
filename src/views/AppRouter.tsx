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
import {RetroWrapper} from "./active_retro/RetroWrapper";

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
                    element={<RequireAuth><span>Lista Zadań</span></RequireAuth>}/>

                <Route
                    path="/retro/create"
                    element={<RequireAuth><RetroCreateView/></RequireAuth>}/>
                <Route
                    path="/retro/:retroId/*"
                    element={
                        <RequireAuth>
                            <RetroWrapper>
                                <ActiveRetro/>
                            </RetroWrapper>
                        </RequireAuth>
                    }/>
                <Route
                    path="/retro/:retroId/summary"
                    element={<RequireAuth><span>Podsumowanko</span></RequireAuth>}/>

                <Route
                    path="*"
                    element={<span>404</span>}/>
            </Routes>
        </Router>
    )
}