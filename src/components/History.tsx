import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

export type HistoryItem<T> = {
  time: string;
  value: T;
};

type HistoryProps<T> = {
  id: string;
  label: string;
  value: T;
  history: HistoryItem<T>[];
  format: (value: T) => string;
  onChange: (value: T) => void;
};

export default function History<T>({
  id,
  label,
  value,
  history,
  format,
  onChange,
}: HistoryProps<T>) {
  const foundIndex = history.findIndex((item) => item.value === value);
  const indexStr = foundIndex === -1 ? '' : `${foundIndex}`;

  function change(indexStr: string): void {
    onChange(history[Number(indexStr)].value);
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        View Historical Sessions
      </Typography>
      <TextField
        id={id}
        label={label}
        fullWidth
        select
        SelectProps={{
          value: indexStr,
          onChange: (e) => change(e.target.value as string),
        }}
      >
        {history.map((item, i) => (
          <MenuItem key={i} value={`${i}`}>
            {item.time} ({format(item.value)})
          </MenuItem>
        ))}
      </TextField>
    </>
  );
}
