import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import HomeView from "./home/HomeView";
import SignInView from "./auth/signIn/SignInView";

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
                    element={<span>404</span>}
                    path="*"/>
            </Routes>
        </Router>
    )
}