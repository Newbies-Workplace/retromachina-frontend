import React, {useEffect, useRef, useState} from "react";
import styles from "./Backdrop.module.scss"
import {Portal} from "react-portal";

interface PositioningBackdropProps {
    onDismiss: () => void
    visible?: boolean
    children: React.ReactNode
}

export const PositioningBackdrop: React.FC<PositioningBackdropProps> = (
    {
        children,
        visible = true,
        onDismiss
    }
) => {
    const boxRef = useRef<HTMLDivElement>(null)
    const [pos, setPos] = useState({x: 0, y: 0, w: 0, h: 0})
    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    });

    useEffect(() => {
        const ref = boxRef.current

        if (ref) {
            const viewportOffset = ref.getBoundingClientRect();
            const newPos = {
                x: viewportOffset.left,
                y: viewportOffset.top,
                h: ref.clientHeight,
                w: ref.clientWidth,
            }

            setPos(newPos)
        }
    }, [visible, windowSize])

    return (
        <>
            {visible &&
                <Portal>
                    <div className={styles.backdrop} onClick={onDismiss} />

                    <div style={{
                        position: 'absolute',
                        top: pos.y,
                        left: pos.x,
                        width: pos.w,
                        height: pos.h
                    }}>
                        {children}
                    </div>
                </Portal>
            }

            <div ref={boxRef}>
                {visible
                    ? <div style={{
                        display: 'flex',
                        width: pos.w,
                        height: pos.h
                    }}/>
                    : children
                }
            </div>
        </>
    )
}