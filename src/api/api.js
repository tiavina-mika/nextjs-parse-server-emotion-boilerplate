import axios from 'axios';
/* eslint-disable no-return-await */
// get endpoint base url (ex: http://127.0.0.7/ (local) or https://api.increzia.com/public/ (prod))
const instance = axios.create({
  baseURL: 'http://localhost:3000/',
});

// const responseBody = (response) => response.data;

// main requests
const requests = {
  get: async (url, config) => await instance.get(url, config),
  post: async (url, body, config) => await instance.post(url, body, config),
  put: async (url, body, config) => await instance.put(url, body, config),
  delete: async (url, data) => await instance.delete(url, data),
};

// Templates endpoint (/api/Templates)
export const TEMPLATE_API = {
  getTemplates: async () => requests.get('api/templates'),
  getTemplate: async (id) => requests.get(`api/templates/${id}`),
  createTemplate: async (body) => requests.post('api/templates', body),
  editTemplate: async (id, body) => requests.put(`api/templates/${id}`, body),
  deleteTemplate: async (id) => requests.delete(`api/templates/${id}`),
};
