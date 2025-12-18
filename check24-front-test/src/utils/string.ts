export const urlVarToCamelCase = (string: string) => {
  let stringParts = string.split('_');
  let finalString = stringParts[0];
  if (1 < stringParts.length) {
    stringParts.forEach((item, index) => {
      if (0 < index) {
        finalString = finalString + capitalizeFirstLetter(item);
      }
    });
  }

  return finalString;
};

export const capitalizeFirstLetter = (string: string) => {
  return string ? string.charAt(0).toUpperCase() + string.slice(1) : '';
};

export const stringToDatetime = (
  dateString: string,
  spainFormat = true,
  specialCharacterSplit = ''
) => {
  let finalDate = dateString.substring(0, 19);
  if (true == spainFormat) {
    let aux =
      specialCharacterSplit == ''
        ? finalDate.split(' ')
        : finalDate.split(specialCharacterSplit);
    let dateSplited = aux[0].split('-');
    finalDate =
      dateSplited[2] +
      '/' +
      dateSplited[1] +
      '/' +
      dateSplited[0] +
      ' ' +
      aux[1];
  }

  return finalDate + ' CET';
};

export const stringToDate = (dateString: string, spainFormat = true) => {
  let finalDate = dateString.substring(0, 10);
  if (true == spainFormat) {
    let aux = finalDate.split('-');
    finalDate = aux[2] + '/' + aux[1] + '/' + aux[0];
  }

  return finalDate;
};

export const checkIsValidUrl = (url: string): boolean => {
  try {
    const { protocol } = new URL(url);
    return protocol === 'https:' || protocol === 'http:';
  } catch {
    return false;
  }
};

export const formatDateToCET = (date = new Date()) => {
  // Crear el formato en la zona CET/CEST
  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Madrid',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  // Formatear la fecha: 2025-01-22 08:13:16
  const parts = formatter.formatToParts(date);
  const getPart = (type) => parts.find((part) => part.type === type)?.value;

  return `${getPart('year')}-${getPart('month')}-${getPart('day')} ${getPart(
    'hour'
  )}:${getPart('minute')}:${getPart('second')}`;
};
