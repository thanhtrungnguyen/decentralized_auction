import styles from "../../styleCss/stylesComponents/time.module.css";
import { Outlet, Link } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";

const Time = () => {
    const getUser = () => {
        var users = null;
        const token = Cookies.get("access_token");
        if (!token) {
            console.log("Not authenticated");
        }
        jwt.verify(token, process.env.REACT_APP_JWT, (err, user) => {
            users = user;
        });
        return users;
    };
    const navigate = useNavigate();

    const locale = "en";
    const [today, setDate] = useState(new Date()); // Save the current date to be able to trigger an update

    const day = today.toLocaleDateString(locale, { weekday: "long" });
    const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(locale, { month: "long" })}\n\n`;

    const hour = today.getHours();
    const wish = `Good ${(hour < 12 && "Morning") || (hour < 17 && "Afternoon") || "Evening"}, `;

    const time = today.toLocaleTimeString(locale, { hour: "numeric", hour12: true, minute: "numeric" });
    const [type, setType] = useState("");
    const [id, setId] = useState();
    useEffect(() => {
        if (getUser() != null) {
            setType(getUser().type);
            setId(getUser().id);
        } else {
            setType("");
        }
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
                <label
                    className={styles.label2}
                    onClick={() => {
                        navigate("/login");
                    }}
                >
                    Log out
                </label>
            </div>
        </>
    );
};

export default Time;
