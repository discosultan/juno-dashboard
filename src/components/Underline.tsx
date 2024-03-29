import { styled, Theme } from "@mui/material/styles";

const Root = styled("span")(({ theme }: { theme: Theme }) => ({
  underline: {
    width: "73px",
    height: "4px",
    margin: "0 auto",
    display: "block",
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function Underline() {
  return <Root />;
}
