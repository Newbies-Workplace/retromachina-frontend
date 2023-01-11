import React, {useCallback, useRef, useState} from "react";
import styles from "./Navbar.module.scss";
import LogoSvg from "../../assets/images/logo.svg";
import {Avatar} from "../avatar/Avatar";
import {useNavigate} from "react-router";
import {useUser} from "../../context/UserContext.hook";
import {LogoutBubble} from "../logout_bubble/LogoutBubble"
import useClickOutside from "../../context/useClickOutside";

interface NavbarProps {
    topContent?: React.ReactNode,
}

const Navbar: React.FC<React.PropsWithChildren<NavbarProps>> = ({children, topContent}) => {
    const navigate = useNavigate();
    const {user} = useUser();
    const popover = useRef<any>();
    const [isOpen, toggle] = useState(false);
    const close = useCallback(() => toggle(false), []);

    useClickOutside(popover, close);

    return (
        <div className={styles.navbar}>
            <div className={styles.sectionWrapper}>
                <div className={styles.topSection}>
                    <div className={styles.name}>
                        <LogoSvg onClick={() => navigate("/")} style={{cursor: "pointer"}}/>
                    </div>

                    <div className={styles.topContainer}>
                        {topContent}

                        <div className={styles.profile}>
                            <div onClick={() => toggle(true)}>
                                <Avatar
                                    style={{cursor: 'pointer'}}
                                    url={user?.avatar_link} />

                                {isOpen &&
                                    <div className={styles.bubbleContainer} ref={popover}>
                                        <LogoutBubble/>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.bottomSection}>
                    {children}
                </div>

                <div className={styles.line} />
            </div>
        </div>
    );
};

export default Navbar;
