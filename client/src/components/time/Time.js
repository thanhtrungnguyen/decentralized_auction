import styles from "../../styleCss/stylesComponents/time.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { LogoutButton } from "../buttons/LogoutButton";

const Time = () => {
    const axios = useAxiosPrivate();
    const navigate = useNavigate();

    const locale = "en";
    const [today, setDate] = useState(new Date()); // Save the current date to be able to trigger an update

    const day = today.toLocaleDateString(locale, { weekday: "long" });
    const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(locale, { month: "long" })}\n\n`;

    const hour = today.getHours();
    const wish = `Good ${(hour < 12 && "Morning") || (hour < 17 && "Afternoon") || "Evening"}, `;

    const time = today.toLocaleTimeString(locale, { hour: "numeric", hour12: true, minute: "numeric" });
    useEffect(() => {
        const timer = setInterval(() => {
            // Creates an interval which will update the current data every minute
            // This will trigger a rerender every component that uses the useDate hook.
            setDate(new Date());
        }, 1000);
        return () => {
            clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
        };
    }, []);

    return (
        <>
            <div className={styles.time}>
                <label className={styles.label}>
                    {date},{time},{wish}
                </label>
                <LogoutButton />
            </div>
        </>
    );
};

export default Time;
