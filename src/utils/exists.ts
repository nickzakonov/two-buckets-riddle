import { Step } from "../types/step";
import { Bucket } from "../types/bucket";

export default function exists(steps: Step[], large: Bucket, small: Bucket) {
  return steps.some(
    (step) =>
      step.x === (large.name === "x" ? large.volume : small.volume) &&
      step.y === (large.name === "y" ? large.volume : small.volume)
  );
}
