import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom'

import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

import { ValidatorForm, TextValidator} from '../validator/index';

import style from './login.css'

const s = {
	minWidth: '190px'
};

const progress = {
	position: 'absolute',
	top: '0',
	left: '0',
	right: '0',
	bottom: '0',
	margin: 'auto',
	height: '75px',
	width: '75px'
};

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {user: '', password: '', snackbarOpen: false, isError: false, message: ''};
	}

	componentDidUpdate() {
		const data = this.props.loginData;
		if (data.error && !this.state.isError) {
			this.setState({snackbarOpen: true, message: data.error.message, isError: true});
		} else if(data.response && data.response.token) {
			this.props.history.push('/');
		}
	}

	handleSnackbarClose = () => {
		this.setState({ open: false });
	};


	handleUserChange = (event) => {
		this.setState({user: event.target.value});
	};

	handlePasswordChange = (event) => {
		this.setState({password: event.target.value});
	};

	handleSubmit = () => {
		this.setState({snackbarOpen: false, message: '', isError: false});
		this.props.doLogin(this.state.user, this.state.password);
	};

	render() {

		progress.visibility = (this.props.loginData.isFetching) ? 'visible' : 'hidden';

		return (
			<div className={style.login_page}>

				<div className={style.login_form__title}>
					Login to Blog Site
				</div>

				<Paper zDepth={1}>
					<ValidatorForm
						className={style.login_form}
						ref="form"
						onSubmit={this.handleSubmit}
					>
						<CircularProgress style={progress} size={60} thickness={5} />

						<div className={style.bottom_margin10}>
							<TextValidator
								className={style.login_field}
								hintText="Email Or Mobile"
								floatingLabelText="Email Or Mobile"
								name="email"
								value={this.state.user}
								onChange={this.handleUserChange}
								validators={['required', 'isEmail']}
								errorMessages={['this field is required', 'email is not valid']}
							/>
						</div>

						<div className={style.bottom_margin10}>
							<TextValidator
								className={style.login_field}
								hintText="Password"
								floatingLabelText="Password"
								name="password"
								type="password"
								value={this.state.password}
								onChange={this.handlePasswordChange}
								validators={['required']}
								errorMessages={['this field is required']}
							/>
						</div>

						<div className={style.login_form__submit}>
							<RaisedButton
								type="submit"
								label="Submit"
								primary={true}
								style={{ minWidth: '200px' }}
							/>
						</div>
					</ValidatorForm>
				</Paper>

				<div className={style.login_form__footer}>
					<Link to="/">New User? Click here to join.</Link>
				</div>

				<Snackbar
					open={this.state.snackbarOpen}
					message={this.state.message}
					autoHideDuration={5000}
					onRequestClose={this.handleSnackbarClose}
				/>

			</div>
		);
	}
}

export default LoginForm