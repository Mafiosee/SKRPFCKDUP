export const enumerate = (number: number, text: string[]) => {
  if (number > 100) {
    number = number % 100;
  }
  if (number <= 20 && number >= 10) {
    return text[2];
  }
  if (number > 20) {
    number = number % 10;
  }
  return number === 1 ? text[0] : number > 1 && number < 5 ? text[1] : text[2];
};
