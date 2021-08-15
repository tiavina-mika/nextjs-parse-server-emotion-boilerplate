import { setRequestError } from '../utils/utils';
import { TRACKING_API } from './api';

/**
 * api to upload a tracking from ms excel file
 * @param {*} values // {name}
 * @returns
 */
 export const uploadTracking = async (values) => {
  let loading = true;
  let error;
  try {
    const formData = new FormData();
    values.xls.forEach((file) => {
      formData.append('xls[]', file.originFileObj);
    });
    await TRACKING_API.uploadXls(formData);
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
 * api to create a tracking
 * @param {*} values // {name}
 * @returns
 */
export const createTracking = async (values) => {
  let loading = true;
  let error;
  try {
    await TRACKING_API.createTracking(values);
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
 * api to update a tracking
 * @param {string} id
 * @param {*} values // {name}
 * @returns
 */
 export const editTracking = async (id, values) => {
  let loading = false;
  let error;
  let result;
  try {
    result = await TRACKING_API.editTracking(id, values);
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

/**
 * api to delete a tracking
 * @param {string} id
 * @returns
 */
 export const deleteTracking = async (id) => {
  let loading = false;
  let error;
  try {
    await TRACKING_API.deleteTracking(id);
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
