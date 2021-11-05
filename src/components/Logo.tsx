import { CSSProperties } from "react";
import { Link } from "react-router-dom";

const styles: { [key: string]: CSSProperties } = {
  link: {
    textDecoration: "none",
  },
  logo: {
    textAlign: "center",
    fontSize: 64,
    margin: 0,
    padding: "20px 0",
  },
};

export default function Logo() {
  return (
    <Link style={styles.link} to="/" >
      <p style={styles.logo}>🚀</p>
    </Link>
  );
}
