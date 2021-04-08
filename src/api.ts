import { useError } from 'error';
import { fetchJson } from 'fetch';

export const PYTHON_API_URL = process.env.REACT_APP_PYTHON_API_URL || 'http://localhost:8080';
export const RUST_API_URL = process.env.REACT_APP_RUST_API_URL || 'http://localhost:3030';

export function usePythonApi() {
  return useApi(PYTHON_API_URL);
}

export function useRustApi() {
  return useApi(RUST_API_URL);
}

function useApi(baseUrl: string) {
  const [, setError] = useError();

  async function fetchApi<T>(
    method: string,
    url: string,
    body?: {},
    signal?: AbortSignal,
  ): Promise<T> {
    try {
      return await fetchJson(method, baseUrl + url, body, signal);
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