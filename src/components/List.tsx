import { FC } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { Step } from "../types/step";
import styles from "../../styles/general";

interface ListProps {
  items: Step[];
}

const useStyles = makeStyles(styles);

function PrintOperation(step: Step) {
  let print = "";
  switch (step.operation) {
    case "FILL":
      print = `Fill ${step.to?.toUpperCase()} bucket`;
      break;
    case "TRANSFER":
      print = `Transfer from ${step.from?.toUpperCase()} bucket to ${step.to?.toUpperCase()} bucket`;
      break;
    case "DUMP":
      print = `Dump ${step.from?.toUpperCase()} bucket`;
      break;
  }
  return print;
}

const List: FC<ListProps> = (props) => {
  const classes = useStyles();
  const { items } = props;
  return (
    <div className={classes.grid}>
      <Grid container spacing={3} className={classes.gridHeader}>
        <Grid item md={2}>
          #
        </Grid>
        <Grid item md={3}>
          Bucket X
        </Grid>
        <Grid item md={3}>
          Bucket Y
        </Grid>
        <Grid item md={4}>
          Explanation
        </Grid>
      </Grid>
      {!!items.length &&
        items.map((item, index) => (
          <Grid container spacing={3} key={index}>
            <Grid item md={2}>
              {index + 1}
            </Grid>
            <Grid item md={3}>
              {item.x}
            </Grid>
            <Grid item md={3}>
              {item.y}
            </Grid>
            <Grid item md={4}>
              {PrintOperation(item)}
            </Grid>
          </Grid>
        ))}
    </div>
  );
};

export default List;
