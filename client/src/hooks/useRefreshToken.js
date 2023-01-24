import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const refresh = async () => {
        const response = await axios.get("/session/refresh", {
            withCredentials: true,
        });
        setAuth((prev) => {
            return { ...prev, accessToken: response.data.accessToken, user: response.data.user };
        });
        return response.data.accessToken;
    };
    return refresh;
};

export default useRefreshToken;
