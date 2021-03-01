import { ReactElement } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Scroll from 'components/Scroll';
import { Box } from '@material-ui/core';

const leftWidth = '20%';
const useStyles = makeStyles((_theme) => ({
  drawer: {
    width: leftWidth,
    marginLeft: '184px',
  },
  left: {
    width: leftWidth,
    display: 'fixed',
    height: '100%',
  },
  right: {
    flexGrow: 1,
    // marginLeft: drawerWidth,
    // position: 'relative',
    // overflow: 'auto',
  },
  // toolbar: {
  //   // Dense toolbar is always of that height.
  //   minHeight: 48,
  // },
}));

type SplitPaneProps = {
  left: ReactElement | null;
  right: ReactElement | null;
};

export default function SplitPane({ left, right }: SplitPaneProps) {
  const classes = useStyles();

  return (
    <Box display="flex">
      {/* <Paper className={classes.left}>
        <Scroll>
          {left}
        </Scroll>
      </Paper> */}
      <Drawer
        variant="permanent"
        anchor="left"
        className={classes.drawer}
        classes={{ paper: classes.drawer }}
      >
        {/* <div className={classes.toolbar} /> */}
        <Scroll>{left}</Scroll>
        {/* {left} */}
      </Drawer>

      <Box m={1} className={classes.right}>
        <Scroll>{right}</Scroll>
      </Box>
    </Box>
  );
}
