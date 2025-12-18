const splitThousands =
  (number: any) => (dec_point: string, thousands_point: string) => {
    const splitNum = number.toString().split(dec_point);
    splitNum[0] = splitNum[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands_point);
    return splitNum.join(dec_point);
  };

const isBigNumber = (number: number) => number.toString().includes('e');

const isBigFloat = (number: number) => number.toString().includes('-');

const calcTrailing = (dec: string, len: number) => Number(dec) + 2 - len;

const handleBigFloats = (number: number, decimals: number) => {
  if (!decimals) {
    return '0';
  }

  const [numbers, dec] = number.toString().replace('.', '').split('e-');
  const trailingZeros = calcTrailing(dec, numbers.length);
  const res = `${'0.'.padEnd(trailingZeros + 2, '0')}${numbers}`;

  return decimals ? res.substring(0, 2) + res.substring(2, decimals + 2) : res;
};

const handleBigNumbers = (
  number: number,
  decimals: number,
  dec_point: string,
  thousands_point: string
) => {
  if (isBigFloat(number)) {
    return handleBigFloats(number, decimals);
  }

  return splitThousands(BigInt(number))(dec_point, thousands_point);
};

function handleFiniteNumbers(
  number: number,
  decimals: number,
  dec_point: string,
  thousands_point: string
) {
  if (!isFinite(number)) {
    throw new TypeError('number is not finite number');
  }

  return splitThousands(number.toFixed(decimals).replace('.', dec_point))(
    dec_point,
    thousands_point
  );
}

const numberFormat = (
  number: number | any,
  decimals: number,
  dec_point: string = '.',
  thousands_point: string = ','
) => {
  if (number == null || typeof number !== 'number') {
    return '';
  }

  if (isBigNumber(number)) {
    return handleBigNumbers(number, decimals, dec_point, thousands_point);
  }

  return handleFiniteNumbers(number, decimals, dec_point, thousands_point);
};

export default numberFormat;
