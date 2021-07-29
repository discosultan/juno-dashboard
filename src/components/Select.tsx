import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

type Props = {
  multiple?: boolean;
  autocomplete?: boolean;
  label: string;
  options: any[];
  value: any;
  onChange: (e: any, v: any) => void;
};

export default function Select({ multiple, autocomplete, label, options, value, onChange }: Props) {
  const id = label;
  if (multiple && autocomplete) {
    return MultiAutocomplete({ id, label, options, value, onChange });
  }
  if (multiple && !autocomplete) {
    return MultiRegular({ id, label, options, value, onChange });
  }
  if (!multiple && !autocomplete) {
    return SingleRegular({ id, label, options, value, onChange });
  }
  throw Error("Not implemented");
}

type SubProps = {
  id: string;
  label: string;
  options: any[];
  value: any;
  onChange: any;
};

function SingleRegular({ id, label, options, value, onChange }: SubProps) {
  return (
    <TextField
      id={id}
      fullWidth
      select
      label={label}
      value={value}
      onChange={(e) => onChange(e, e.target.value)}
    >
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
}

function MultiRegular({ id, label, options, value, onChange }: SubProps) {
  return (
    <TextField
      id={id}
      label={label}
      fullWidth
      select
      SelectProps={{
        multiple: true,
        value: value,
        onChange: (e) => onChange(e, e.target.value),
      }}
    >
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
}

function MultiAutocomplete({ id, label, options, value, onChange }: SubProps) {
  return (
    <Autocomplete
      id={id}
      multiple
      disableCloseOnSelect
      options={options}
      value={value}
      onChange={(e, v) => onChange(e, v)}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}
