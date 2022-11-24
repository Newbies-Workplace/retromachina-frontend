import {SocketColumn} from "../../api/socket/Socket.events";
import React, {useEffect, useState} from "react";
import {Input} from "../input/Input";
import {CardCount} from "../card_indicator/CardIndicator";

interface ColumnInputProps {
    columnData: SocketColumn,
    onCardCreated: (text: string) => void
    onIsWriting: (value: boolean) => void
}

export const ColumnInput: React.FC<ColumnInputProps> = (
    {
        columnData,
        onCardCreated,
        onIsWriting,
    }
) => {
    const [value, setValue] = useState("");
    const onStopWriting = () => {
        if (columnData.isWriting) {
            onIsWriting(false)
        }
    }

    useEffect(() => {
        if (value !== "" && !columnData.isWriting) {
            onIsWriting(true)
        }
        const timeout = setTimeout(onStopWriting, 3000)

        return () => {
            clearTimeout(timeout)
        }
    }, [value])

    return (
        <>
            <Input
                style={{backgroundColor: "#EAEAEA"}}
                value={value}
                setValue={setValue}
                multiline={true}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault()
                        onCardCreated(value);
                        setValue("");
                    }
                }} />

            <CardCount
                isWritting={columnData.isWriting}
                count={columnData.teamCardsAmount} />
        </>
    )
}