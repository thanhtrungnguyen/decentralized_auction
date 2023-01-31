import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import io from "socket.io-client";

// const socket = io.connect("http://localhost:8800");
export const useFetch = (url) => {
    const axios = useAxiosPrivate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(url);
                setData(res.data);
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const reFetch = async () => {
        setLoading(true);
        try {
            const res = await axios.get(url);
            setData(res.data);
        } catch (error) {
            setError(error);
        }
        setLoading(false);
    };
    return { data, loading, error, reFetch };
};

export const useFetchAuction = (url) => {
    const axios = useAxiosPrivate();
    const [listAuction, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [count, setCount] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(url);
                if (count == 0) {
                    setData(res.data);
                }
            } catch (error) {
                setError(error);
            }
            if (count == 0) {
                setLoading(false);
                window.stop();
            }
        };
        fetchData();
    }, []);

    const reFetch = async () => {
        setLoading(true);
        try {
            const res = await axios.get(url);
            setData(res.data);
        } catch (error) {
            setError(error);
        }
        setLoading(false);
    };
    return { listAuction, loading, error, reFetch };
};
export const useFetchAuctionDetail = (url) => {
    const axios = useAxiosPrivate();
    const [auction, setAuction] = useState(null);
    const [auctionLoading, setLoading] = useState(true);
    const [auctionError, setError] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                axios.get(url).then((resp) => {
                    console.log(resp.data.auction);

                    setAuction(resp.data.auction);
                });
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        };
        fetchData();
    }, [url]);
    return { auction, auctionLoading, auctionError };
};
export const useFetchPagination = (url, page) => {
    const axios = useAxiosPrivate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(url);
                setData(res.data);
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        };
        fetchData();
    }, [page, url]);

    const reFetch = async () => {
        setLoading(true);
        try {
            const res = await axios.get(url);
            setData(res.data);
        } catch (error) {
            setError(error);
        }
        setLoading(false);
    };
    return { data, loading, error, reFetch };
};

export const useFetchData = (url) => {
    const axios = useAxiosPrivate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        axios
            .get(url, { signal: controller.signal })
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => setError(err))
            .finally(() => {
                setLoading(false);
            });
        return () => {
            controller.abort();
        };
    }, [url]);

    return { loading, data, error };
};
export const useFetchSession = (url) => {
    const axios = useAxiosPrivate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        axios
            .get(url, { signal: controller.signal })
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => setError(err))
            .finally(() => {
                setLoading(false);
            });
        return () => {
            controller.abort();
        };
    }, []);

    return { loading, data, error };
};
