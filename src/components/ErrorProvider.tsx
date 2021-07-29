import { useState, ReactNode } from "react";
import ErrorSnack from "components/ErrorSnack";
import { ErrorContext } from "error";

type Props = {
  children: ReactNode;
};

export default function ErrorProvider({ children }: Props) {
  const [error, setError] = useState<Error | null>(null);

  return (
    <ErrorContext.Provider value={[error, setError]}>
      {children}
      <ErrorSnack error={error} setError={setError} />
    </ErrorContext.Provider>
  );
}
