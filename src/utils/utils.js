import { LOCAL_STORAGE_AUTH_NAME } from './constants';

export const getBaseUrl = (req, setLocalhost) => {
  let protocol = 'https:';
  let host = req ? req.headers.host : window.location.hostname;
  if (host.indexOf('localhost') > -1) {
    if (setLocalhost) host = setLocalhost;
    protocol = 'http:';
  }

  return {
    protocol,
    host,
    baseUrl: `${protocol}//${host}`,
  };
};

// --------------------------------------------------------------------//
// ----------------------- Parsers/Formatter --------------------------//
// --------------------------------------------------------------------//
/**
 * boolean to string
 * @param booleanValue
 * @returns {string}
 */
export const booleanFormatter = (booleanValue) => {
  return booleanValue ? 'true' : 'false';
};

/**
 * string to boolean
 * @param value
 * @returns {boolean}
 */
export const toBoolean = (value) => {
  return typeof value === 'boolean' ? value : value === 'true';
};

export const randomString = () => {
  return (
    Math.random()
      .toString(36)
      .substring(2, 6)
    + Math.random()
      .toString(36)
      .substring(2, 6)
  );
};
// --------------------------------------------------------------------//
// ------------------------- normalization ----------------------------//
// --------------------------------------------------------------------//

/**
 * to int number
 * @param value
 * @returns {number}
 */
export const toInt = (value) => {
  return value ? parseInt(value, 10) : 0;
};

/**
 * convert string to number
 * @param {string | number} value
 * @returns {number}
 */
export const toNumber = (value) => {
  if (!value) {
    return 0;
  }
  if (typeof value === 'number') return value;

  const onlyNums = value.replace(/[^\d]/g, '');
  return toInt(onlyNums);
};

/**
 * to decimal number
 * @param value
 * @param [afterComma]
 * @returns {number}
 */
export const toDecimal = (value, afterComma = 2) => {
  if (
    (!value && value !== 0)
    || value === 0
    || value === '0.0'
    || value === 0.0
  ) {
    return 0;
  }
  if (typeof value === 'number') return parseFloat(value.toFixed(afterComma));

  // replace ',' to '.'
  const str = value.includes(',') ? value.replace(',', '.') : value;
  const res = parseFloat(str);
  if (!isNaN(res)) {
    return toDecimal(res, afterComma); // to get a good format decimal
  }
  return 0;
};

/**
 * normalize input type number
 * @param {*} value
 */
export const normalizeNumber = (value, isAuthorizeNegatif = false) => {
  const number = parseInt(value, 10);
  if (isNaN(number)) {
    return 0;
  }
  if (!isAuthorizeNegatif && number < 1) {
    return 0;
  }
  return number;
};

/**
 * format input type number
 * @param {*} value
 */
export const formatNumber = (value, isAuthorizeNegatif = false) => {
  const number = parseInt(value, 10);
  if (isNaN(number)) {
    return '0';
  }

  if (!isAuthorizeNegatif && number < 1) {
    return '0';
  }
  return number;
};

/**
 * get french format for decimal
 * @param price
 * @param currency
 * @returns {string} like 78,90
 */
export const toFrFormatStrWithComma = (price, currency = '€') => {
  if (!price) return '';
  const priceStr = typeof price === 'number' ? price.toFixed(2) : price;
  const parts = priceStr.split('.');
  if (parts.length > 1) {
    const partsOne = parts[1] === '00' ? '' : parts[1];
    // add '0' at the end if one digit into centime
    const formattedPartsOne = partsOne.length === 1 ? partsOne + '0' : partsOne;
    return (
      parts[0]
      + (formattedPartsOne.length ? ',' : '')
      + formattedPartsOne
      + ' '
      + currency
    );
  }
  return price + ' ' + currency;
};

/**
 * check if it's null ( 0, '', null, undefined, {}, [] )
 * @param item
 * @returns {boolean}
 */
export const isNull = (item) => {
  // NOTE : typeof null = 'object', typeof undefined = 'undefined'
  // see Loose Equality Comparisons With == at ( https://www.sitepoint.com/javascript-truthy-falsy )
  const typeOfValue = typeof item;
  switch (typeOfValue) {
    case 'string':
      return item.trim() === '';
    case 'object':
      return (
        Object.is(item, null) || Object.values(item).every((val) => isNull(val))
      );
    case 'number':
      return !item;
    default:
      return item == null;
  }
};

/**
 * remove empty value
 * @param object
 * @returns {*}
 */
export const removeEmptyValues = (object) => {
  if (!object) return null;
  for (const key in object) {
    if (!object.hasOwnProperty(key)) {
      /* eslint-disable-next-line no-continue */
      continue;
    }
    const value = object[key];
    if (isNull(value)) {
      delete object[key];
    }
  }
  return object;
};

// --------------------------------------------------------------------//
// ----------------------------- Misc ---------------------------------//
// --------------------------------------------------------------------//
export const sort = (array, keySupplier) => {
  array.sort((item1, item2) => {
    const item1Key = keySupplier(item1);
    const item2Key = keySupplier(item2);
    if (item1Key < item2Key) return -1;
    if (item1Key > item2Key) return 1;
    return 0;
  });
  return array;
};

export const sortDesc = (array, keySupplier = (val) => val) => {
  array.sort((item1, item2) => {
    const item1Key = keySupplier(item1);
    const item2Key = keySupplier(item2);
    return item2Key - item1Key;
  });
  return array;
};

export const first = (array) => {
  return array && array.length ? array[0] : null;
};

export const removeIndex = (array, index) => {
  array.splice(index, 1);
};

export const remove = (array, itemOrFunction) => {
  let i;
  if (typeof itemOrFunction === 'function') {
    i = array.findIndex(itemOrFunction);
  } else {
    i = array.indexOf(itemOrFunction);
  }
  if (i !== -1) {
    removeIndex(array, i);
    return true;
  }
  return false;
};

export const insert = (array, index, item) => {
  array.splice(index, 0, item);
};

export const clone = (instance) => {
  return Object.assign(Object.create(instance), instance);
};

/**
 * @param object
 * @param {array|Set} names
 * @returns {*}
 */
export const filter = (object, names) => {
  return Object.keys(object)
    .filter((key) => (names.has ? names.has(key) : names.includes(key)))
    .reduce((obj, key) => {
      obj[key] = object[key];
      return obj;
    }, {});
};

/**
 * other consts at http://2ality.com/2014/10/es6-promises-api.html
 * @param ms
 * @returns {Promise}
 */
export const delay = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

// to capitalize only first letter
export const capitalizeFirstLetter = (string) => {
  if (
    !string
    || typeof string !== 'string'
    || (string && string.trim().length === 0)
  ) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};
// to capitalize all first letter of each word
export const capitalizeCase = (string) => {
  if (!string) {
    return '';
  }
  string = string.trim(); // important
  if (!string.length) {
    return '';
  }
  return string
    .toLowerCase()
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.substr(1))
    .join(' ');
};
// to uppercase
export const uppercase = (str) => {
  if (!str || typeof str !== 'string') return '';
  return str.toUpperCase();
};
// to lowercase
export const lowercase = (str) => {
  if (!str || typeof str !== 'string') return '';
  return str.toLowerCase();
};

export const isIncluded = (itemOrStr, text) => {
  if (!itemOrStr || !text) return false;
  return itemOrStr
    .toString()
    .toLowerCase()
    .includes(text.toLowerCase());
};

export const getKeyValue = (object, value) => {
  if (!object) return value;
  let keyValue = value;
  Object.keys(object).forEach((key) => {
    if (object[key].toLowerCase() === value.toLowerCase()) {
      keyValue = key;
    }
  });
  return keyValue;
};

export const shallowEquals = (a, b) => {
  for (const i in a) if (!(i in b)) return false;
  for (const i in b) if (a[i] !== b[i]) return false;
  return true;
};

/**
 * check if text is empty or null
 * @param string
 * @returns {boolean}
 */
export const isTextEmpty = (string) => {
  if (string) {
    string = string.trim();
    return !string.length;
  }
  return true;
};
// --------------------------------------------//
// ------------------- Forms ------------------//
// --------------------------------------------//
export const getErrorMessage = (fieldName) => {
  if (!fieldName) return null;
  switch (fieldName.toString()) {
    case 'firstName':
      return 'Saisissez votre prénom';
    case 'lastName':
      return 'Saisissez votre nom';
    case 'email':
    case 'username':
      return 'Saisissez une adresse e-mail';
    case 'password':
      return 'Choisissez votre mot de passe';
    case 'confirmPassword':
      return 'Confirmez votre mot de passe';
    case 'address':
    case 'address2':
      return 'Saisissez une adresse complète';
    case 'zipCode':
    case 'code':
      return 'Saisissez les 5 chiffres de code postal';
    case 'city':
      return 'Saisissez le nom de la ville';
    case 'phone':
      return 'Saisissez un numéro téléphone valide.';
    case 'phoneNumber':
      return 'Saisissez plutôt un numéro de mobile.';
    default:
      break;
  }
};

// ----- email validation -----//
export const regexEmail = new RegExp(
  /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
);
export const isValidEmail = (email) => {
  return email.match(regexEmail);
};

// ----- zip code validation ------ //
export const isValidZipCode = (zipCodeStr) => {
  const regexZipCode = new RegExp(/^[0-9]{5}$/);
  zipCodeStr = zipCodeStr ? zipCodeStr.trim() : '';
  return zipCodeStr.match(regexZipCode);
};

// ----- phoneNumber validation -----//
export const regexPhoneNumber = new RegExp(/^(0[6-7]\d{8})$/);
export const isValidPhoneNumber = (phoneNumber) => {
  const phoneDigits = phoneNumber ? phoneNumber.trim().split(' ') : [];
  const phoneStr = phoneDigits.join('');
  return phoneStr.match(regexPhoneNumber);
};

const sliceNumber = (number, step = 2) => {
  if (!number) return number;
  const parts = [];
  for (let i = 0, j = 0; i < number.length; i += step, j++) {
    parts[j] = number.slice(i, i + step);
  }
  return parts.join(' ');
};

export const normalizePhoneNumber = (value) => {
  if (!value) {
    return value;
  }
  const onlyNums = value.replace(/[^\d]/g, '');
  return sliceNumber(onlyNums);
};

export const groupBy = (objectArray, property) => {
  return objectArray.reduce((acc, obj) => {
    const key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    // Add object to list for given key's value
    acc[key].push(obj.templates);
    return acc;
  }, {});
};

/**
 * copy a string to a clipboard
 * @param str
 */
export const copyToClipBoard = (str) => {
  const el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

/**
 * format price
 * @param price
 * @param unit
 */
export const formatPrice = (price, unit = 'EUR') => {
  let newUnit = '€';
  if (unit === 'USD' || unit === 'usd') {
    newUnit = '$';
  } else if (unit === 'EUR' || unit === 'euro' || unit === 'eur') {
    newUnit = '€';
  }
  return price + ' ' + newUnit;
};

/**
 * format items to react select values
 * @param items
 */
export const formatSelectOptions = (items) => {
  if (!Array.isArray(items)) {
    return [];
  }

  const newItems = items.map((item) => ({
    label: item.name || item.get('name'),
    value: item.id,
  }));

  return newItems;
};

/**
 * format items to react select values
 * @param items
 */
export const formatParseObjSelectOptions = (items, field) => {
  if (!items || items?.length <= 0) {
    return [];
  }

  const newItems = items.map((parseObj) => ({
    label: parseObj.get(field || 'name'),
    value: parseObj.id,
    parseObj,
  }));
  return newItems;
};

/**
 * format items to react select values
 * @param items
 */
export const formatParseObjSelectOption = (parseObj, field) => {
  if (!parseObj) {
    return;
  }
  const selectValue = {
    label: parseObj.get(field || 'name'),
    value: parseObj.id,
    parseObj,
  };

  return selectValue;
};

/**
 * format items to react select values
 * @param items
 */
export const formatSavedParseObjSelectOptions = (values, field) => {
  if (!values) {
    return;
  }
  const newValues = { ...values };
  /** get the parse object selected value instead of string value */
  if (
    values[field]
    && Array.isArray(values[field])
    && values[field].length > 0
  ) {
    newValues[field] = values[field].map((value) => value.parseObj);
  }
  return newValues;
};

/**
 * format item to react select values
 * @param item
 */
export const formatSavedParseObjSelectOption = (values, field) => {
  if (!values) {
    return;
  }
  const newValues = { ...values };
  if (values[field] && values[field].parseObj) {
    newValues[field] = values[field].parseObj;
  }

  return newValues;
};

/**
 * Convert cm to px
 * @param {integer} value
 * @param {integer} dpi
 * @returns
 */
export const cmToPx = (value, dpi = 150) => {
  if (value == null) {
    return value;
  }
  const defaultValueInch = 0.39370079; // default value on Inch
  // round to the nearest integer
  return Math.ceil(value * defaultValueInch * dpi);
};

/**
 * convert cm to px
 * @param {integer} value
 * @param {integer} dpi
 * @returns
 */
export const convertPxToCm = (value, dpi = 150) => {
  const defaultValueInch = 0.39370079; // default value on Inch
  return Math.ceil(value / (defaultValueInch * dpi));
};

/**
 *  check server
 */
export const isServer = () => {
  return !(typeof window !== 'undefined' && window && window.document);
};

/**
 * get cookies name
 * @param {*} name
 */
export const getCookie = (name) => {
  if (isServer()) {
    return undefined;
  }

  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' + name.replace(/([.$?*|{}()[]\\\/\+^])/g, '\\$1') + '=([^;]*)',
    ),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const parseSwellNumber = (str) => {
  return parseFloat(str.replace(',', '.'));
};

/**
 * send api error message if the req method is unknown (other than PUT, DELETE, POST, GET)
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const sendRequestError = (req, res) => res
    .status(405)
    .json({ message: `Method ${req.method} Not Allowed`, success: false });

export const isAuth = typeof window !== 'undefined' ? localStorage.getItem(LOCAL_STORAGE_AUTH_NAME) : false;

/**
 * delete the user data in browser local storage
 */
export const clearCurrentUserLocalStorage = () => {
  localStorage.removeItem(LOCAL_STORAGE_AUTH_NAME);
};

/**
 * save the user data to browser local storage
 * @param {*} currentUser
 * @returns
 */
export const updateCurrentUserLocalStorage = (currentUser) => {
  if (!currentUser) return;

  const json = {
    username: currentUser.username,
    sessionToken: currentUser.sessionToken,
    className: '_User',
  };

	const userData = JSON.stringify(json);
  localStorage.setItem(LOCAL_STORAGE_AUTH_NAME, userData);
};

export const setRequestError = (e) => {
  if (e.response.data) {
    return e.response.data.message;
  }

  return e.message;
};
