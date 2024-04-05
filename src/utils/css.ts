export function getClassFromNumber(number: number) {
  if (number >= 0) {
    return "positive-sign";
  }else{
    return "negative-sign";
  }
}
