const styles = {
  logo: {
    margin: 0,
  },
};

export default function Logo() {
  return (
    <pre style={styles.logo}>{`            |
           / \\
          / _ \\
         |.o '.|
         |'._.'|
         |     |
       .'|  |  |'.
      /  |  |  |  \\
      |.-'--|--'-.|
     _                   
    | |_   _ _ __   ___  
 _  | | | | | '_ \\ / _ \\ 
| |_| | |_| | | | | (_) |
 \\___/ \\__,_|_| |_|\\___/`}</pre>
  );
}
