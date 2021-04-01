import { useError } from 'error';
import { fetchJson } from 'fetch';

export const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3030';

export function useApi() {
  const [, setError] = useError();

  async function fetchApi<T>(
    method: string,
    url: string,
    body?: {},
    signal?: AbortSignal,
  ): Promise<T> {
    try {
      return await fetchJson(method, BASE_URL + url, body, signal);
    } catch (error) {
      console.error(error);
      setError(error);
      throw error;
    }
  }

  return {
    fetchApi,
  };
}
