import {
 filter, sort, capitalizeCase, isNull,
} from './utils';

/**
 * get values from parseObject
 * @param {Parse.Object} parseObject
 * @param {Array|Set} names
 * @param [dest]
 */
export const getValues = (parseObject, names, dest = {}) => {
	if (parseObject == null) {
		// makes it work with redux-form initialValues
		return null;
	}
	names.forEach((name) => {
		const value = parseObject.get(name);
		if (value != null) {
			dest[name] = value;
		}
	});
	return dest;
};

/**
 * . null or undefined values aren't set
 * . a value is set only when it's different
 * @param parseObject
 * @param values
 * @param {Array|Set} names (optional), ensures we only set the right properties
 */

 export const setValue = (parseObject, name, value) => {
	const oldValue = parseObject.get(name);
	if (isNull(value)) {
		parseObject.unset(name);
	} else if (oldValue !== value) {
		parseObject.set(name, value);
	}
};

export const setValues = (parseObject, values, names) => {
	if (names) {
		values = filter(values, names);
	}
	for (const key in values) {
		if (!values.hasOwnProperty(key)) {
      /* eslint-disable-next-line no-continue */
			continue;
		}
		const value = values[key];
		setValue(parseObject, key, value);
	}
};

export const equals = (obj1, obj2) => {
	if (obj1 == null) {
		return obj2 == null;
	}
	if (obj2 == null) {
		return false;
	}
	return obj1.id === obj2.id;
};

// -------------------------------------------------------------------------//
// ------------------------------ User utils -------------------------------//
// -------------------------------------------------------------------------//
export const getFirstName = (user) => {
	if (!user) return null;
	const firstName = user.get('firstName') || '';
	return capitalizeCase(firstName);
};

export const getLastName = (user) => {
	if (!user) return null;
	const lastName = user.get('lastName') || '';
	return lastName.toUpperCase();
};

export const getUserName = (user) => {
	if (!user) return '';
	return getFirstName(user) + ' ' + getLastName(user);
};

export const getFullName = (user) => {
	if (!user) return null;
	return getFirstName(user) + ' ' + getLastName(user);
};
export const getInverseFullName = (user) => {
	if (!user) return null;
	return getLastName(user) + ' ' + getFirstName(user);
};

// -------------------------------------------------------------------------//
// -------------------------------- sorting --------------------------------//
// -------------------------------------------------------------------------//
// --------------------------------//
// ------------ orders ------------//
// --------------------------------//
const orderSortKeySupplier = (order) => {
	const plan = order.get('date');
	const user = plan ? plan.get('user') : null;
	return user ? getFullName(user).toLowerCase() : order.id.toLowerCase();
};
export const sortOrders = (array) => {
	sort(array, orderSortKeySupplier);
};

export const toId = (parseObjOrId) => {
	if (!parseObjOrId) {
		return null;
	}
	if (typeof parseObjOrId === 'string') {
		return parseObjOrId;
	}
	return parseObjOrId.id;
};

/**
 * compares by id
 * @param parseObjects
 * @param searchedParseObject
 * @returns {boolean}
 */
export const includes = (parseObjects, searchedParseObject) => {
	if (!parseObjects || !searchedParseObject) {
		return false;
	}
	const searchedId = searchedParseObject.id;
	return !!parseObjects.find((obj) => obj.id === searchedId);
};

/**
 * @param {Array} parseObjects
 * @param {Array} excludedObjects
 * @return {Array} a filtered copy
 */
export const exclude = (parseObjects, excludedObjects) => {
	const excludedIds = new Set();
	excludedObjects.forEach((excludedObject) => excludedIds.add(excludedObject.id));
	return parseObjects.filter((parseObject) => !excludedIds.has(parseObject.id));
};

/**
 * get distinct of objects
 * @param {Array<Parse.Object>} parseObjects
 * @param {string} [key], it can be 'username', 'name', 'date'
 * @returns {Array}
 */
export const setDistinctObjects = (parseObjects, key = 'id') => {
	if (!parseObjects) return [];
	const array = [];
	parseObjects.forEach((parseObj) => {
		if (!array.find((item) => item[key] === parseObj[key])) {
			array.push(parseObj);
		}
	});
	return array;
};

// ----- query combination -----//

const createComparisonQuery = ({
	query, property, value, operator,
}) => {
	const doesNotExistsQuery = new Parse.Query(query.className).doesNotExist(property);
	const operatorQuery = new Parse.Query(query.className)[operator](
	property,
	value,
	);
	return Parse.Query.or(doesNotExistsQuery, operatorQuery);
};

export class ComparisonQuery {
  static greaterThanIfExists({
 query, property, value, strict = false,
}) {
    const operator = strict ? 'greaterThan' : 'greaterThanOrEqualTo';
    return createComparisonQuery({
 query, property, value, operator,
});
  }

  static lessThanIfExists({
 query, property, value, strict = false,
}) {
    const operator = strict ? 'lessThan' : 'lessThanOrEqualTo';
    return createComparisonQuery({
 query, property, value, operator,
});
  }

  static containsIfExists({ query, property, value }) {
    return createComparisonQuery({
      query,
      property,
      value,
      operator: 'contains',
    });
  }

  static equalToIfExists({ query, property, value }) {
    return createComparisonQuery({
      query,
      property,
      value,
      operator: 'equalTo',
    });
  }
}

export const overlappedIntervalQuery = ({
  query,
  propertyStart,
  propertyEnd,
  startValue,
  endValue,
}) => {
  const fieldStartQuery = new Parse.Query(query.className)
    .lessThanOrEqualTo(propertyStart, startValue)
    .greaterThanOrEqualTo(propertyEnd, startValue);
  const fieldEndQuery = new Parse.Query(query.className)
    .lessThanOrEqualTo(propertyStart, endValue)
    .greaterThanOrEqualTo(propertyEnd, endValue);
  const bothFieldsQuery = new Parse.Query(query.className)
    .greaterThanOrEqualTo(propertyStart, startValue)
    .lessThanOrEqualTo(propertyEnd, endValue);

  return Parse.Query.or(fieldStartQuery, fieldEndQuery, bothFieldsQuery);
};
