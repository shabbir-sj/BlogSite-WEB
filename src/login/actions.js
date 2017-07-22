import { action, api } from '../api-service/actions'
import { setAuthToken } from '../api-service/auth-service'

const path = 'user/login/';
const identifier = 'login';

export const login = (data) => dispatch => {
	let {request, response, error} = action(identifier);
	request();
	api.post(path, data, null, null, identifier).then(
		(res) => {
			setAuthToken(res.data.token);
			dispatch(response(res));
		}
	).catch(err => {
		dispatch(error(err))
	});
};