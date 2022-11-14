import React from 'react';
import { Navigate, useLocation } from "react-router";
import { useUser } from '../../context/UserContext.hook';

interface RequireAuthProps {
    fallback?: JSX.Element;
    children: any;
}

export const RequireAuth: React.FC<RequireAuthProps> = ({fallback, children}) => {
    const {user} = useUser();
    const {pathname} = useLocation();
    if (user)
        return <>{children}</>
    return fallback || <Navigate to={`/signin?redirect=${pathname}`} />
}