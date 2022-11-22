import React from 'react';
import {AppRouter} from './views/AppRouter';
import {UserContextProvider} from './context/UserContext';
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

import "./App.module.scss"

export const App: React.FC = () => {
    dayjs.extend(duration)

    return (
        <UserContextProvider>
            <AppRouter />
        </UserContextProvider>
    );
};
