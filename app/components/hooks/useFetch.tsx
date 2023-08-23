import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";

const useFetch = (url: string, options: AxiosRequestConfig) => {
  const [response, setResponse] = useState<any>([]);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsFetching(true);
        const res = await axios.get(url, options);
        setResponse(res.data);
      } catch (error: any) {
        setError(error);
      }
      setIsFetching(false);
    };
    fetchData();
  }, []);
  return { response, error, isFetching };
};

export default useFetch;
