import { AxiosError } from 'axios';
import {useEffect, useState} from 'react';

export function useFetch<T>(fetchData: () => Promise<T>, autoFetch = false) {
  const [data, setData] = useState<T | null>(null);

  const [loading, setLoading] = useState(true);

  const [errors, setErrors] = useState<AxiosError | null>(null);

  const fetchDataFe = async () => {
    try {
      setLoading(true);
      const repData = await fetchData();
      setData(repData);
    } catch (error) {
      setErrors(error as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setLoading(false);
  };

  useEffect(() => {
    if (autoFetch) {
      fetchDataFe();
    }
  });

  return {data, loading, refetch: fetchDataFe, reset, errors};
}
