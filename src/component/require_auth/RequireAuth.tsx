import React, { useEffect, useState } from 'react';
import {Navigate, useLocation} from "react-router";
import { useUser } from '../../context/UserContext.hook';
import {LoadingView} from '../loading_view/LoadingView';
import {setRedirectPath} from "../../context/useRedirect";

interface RequireAuthProps {
    fallback?: JSX.Element;
}

export const RequireAuth: React.FC<React.PropsWithChildren<RequireAuthProps>> = ({fallback, children}) => {
    const {user, refreshUser} = useUser();
    const [busy, setBusy] = useState(true);
    const {pathname} = useLocation()

    useEffect(() => {
        if (user) 
            return;

        const waitForUser = async () => {
            await refreshUser();
            setBusy(false);
        }

        waitForUser();
    });

    if (busy) {
        return <LoadingView/>
    }

    if (user) {
        return <>{children}</>
    }

    if (fallback) {
        return fallback
    }

    setRedirectPath(pathname)
    return <Navigate to={'/signin'} />
}