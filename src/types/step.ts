import { BucketName } from "./bucket";

export interface Step {
  x?: number;
  y?: number;
  from?: BucketName;
  to?: BucketName;
  operation: "FILL" | "TRANSFER" | "DUMP";
}
