import { connect } from 'react-redux'
import queryString from 'query-string'
import { login } from './actions'

import LoginForm from './LoginForm'

const mapStateToProps = ({login}, ownProps) => {

	const loginData = {
		response: login ? login.response : null,
		isFetching: (login && login.isFetching) || false,
		error: login ? login.error : null
	};

	return {
		...ownProps,
		loginData
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		doLogin: (user, password) => {
			dispatch(login({username: user, password}))
		}
	}
};

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(LoginForm);
export default LoginContainer