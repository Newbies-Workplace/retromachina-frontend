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

export const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                
                    <Route
                        element={<SignInView/>}
                        path="/signin"/>

                    <Route
                        element={<HomeView/>}
                        path="/"/>

                    <Route
                        element={<Loading/>}
                        path="/loading"/>
                
                    <Route
                        element={<span>404</span>}
                        path="*"/>
            </Routes>
        </Router>
    )
}