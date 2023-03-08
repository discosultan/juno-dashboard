import { DatePicker } from "@mui/x-date-pickers";
import { parseISO } from "date-fns";
import { strftimestamp } from "time";

type Props = {
  label: string;
  value: number;
  onChange: (value: number) => void;
};

export default function TimestampPicker({ label, value, onChange }: Props) {
  return (
    <DatePicker
      label={label}
      value={parseISO(strftimestamp(value))}
      onChange={(e) => e && onChange(e.getTime())}
    />
  );
}
