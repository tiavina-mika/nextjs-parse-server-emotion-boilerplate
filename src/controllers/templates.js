import { getValues, setValues } from '../utils/parseUtils';

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
export const saveTemplate = async (template, values) => {
	setTemplateValues(template, values);
	const newTemplate = await template.save();
	return newTemplate;
};

// --------------------------------------------------------//
// --------------------- CRUD actions ---------------------//
// --------------------------------------------------------//

export const getTemplate = async (id) => {
	const template = await new Parse.Query('Template')
		.equalTo('objectId', id)
		.first();
	return template;
};
/**
 * create new template
 * @param values
 * @returns {*}
 */
export const createTemplate = async (values) => {
	const Template = Parse.Object.extend('Template');
	const template = new Template();

	const newTemplate = await saveTemplate(template, values);
	return newTemplate;
};

/**
 * update template
 * @param {string} id
 * @param values
 * @returns {*}
 */
export const editTemplate = async (id, values) => {
	const template = await getTemplate(id);
	const newTemplate = await saveTemplate(template, values);
	return newTemplate;
};

/**
 * delete current template
 * @param {string} id
 * @returns {*}
 */
export const deleteTemplate = async (id) => {
	// const newTemplates = templates.filter((m) => m !== template);
	const template = await getTemplate(id);
	template.set('deleted', true);
	await template.save();
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
