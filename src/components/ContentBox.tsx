import { ReactNode } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

type ContentBoxProps = {
  children?: ReactNode;
  title?: string;
};

export default function ContentBox({ children, title }: ContentBoxProps) {
  return (
    <Box border={1} borderColor="grey.500" p={1} bgcolor="background.default">
      {title && (
        <Typography gutterBottom variant="h6">
          {title}
        </Typography>
      )}
      {children}
    </Box>
  );
}
