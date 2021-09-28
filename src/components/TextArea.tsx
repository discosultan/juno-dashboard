import { ChangeEvent } from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";

const styles = {
  textarea: {
    resize: "vertical" as "vertical",
    width: "100%",
  },
  label: {
    display: "block",
  },
};

type TextAreaProps = {
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function TextArea({ label, value, onChange }: TextAreaProps) {
  const id = label;

  return (
    <>
      <label style={styles.label} className="MuiFormLabel-root MuiInputLabel-shrink" htmlFor={id}>
        {label}
      </label>
      <TextareaAutosize
        id={id}
        style={styles.textarea}
        aria-label={label}
        minRows={3}
        value={value}
        onChange={onChange}
      />
    </>
  );
}
