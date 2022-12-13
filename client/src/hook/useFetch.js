import { useEffect, useState } from "react";
import axios from "axios";
export const useFetch = (url) => {
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
    const [listAuction, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [count, setCount] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(url);
                if(count == 0){
                    setData(res.data);
                }
                
            } catch (error) {
                setError(error);
            }
            if(count == 0){
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
export const useFetchPagination = (url, page) => {
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
