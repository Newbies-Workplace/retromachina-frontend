import React from 'react';
import {AppRouter} from './views/AppRouter';
import {UserContextProvider} from './context/UserContext';
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

import "./App.module.scss"

export const App: React.FC = () => {
    dayjs.extend(duration)

    return (
        <DndProvider backend={HTML5Backend}>
            <UserContextProvider>
                <AppRouter />
            </UserContextProvider>
        </DndProvider>
    );
};
