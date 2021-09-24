import { ChangeEvent } from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((_theme) => ({
  textarea: {
    resize: "vertical",
    width: "100%",
  },
  label: {
    display: "block",
  },
}));

type TextAreaProps = {
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function TextArea({ label, value, onChange }: TextAreaProps) {
  const classes = useStyles();
  const id = label;

  return (
    <>
      <label className={classes.label + " MuiFormLabel-root MuiInputLabel-shrink"} htmlFor={id}>
        {label}
      </label>
      <TextareaAutosize
        id={id}
        className={classes.textarea}
        aria-label={label}
        minRows={3}
        value={value}
        onChange={onChange}
      />
    </>
  );
}
