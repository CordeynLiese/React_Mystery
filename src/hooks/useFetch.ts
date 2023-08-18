import { fetcher } from '../utils/fetcher';
import { useEffect, useState } from 'react';

interface FetchResult<T> {
  isLoading: boolean;
  data: T | null;
  error: Error | null;
}

interface FetchOptions<T> {
  initialValue?: T | null;
}

function isAbortError(err: unknown): boolean {
  return err instanceof DOMException && err.name === 'AbortError';
}

export function useFetch<T>(url: string, options: FetchOptions<T> = {}): FetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchData() {
      setLoading(true);
      setError(null);

      fetcher<T>(url, { signal: abortController.signal })
        .then((data) => {
          setData(data.data);
        })
        .catch((e: Error) => {
          if (isAbortError(e)) {
            return;
          }
          setData(null);
          setError(e);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    fetchData();

    return () => abortController.abort();
  }, [url]);

  return { isLoading: loading, data: data, error: error };
}
