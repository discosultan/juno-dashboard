import { Dispatch, SetStateAction, SyntheticEvent } from "react";
import Snackbar, { SnackbarCloseReason } from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

type ErrorProps = {
  error: Error | null;
  setError: Dispatch<SetStateAction<Error | null>>;
};

export default function ErrorSnack({ error, setError }: ErrorProps) {
  const handleClose = (_: SyntheticEvent, reason?: SnackbarCloseReason): void => {
    if (reason === "clickaway") {
      return;
    }

    setError(null);
  };

  return (
    <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
      <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="error">
        {error?.message}
      </MuiAlert>
    </Snackbar>
  );
}
