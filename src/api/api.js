import axios from 'axios';
/* eslint-disable no-return-await */

export const authorized = (sessionToken) => {
	return {
		headers: {
			Authorization: `Basic ${sessionToken}`,
		},
	};
};

const uploadConfig = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
});

// main requests
export const requests = {
  get: async (url, config) => await instance.get(url, config),
  post: async (url, body, config) => await instance.post(url, body, config),
  put: async (url, body, config) => await instance.put(url, body, config),
  delete: async (url, data) => await instance.delete(url, data),
};

export const AUTH_API = {
  login: async (body) => requests.post('api/login', body),
  signup: async (body) => requests.post('api/signup', body),
  logout: async () => requests.post('api/logout', {}),
  getCurrentUser: async () => requests.get('api/currentUser'),
};

export const TEMPLATE_API = {
  getTemplates: async () => requests.get('api/templates'),
  getTemplate: async (id) => requests.get(`api/templates/${id}`),
  createTemplate: async (body) => requests.post('api/templates', body),
  editTemplate: async (id, body) => requests.put(`api/templates/${id}`, body),
  deleteTemplate: async (id) => requests.delete(`api/templates/${id}`),
};

export const TRACKING_API = {
  uploadXls: async (body) => requests.post('api/trackings/upload', body, uploadConfig),
  getTrackings: async () => requests.get('api/trackings'),
  getTracking: async (id) => requests.get(`api/trackings/${id}`),
  createTracking: async (body) => requests.post('api/trackings', body),
  editTracking: async (id, body) => requests.put(`api/trackings/${id}`, body),
  deleteTracking: async (id) => requests.delete(`api/trackings/${id}`),
};
