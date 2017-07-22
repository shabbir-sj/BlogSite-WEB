import {
	REQUEST, RESPONSE, ERROR
} from './actions'


const reducer = (state = {}, action) => {

	let obj = {};

	const identifier = action.identifier || 'temp';

	switch (action.type) {

		case REQUEST:
			obj = {...state};
			obj[action.identifier] = {isFetching: true};
			return obj;
		case RESPONSE:
			obj = {...state};
			obj[action.identifier] = {isFetching: false, response: action.response};
			return obj;
		case ERROR:
			obj = {...state};
			obj[action.identifier] = {isFetching: false, error: action.error};
			return obj;
		default:
			return state
	}
};

export default reducer