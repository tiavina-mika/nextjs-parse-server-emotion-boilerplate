import { getValues, save, setValues } from '../utils/parseUtils';

// --------------------------------------------------------//
// ------------------ Parse <=> Object --------------------//
// --------------------------------------------------------//

const TRACKING_PROPERTIES = new Set(['username', 'identifier', 'firstName', 'lastName']);

/**
 * get values for current tracking
 * @param tracking
 * @returns {Object}
 */
export const getTrackingsValues = (tracking) => {
	return getValues(tracking, TRACKING_PROPERTIES);
};
/**
 * set tracking values
 * @param tracking
 * @param values
 */
export const setTrackingsValues = (tracking, values) => {
	setValues(tracking, values, TRACKING_PROPERTIES);
};

/**
 * save tracking with its values
 * @param {*} tracking
 * @param {*} values
 * @returns
 */
export const saveTrackings = async (tracking, values, sessionToken) => {
	setTrackingsValues(tracking, values);
	const newTrackings = await save(tracking, sessionToken);

	return newTrackings;
};

// --------------------------------------------------------//
// --------------------- CRUD actions ---------------------//
// --------------------------------------------------------//

/**
 * get one tracking by its id
 * @param {*} id
 * @returns
 */
export const getTrackings = async (id) => {
	const tracking = await new Parse.Query('Trackings')
		.equalTo('objectId', id)
		.first();
	return tracking;
};

/**
 * create new tracking
 * only authenticated user can create a tracking, so we need the session token to pass to the server
 * @param values
 * @param {string} sessionToken
 * @returns {*}
 */
export const createTrackings = async (values, sessionToken) => {
	const Trackings = Parse.Object.extend('Trackings');
	const tracking = new Trackings();

	const newTrackings = await saveTrackings(tracking, values, sessionToken);
	return newTrackings;
};

/**
 * update tracking
 * @param {string} id
 * @param values
 * @returns {*}
 */
export const editTrackings = async (id, values, sessionToken) => {
	const tracking = await getTrackings(id);
	const newTrackings = await saveTrackings(tracking, values, sessionToken);
	return newTrackings;
};

/**
 * delete current tracking
 * PS: it's just mark the doc as delete = true, not delete it completely from the database
 * @param {string} id
 * @returns {*}
 */
export const deleteTrackings = async (id, sessionToken) => {
	const tracking = await getTrackings(id);
	tracking.set('deleted', true);

	await save(tracking, sessionToken);

	return tracking;
};

/**
 * load all trackings
 * @returns {Function}
 */
export const getTrackingss = async () => {
	const trackings = await new Parse.Query('Trackings')
		.notEqualTo('deleted', true)
		.find();

	return trackings;
};
