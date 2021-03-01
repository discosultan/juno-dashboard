import { CSSProperties } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';

const styles: { [key: string]: CSSProperties } = {
  code: {
    position: 'relative',
    padding: '5px',
    margin: 0,
  },
  copy: {
    position: 'absolute',
    right: 0,
    padding: '10px',
    margin: '5px',
    bottom: 0,
  },
};

type CodeProps = {
  code: string;
};

export default function Code({ code }: CodeProps) {
  function onClick() {
    navigator.clipboard.writeText(code);
  }

  return (
    <Paper>
      <pre style={styles.code}>
        {code}
        <IconButton style={styles.copy} onClick={onClick}>
          <FileCopyOutlinedIcon />
        </IconButton>
      </pre>
    </Paper>
  );
}
