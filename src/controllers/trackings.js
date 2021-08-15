import { getValues, save, setValues } from '../utils/parseUtils';

// --------------------------------------------------------//
// ------------------ Parse <=> Object --------------------//
// --------------------------------------------------------//

const fields = ['dataCreation', 'MSIDSN', 'dateReceivedCase'];
const TRACKING_PROPERTIES = new Set(fields);

export const formatTrackingData = (columns) => {
	return columns.map((col) => ({
		[fields[0]]: col['Date demande Création'],
		[fields[1]]: col.MSIDSN,
		[fields[2]]: col[' Recrutement (Date réception dossier)'],
		// 'Date demande Création': 44391,
		// MSIDSN: 329496465,
		// ' Recrutement (Date réception dossier)': 44383,
		// 'Date envoi dossier à RR OM': 44389,
		// 'Date Validation RR OM': 44390,
		// ' Récept° dossiers par BO TIA': 44390,
		// 'Date Envoi à BO TIA & Reporting OMM': 44391,
		// 'Montant 1er dépot': 200000,
		// 'Statut 1er dépôt \r\n(Success, Failed)': 'Success',
		// 'Date fin Création Nomad': 44393,
		// 'Statut Création Nomad (OK, NOK)': 'OK',
		// 'Statut création Tango (OK, NOK)': 'NOK',
		// 'Motif de rejet': 'PRT INEXISTANT',
		// 'RR OM': 'HHJ',
		// RTL: 'DAVID',
		// TDR: 'TIA PAQUITO',
		// 'REF TXN 1ER DEPOT': 'MP210629.1631.C39753',
		// 'CONTRAT (Franchise, MicroDist, SousDist, SuperDist)': 'SousDist',
		// 'NOM PDV': 'VOLASOA BINVENUE',
		// 'NOM TITULAIRE': 'VOLASOA BINVENUE',
		// MSIDSN_1: 329496465,
		// CIN: 715052000899,
		// 'DATE DE NAISSANCE': 25052,
		// 'DATE DE DELIVRANCE CIN': 31953,
		// 'ADRESSE PERSONNELLE': 'ANIVORANO I',
		// ACTIVITES: 'CASH POINT',
		// "NUMERO D'IDENTIFICATION FISCALE (NIF)": 5002862956,
		// 'STAT   ': '61906712017002411',
		// 'ADRESSE PDV': 'ANIVORANO I',
		// 'CODE POSTAL': 202,
		// 'MASTER AGENT \r\n( SUPER DISTRIBUTEUR )': 'MCM 328369348',
		// 'ZONE RDZ': 'DIA',
		// REGION: 'R01',
		// DISTRICT: 'ANIVORANO NORD',
		// COMMUNE: 'ANIVORANO NORD',
		// FOKONTANY: 'ANIVORANO I',
		// 'CODE TANGO': 'DIA_R01_ANIVORANO NORD_ANIVORANO NORD_ANIVORANO I',
		// 'CONTACT PERSO (MSISDN)': 326661546
	}));
};

/**
 * get values for current tracking
 * @param tracking
 * @returns {Object}
 */
export const getTrackingValues = (tracking) => {
	return getValues(tracking, TRACKING_PROPERTIES);
};
/**
 * set tracking values
 * @param tracking
 * @param values
 */
export const setTrackingValues = (tracking, values) => {
	setValues(tracking, values, TRACKING_PROPERTIES);
};

/**
 * save tracking with its values
 * @param {*} tracking
 * @param {*} values
 * @returns
 */
export const saveTracking = async (tracking, values, sessionToken) => {
	setTrackingValues(tracking, values);
	const newTracking = await save(tracking, sessionToken);

	return newTracking;
};

// --------------------------------------------------------//
// --------------------- CRUD actions ---------------------//
// --------------------------------------------------------//

/**
 * get one tracking by its id
 * @param {*} id
 * @returns
 */
export const getTracking = async (id) => {
	const tracking = await new Parse.Query('Tracking')
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
export const createTracking = async (values, sessionToken) => {
	const Tracking = Parse.Object.extend('Tracking');
	const tracking = new Tracking();

	const newTracking = await saveTracking(tracking, values, sessionToken);
	return newTracking;
};

/**
 * update tracking
 * @param {string} id
 * @param values
 * @returns {*}
 */
export const editTracking = async (id, values, sessionToken) => {
	const tracking = await getTracking(id);
	const newTracking = await saveTracking(tracking, values, sessionToken);
	return newTracking;
};

/**
 * delete current tracking
 * PS: it's just mark the doc as delete = true, not delete it completely from the database
 * @param {string} id
 * @returns {*}
 */
export const deleteTracking = async (id, sessionToken) => {
	const tracking = await getTracking(id);
	tracking.set('deleted', true);

	await save(tracking, sessionToken);

	return tracking;
};

/**
 * load all trackings
 * @returns {Function}
 */
export const getTrackings = async () => {
	const trackings = await new Parse.Query('Tracking')
		.notEqualTo('deleted', true)
		.find();

	return trackings;
};
