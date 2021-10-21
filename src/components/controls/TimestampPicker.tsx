import TextField from "@mui/material/TextField";
import DatePicker from "@mui/lab/DatePicker";
import { strftimestamp, strptimestamp } from "time";

type Props = {
  label: string;
  value: number;
  onChange: (value: number) => void;
};

export default function TimestampPicker({ label, value, onChange }: Props) {
  return (
    <DatePicker
      label={label}
      value={strftimestamp(value)}
      renderInput={(params) => <TextField {...params} />}
      onChange={(e: any) => onChange(strptimestamp(e.target.value))}
    />
  );
}
