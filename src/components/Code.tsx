import { CSSProperties, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";

const styles: { [key: string]: CSSProperties } = {
  code: {
    position: "relative",
    padding: "5px",
    margin: 0,
  },
  copy: {
    position: "absolute",
    right: 0,
    padding: "10px",
    margin: "5px",
    bottom: 0,
  },
};

type CodeProps = {
  code: string;
};

export default function Code({ code }: CodeProps) {
  const [copiedSnackOpen, setCopiedSnackOpen] = useState(false);

  function onClick() {
    navigator.clipboard.writeText(code);
    setCopiedSnackOpen(true);
  }

  return (
    <>
      <Paper>
        <pre style={styles.code}>
          {code}
          <IconButton style={styles.copy} onClick={onClick}>
            <FileCopyOutlinedIcon />
          </IconButton>
        </pre>
      </Paper>

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={copiedSnackOpen}
        autoHideDuration={1200}
        onClose={() => setCopiedSnackOpen(false)}
        message="Copied To Clipboard"
      />
    </>
  );
}
