import { CSSProperties, ReactNode } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

type ScrollProps = {
  children?: ReactNode;
  style?: CSSProperties;
};

export default function Scroll({ children, style }: ScrollProps) {
  const theme = useTheme();

  return (
    <OverlayScrollbarsComponent
      // style={{
      //   position: "static",
      // }}
      style={style}
      className={theme.palette.type === 'dark' ? 'os-theme-dark' : 'os-theme-light'}
      // options={{ scrollbars: { autoHide: 'scroll' } }}
    >
      {children}
    </OverlayScrollbarsComponent>
  );
}
