import {useEffect, useState} from 'react';

export function useFetch<T>(fetchData: () => Promise<T>, autoFetch = true) {
  const [data, setData] = useState<T | null>(null);

  const [loading, setLoading] = useState(true);

  const [errors, setErrors] = useState<Error | null>(null);

  const fetchDataFe = async () => {
    try {
      setLoading(true);
      const repData = await fetchData();
      setData(repData);
    } catch (error) {
        setErrors((error instanceof Error ? error : new Error('An error just happened!!!')));

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
