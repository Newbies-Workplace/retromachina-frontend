import React from "react";
import {RetroContextProvider} from "../../context/RetroContext";
import {Navigate, useParams} from "react-router";

export const RetroWrapper: React.FC<React.PropsWithChildren> = ({children}) => {
    const { retroId } = useParams<{retroId: string}>();
    if (!retroId) {
        return <Navigate to={"/"}/>
    }

    return (
        <RetroContextProvider retroId={retroId}>
            {children}
        </RetroContextProvider>
    )
}