import { createContext, useContext } from "react";

export const ErrorContext = createContext<[Error | null, (error: Error) => void]>([
  null,
  (_error) => {},
]);

export function useError() {
  return useContext(ErrorContext);
}
