import type { NextApiRequest, NextApiResponse } from "next";
import { Step } from "../../src/types/step";
import { Bucket } from "../../src/types/bucket";

type Data = {
  error?: string;
  solution?: Step[];
};

function GCD(x: number, y: number): number {
  if (!x) return y;
  return GCD(y % x, x);
}

function simpleSum(large: Bucket, small: Bucket) {
  const steps: Step[] = [];

  large.volume = large.capacity;
  steps.push({ [large.name]: large.volume, [small.name]: small.volume, to: large.name, operation: "FILL" });

  small.volume = small.capacity;
  steps.push({ [large.name]: large.volume, [small.name]: small.volume, to: small.name, operation: "FILL" });

  return steps;
}

function largeToSmall(large: Bucket, small: Bucket, wantedVolume: number) {
  const steps: Step[] = [];
  let cycles = 0;

  large.volume = large.capacity;
  steps.push({ [large.name]: large.volume, [small.name]: small.volume, to: large.name, operation: "FILL" });

  while (cycles < 10) {
    while (large.volume >= small.capacity) {
      const spaceAvailable = small.capacity - small.volume;
      small.volume += large.volume < spaceAvailable ? large.volume : spaceAvailable;
      large.volume -= large.volume < spaceAvailable ? large.volume : spaceAvailable;
      steps.push({
        [large.name]: large.volume,
        [small.name]: small.volume,
        from: large.name,
        to: small.name,
        operation: "TRANSFER",
      });
      if (large.volume === wantedVolume || small.volume === wantedVolume) break;

      small.volume = 0;
      steps.push({ [large.name]: large.volume, [small.name]: small.volume, from: small.name, operation: "DUMP" });
    }
    if (large.volume === wantedVolume || small.volume === wantedVolume) break;

    small.volume = large.volume;
    large.volume = 0;
    steps.push({
      [large.name]: large.volume,
      [small.name]: small.volume,
      from: large.name,
      to: small.name,
      operation: "TRANSFER",
    });
    if (large.volume === wantedVolume || small.volume === wantedVolume) break;

    large.volume = large.capacity;
    steps.push({ [large.name]: large.volume, [small.name]: small.volume, to: large.name, operation: "FILL" });

    cycles++;
  }
  return steps;
}

function smallToLarge(small: Bucket, large: Bucket, wantedVolume: number) {
  const steps: Step[] = [];
  let cycles = 0;

  while (cycles < 10) {
    while (large.volume !== large.capacity) {
      small.volume = small.capacity;
      steps.push({ [large.name]: large.volume, [small.name]: small.volume, to: small.name, operation: "FILL" });
      if (large.volume === wantedVolume || small.volume === wantedVolume) break;

      const spaceAvailable = large.capacity - large.volume;
      large.volume += small.volume < spaceAvailable ? small.volume : spaceAvailable;
      small.volume -= small.volume < spaceAvailable ? small.volume : spaceAvailable;
      steps.push({
        [large.name]: large.volume,
        [small.name]: small.volume,
        from: small.name,
        to: large.name,
        operation: "TRANSFER",
      });
      console.log(wantedVolume);
      if (large.volume === wantedVolume || small.volume === wantedVolume) break;
    }
    if (large.volume === wantedVolume || small.volume === wantedVolume) break;

    large.volume = 0;
    steps.push({ [large.name]: large.volume, [small.name]: small.volume, from: large.name, operation: "DUMP" });

    large.volume = small.volume;
    small.volume -= small.volume;
    steps.push({
      [large.name]: large.volume,
      [small.name]: small.volume,
      from: small.name,
      to: large.name,
      operation: "TRANSFER",
    });
    cycles++;
  }
  return steps;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const {
    payload: { x, y, z },
  } = req.body;

  if (x + y < z || z % GCD(x, y) !== 0) {
    res.status(200).json({ error: "There is no solution" });
    res.end();
  } else {
    const largeBucket: Bucket = {
      name: x > y ? "x" : "y",
      capacity: parseInt(x > y ? x : y, 10),
      volume: 0,
    };
    const smallBucket: Bucket = {
      name: x > y ? "y" : "x",
      capacity: parseInt(x > y ? y : x, 10),
      volume: 0,
    };
    if (x + y === z) {
      res.status(200).json({ solution: simpleSum(largeBucket, smallBucket) });
    } else {
      const largeToSmallSteps = largeToSmall(largeBucket, smallBucket, parseInt(z, 10));

      largeBucket.volume = 0;
      smallBucket.volume = 0;
      const smallToLargeSteps = smallToLarge(smallBucket, largeBucket, z);

      res.status(200).json({ solution: largeToSmallSteps < smallToLargeSteps ? largeToSmallSteps : smallToLargeSteps });
    }
  }
}
