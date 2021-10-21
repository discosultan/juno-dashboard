import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { strfinterval } from "time";

type Props = {
  label: string;
  options: number[];
  value: number;
  onChange: (value: number) => void;
};

export default function IntervalSelect({ label, options, value, onChange }: Props) {
  const id = label;
  return (
    <TextField
      id={id}
      fullWidth
      select
      label={label}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
    >
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {strfinterval(option)}
        </MenuItem>
      ))}
    </TextField>
  );
}
