import Head from "next/head";
import Form from "../src/components/Form";
import { Container, makeStyles, Typography } from "@material-ui/core";
import styles from "../styles/general";

const useStyles = makeStyles(styles);

export default function Home() {
  const classes = useStyles();
  return (
    <div>
      <Head>
        <title>Two Buckets Riddle</title>
        <meta name="description" content="Two Buckets Riddle" />
      </Head>
      <Container maxWidth="md" className={classes.container}>
        <Typography variant="h3" align="center" className={classes.title}>
          Two Buckets Riddle
        </Typography>
        <Typography variant="h6" align="center" className={classes.description}>
          Get started by setting your inputs: <code>X</code> <code>Y</code> <code>Z</code>
        </Typography>
        <Form />
      </Container>
    </div>
  );
}
