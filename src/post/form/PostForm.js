import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom'

import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

import { ValidatorForm, TextValidator} from '../../validator/index';

import style from '../post.css'

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

class PostForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {title: '', desc: '', snackbarOpen: false, isError: false, message: ''};
	}

	componentDidUpdate() {
		//const data = this.props.loginData;
		//if (data.error && !this.state.isError) {
		//	this.setState({snackbarOpen: true, message: data.error.message, isError: true});
		//} else if(data.response && data.response.token) {
		//	this.props.history.push('/');
		//}
	}

	handleSnackbarClose = () => {
		this.setState({ open: false });
	};


	handleTitleChange = (event) => {
		this.setState({title: event.target.value});
	};

	handleDescChange = (event) => {
		this.setState({desc: event.target.value});
	};

	handleSubmit = () => {
		this.setState({snackbarOpen: false, message: '', isError: false});
		this.props.doLogin(this.state.user, this.state.password);
	};

	render() {

		//progress.visibility = (this.props.loginData.isFetching) ? 'visible' : 'hidden';
		progress.visibility = 'hidden';

		return (
			<div className={style.post_form_page}>

				<div className={style.post_form__title}>
					Create New Post
				</div>

				<Paper zDepth={1}>
					<ValidatorForm
						className={style.post_form}
						ref="form"
						onSubmit={this.handleSubmit}
					>
						<CircularProgress style={progress} size={60} thickness={5} />

						<div className={style.bottom_margin10}>
							<TextValidator
								multiLine={true}
								rows={1}
								fullWidth={true}
								hintText="Put post title here"
								floatingLabelText="Title"
								name="title"
								value={this.state.title}
								onChange={this.handleTitleChange}
								validators={['required']}
								errorMessages={['this field is required']}
							/>
						</div>

						<div className={style.bottom_margin10}>
							<TextValidator
								multiLine={true}
								rows={5}
								rowsMax={12}
								fullWidth={true}
								hintText="Put post description here"
								floatingLabelText="Description"
								name="desc"
								value={this.state.desc}
								onChange={this.handleDescChange}
								validators={['required']}
								errorMessages={['this field is required']}
							/>
						</div>

						<div className={style.post_form__submit}>
							<RaisedButton
								type="submit"
								label="Submit"
								primary={true}
								style={{ minWidth: '200px' }}
							/>
						</div>
					</ValidatorForm>
				</Paper>

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

export default PostForm