import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Grid, makeStyles, TextField } from "@material-ui/core";
import { Step } from "../types/step";
import styles from "../../styles/general";
import List from "./List";

const useStyles = makeStyles(styles);

interface FormValues {
  x: number;
  y: number;
  z: number;
}

const Form: FC = () => {
  const classes = useStyles();
  const { register, errors, getValues, handleSubmit } = useForm<FormValues>();
  const [steps, setSteps] = useState<Step[]>([]);
  const [error, setError] = useState(null);
  const onSubmit = async (data: FormValues) => {
    const response = await fetch("/api/calc", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ payload: data }),
    });
    const json = await response.json();
    setError(json?.error || null);
    setSteps(json?.solution || []);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item md={4}>
          <TextField
            name="x"
            label="Bucket X"
            inputRef={register({
              valueAsNumber: true,
              validate: (value) => (value > 0 && value <= 100) || "Input a number from 1 to 100",
            })}
            defaultValue={0}
            InputLabelProps={{ shrink: true }}
            placeholder="X"
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!errors?.x}
            helperText={errors?.x?.message}
          />
        </Grid>
        <Grid item md={4}>
          <TextField
            name="y"
            label="Bucket Y"
            inputRef={register({
              valueAsNumber: true,
              validate: (value) => (value > 0 && value <= 100) || "Input a number from 1 to 100",
            })}
            defaultValue={0}
            InputLabelProps={{ shrink: true }}
            placeholder="Y"
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!errors.y}
            helperText={errors?.y?.message}
          />
        </Grid>
        <Grid item md={4}>
          <TextField
            name="z"
            label="Wanted Volume Z"
            inputRef={register({
              valueAsNumber: true,
              min: { value: 1, message: "Input a positive number" },
              pattern: { value: /^[0-9]+$/, message: "Input a positive number" },
              validate: (value) =>
                Number(value) <= Number(getValues("x")) + Number(getValues("y")) || "Wanted volume is to high",
            })}
            defaultValue={0}
            InputLabelProps={{ shrink: true }}
            placeholder="Z"
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!errors.z}
            helperText={errors?.z?.message}
          />
        </Grid>
      </Grid>
      <div className={classes.submitButton}>
        <Button type="submit" variant="outlined" size="large" color="secondary">
          Solve
        </Button>
      </div>
      {error}
      {!error && <List items={steps} />}
    </form>
  );
};

export default Form;
