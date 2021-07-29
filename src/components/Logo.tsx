import { CSSProperties } from "react";

const styles: { [key: string]: CSSProperties } = {
  logo: {
    textAlign: "center",
    fontSize: 64,
    margin: 0,
    padding: "20px 0",
  },
};

export default function Logo() {
  return (
    <p style={styles.logo}>🚀</p>
    //     <pre style={styles.logo}>{`            |
    //            / \\
    //           / _ \\
    //          |.o '.|
    //          |'._.'|
    //          |     |
    //        .'|  |  |'.
    //       /  |  |  |  \\
    //       |.-'--|--'-.|
    //      _
    //     | |_   _ _ __   ___
    //  _  | | | | | '_ \\ / _ \\
    // | |_| | |_| | | | | (_) |
    //  \\___/ \\__,_|_| |_|\\___/`}</pre>
  );
}
