import React, { useEffect, useState } from 'react';
import { Navigate } from "react-router";
import { useUser } from '../../context/UserContext.hook';
import LoadingView from '../loading_view/LoadingView';

interface RequireAuthProps {
    fallback?: JSX.Element;
    children: any;
}

export const RequireAuth: React.FC<RequireAuthProps> = ({fallback, children}) => {
    const { user, refreshUser } = useUser();
    const [ busy, setBusy ] = useState(true);

    useEffect(() => {
        const waitForUser = async () => {
            await refreshUser();
            setBusy(false);
        }

        waitForUser();
    });

    if (busy) 
        return <LoadingView />

    if (user)
        return <>{children}</>

    return fallback || <Navigate to={`/signin`} />

    
}