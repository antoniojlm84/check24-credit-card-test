import numberFormat from './numberFormat';

export const offerNumberFormat = (number: any) => {
  let result = 'N/A';

  if (isNumber(number)) {
    if (typeof number === 'string') {
      number = parseFloat(number);
    }
    result =
      number >= 0
        ? numberFormat(number, 0, ',', '.')
        : Number.isInteger(number)
        ? numberFormat(number, 0, '.', '')
        : numberFormat(number, 1, '.', '');
  }

  return result;
};

function isNumber(n: any) {
  return !isNaN(parseFloat(n)) && !isNaN(n - 0);
}
