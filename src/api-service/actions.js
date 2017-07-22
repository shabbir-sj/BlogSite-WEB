import fetch from 'isomorphic-fetch'
import queryString from 'query-string'
import { polyfill } from 'es6-promise'
polyfill();

import { getAuthToken } from './auth-service'

const baseURL = 'http://0.0.0.0:8005/';

export const REQUEST = 'REQUEST';
export const RESPONSE = 'RESPONSE';
export const ERROR = 'ERROR';

export function action(identifier) {
	return {
		request() {
			return dispatch => {
				dispatch({
					type: REQUEST,
					identifier: identifier
				});
			};
		},

		response(response) {
			return dispatch => {
				dispatch({
					type: RESPONSE,
					response: response.data,
					header: response.header,
					identifier: identifier
				});
			};
		},

		error(data) {
			return dispatch => {
				dispatch({
					error: data,
					type: ERROR,
					identifier: identifier
				});
			}
		}
	};
}

// Core Methods
function checkStatus(response, jsondata) {
	if (response.status >= 200 && response.status < 300) {
		var res = {header: response.header, data: jsondata};
		console.log('request succeeded with JSON response', response);
		return res;
	} else {
		var error = new Error(jsondata.detail || response.statusText);
		error.detail = response;
		throw error;
	}
}

function parseJSON(response) {
	return response.json()
}

// Main work horse
function doApiRequest(path, method, id, data, params, header, identifier) {
	let url = baseURL + path;

	if (id) {
		url = url + id + '/';
	}

	if(params) {
		const qs = queryString.stringify(params);
		url = url + '?' + qs;
	}

	let defaultHeader = {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	};

	const authToken = getAuthToken();
	if (authToken) {
		defaultHeader['Authorization'] = 'Token ' + authToken;
	}

	if (header) {
		defaultheader = Object.assign(defaultHeader, header);
	}

	let rawResponse = null;
	return fetch(url, {
			method: method,
			headers: defaultHeader,
			body: data ? JSON.stringify(data) : null
		})
		.then((res) => {
			rawResponse = res;
			return res;
		})
		.then(parseJSON)
		.then(function (jsondata) {
			return checkStatus(rawResponse, jsondata);
		})
		.catch(error => {
			console.log('request failed', error);
			throw error;
		});
}

export const api = {

	getAll(path, params, header, identifier) {
		return doApiRequest(path, 'GET', null, null, params, header, identifier);
	},

	getOne(path, id, params, header, identifier) {
		return doApiRequest(path, 'GET', id, null, params, header, identifier);
	},

	post(path, data, params, header, identifier) {
		return doApiRequest(path, 'POST', null, data, params, header, identifier);
	},

	patch(path, id, data, params, header, identifier) {
		return doApiRequest(path, 'PATCH', id, data, params, header, identifier);
	},
	remove(path, header, identifier) {
		return doApiRequest(path, 'DELETE', null, null, null, header, identifier);
	}
};


