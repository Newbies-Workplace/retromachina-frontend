import React from 'react';
import { AppRouter } from './views/AppRouter';
import { UserContext, UserContextProvider } from './context/UserContext';

export const App: React.FC = () => {
    return (
        <UserContextProvider>

            <AppRouter />

        </UserContextProvider>
        
    );
};
