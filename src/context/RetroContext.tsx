import React, {createContext} from "react";

interface RetroContextParams {
    retroId: string
}

interface RetroContext {

}

export const RetroContext = createContext({

})

export const RetroContextProvider: React.FC<React.PropsWithChildren<RetroContextParams>> = ({children, retroId}) => {


    return (
        <RetroContext.Provider value={{

        }}>
            {children}
        </RetroContext.Provider>
    )
}