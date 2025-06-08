import {AxiosError} from 'axios';
import {useEffect, useState} from 'react';

export function useFetch<T>(fetchData: () => Promise<T>, autoFetch = false) {
  const [data, setData] = useState<T | null>(null);

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<AxiosError | null>(null);

  const fetchDataFe = async () => {
    try {
      reset();
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
    setErrors(null);
  };

  useEffect(() => {
    if (autoFetch) {
      fetchDataFe();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFetch]);

  return {data, loading, refetch: fetchDataFe, reset, errors};
}
