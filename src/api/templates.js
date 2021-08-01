import { setRequestError } from '../utils/utils';
import { TEMPLATE_API } from './api';

// export const createTemplate = async (values) => {
//   let error;
//   try {
//       await TEMPLATE_API.createTemplate(values);
//   } catch (e) {
//     if (e.response.data) {
//       error = e.response.data.message;
//     }
//   }

//   return error;
// };

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
