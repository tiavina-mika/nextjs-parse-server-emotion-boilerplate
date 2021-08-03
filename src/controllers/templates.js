import { getValues, save, setValues } from '../utils/parseUtils';

// --------------------------------------------------------//
// ------------------ Parse <=> Object --------------------//
// --------------------------------------------------------//

const TEMPLATE_PROPERTIES = new Set(['name']);

/**
 * get values for current template
 * @param template
 * @returns {Object}
 */
export const getTemplateValues = (template) => {
	return getValues(template, TEMPLATE_PROPERTIES);
};
/**
 * set template values
 * @param template
 * @param values
 */
export const setTemplateValues = (template, values) => {
	setValues(template, values, TEMPLATE_PROPERTIES);
};

/**
 * save template with its values
 * @param {*} template
 * @param {*} values
 * @returns
 */
export const saveTemplate = async (template, values, sessionToken) => {
	setTemplateValues(template, values);
	const newTemplate = await save(template, sessionToken);

	return newTemplate;
};

// --------------------------------------------------------//
// --------------------- CRUD actions ---------------------//
// --------------------------------------------------------//

/**
 * get one template by its id
 * @param {*} id
 * @returns
 */
export const getTemplate = async (id) => {
	const template = await new Parse.Query('Template')
		.equalTo('objectId', id)
		.first();
	return template;
};

/**
 * create new template
 * only authenticated user can create a template, so we need the session token to pass to the server
 * @param values
 * @param {string} sessionToken
 * @returns {*}
 */
export const createTemplate = async (values, sessionToken) => {
	const Template = Parse.Object.extend('Template');
	const template = new Template();

	const newTemplate = await saveTemplate(template, values, sessionToken);
	return newTemplate;
};

/**
 * update template
 * @param {string} id
 * @param values
 * @returns {*}
 */
export const editTemplate = async (id, values, sessionToken) => {
	const template = await getTemplate(id);
	const newTemplate = await saveTemplate(template, values, sessionToken);
	return newTemplate;
};

/**
 * delete current template
 * PS: it's just mark the doc as delete = true, not delete it completely from the database
 * @param {string} id
 * @returns {*}
 */
export const deleteTemplate = async (id, sessionToken) => {
	const template = await getTemplate(id);
	template.set('deleted', true);

	await save(template, sessionToken);

	return template;
};

/**
 * load all templates
 * @returns {Function}
 */
export const getTemplates = async () => {
	const templates = await new Parse.Query('Template')
		.notEqualTo('deleted', true)
		.find();

	return templates;
};
