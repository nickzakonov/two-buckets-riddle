export default function found(large: number, small: number, wanted: number) {
  return large === wanted || small === wanted || large + small === wanted;
}
