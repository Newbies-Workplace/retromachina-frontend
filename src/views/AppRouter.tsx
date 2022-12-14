import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomeView from "./home/HomeView";
import {SignInView} from "./auth/SignIn/SignInView";
import Loading from './auth/LoadingPage/LoadingPage';
import {RequireAuth} from '../component/require_auth/RequireAuth';
import {RetroCreateView} from './retro_create/RetroCreateView';
import TeamEditView from './team_edit/TeamEditView';
import RetroActiveView from './retro_active/RetroActiveView';
import {TeamCreateView} from "./team_create/TeamCreateView";
import {RetroWrapper} from "./retro_active/RetroWrapper";
import { SummaryView } from './summary/SummaryView';
import {NotFoundView} from "./404/NotFoundView";
import {Navigate} from "react-router";

export const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/signin"
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
                                <RetroActiveView/>
                            </RetroWrapper>
                        </RequireAuth>
                    }/>

                <Route
                    path="/retro/:retroId/summary"
                    element={
                        <RequireAuth>
                            <SummaryView/>
                        </RequireAuth>
                    }/>

                <Route
                    path="*"
                    element={<Navigate to={"/404"}/>}/>
                <Route
                    path="/404"
                    element={<NotFoundView/>}/>
            </Routes>
        </Router>
    )
}