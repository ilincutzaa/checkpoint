import LogoutButton from "@/app/components/logout-button.jsx";
import profile from "@/app/img/profile.svg";
import Image from "next/image";
import {useEffect, useRef, useState} from "react";
import styles from "./profile-menu.module.css";
import TwoFactorSetupModal from "@/app/components/two-factor-setup-modal.jsx";

export default function ProfileMenu() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [username, setUsername] = useState("");
    const menuRef = useRef();
    const [is2faEnabled, setIs2faEnabled] = useState(false);
    const [show2FAModal, setShow2FAModal] = useState(false);

    useEffect(() => {
        fetch("/api/me")
            .then((res) => res.json())
            .then((data) => {
                if(data.loggedIn) {
                    setUsername(data.username);
                    setIs2faEnabled(data.is2faEnabled);
                }
                else
                    setUsername('user')
            })
    }, [])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsExpanded(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    function disable2faHandler(){
        const confirmed = confirm("Do you really want to disable 2FA?");
        if(!confirmed) return;

        fetch("/api/2fa/teardown", {
            method: "POST",
        })
            .then((res) => res.text())
            .catch((error) => {console.error(error); });

        setIs2faEnabled(false);
    }


    return (
        <div>
            {show2FAModal &&
                <TwoFactorSetupModal
                    onClose={() => setShow2FAModal(false)}
                    on2faVerified={() => {
                        setIs2faEnabled(true);
                    }}
                />}

            <div ref={menuRef} className={styles.menu}>
                <p>Hello, {username}!</p>
                <Image
                    src={profile}
                    alt="Menu"
                    width={40}
                    height={40}
                    clickable="true"
                    className={styles.img}
                    onClick={() => {setIsExpanded(!isExpanded)}}
                />
                {isExpanded && (
                    <div>
                        <ul className={styles.ul}>
                            <li className={styles.li}>
                                <LogoutButton/>
                            </li>
                            {!is2faEnabled ? (
                                <li className={styles.li}>
                                    <button
                                        className={styles.button}
                                        onClick={() => setShow2FAModal(true)}
                                    >Enable 2FA</button>
                                </li>
                            ) : (
                                <li className={styles.li}>
                                    <button
                                        className={styles.button}
                                        onClick={disable2faHandler}
                                    >Disable 2FA</button>
                                </li>
                            )}


                        </ul>
                    </div>
                )}
            </div>
        </div>

    )
}