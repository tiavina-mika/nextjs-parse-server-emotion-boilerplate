import { setRequestError } from '../utils/utils';
import { TEMPLATE_API } from './api';

/**
 * api to create a template
 * @param {*} values // {name}
 * @returns
 */
export const createTemplate = async (values) => {
  let loading = true;
  let error;
  try {
    await TEMPLATE_API.createTemplate(values);
  } catch (e) {
    error = setRequestError(e);
  } finally {
    loading = false;
  }

  return {
    error,
    loading,
  };
};

/**
 * api to update a template
 * @param {string} id
 * @param {*} values // {name}
 * @returns
 */
export const editTemplate = async (id, values) => {
  let loading = false;
  let error;
  let result;
  try {
    result = await TEMPLATE_API.editTemplate(id, values);
  } catch (e) {
    error = setRequestError(e);
  } finally {
    loading = false;
  }

  return {
    error,
    loading,
    result,
  };
};
