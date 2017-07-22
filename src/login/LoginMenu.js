import React, {Component} from 'react';
import { withRouter } from 'react-router-dom'

import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import LoginForm from './LoginForm'
import style from './login.css'

import { getAuthToken, setAuthToken } from '../api-service/auth-service'

const customContentStyle = {
  width: '33%',
  maxWidth: '768px'
};

class LoginMenu extends Component {

	constructor(props) {
		super(props);
		this.state = {
			open: false
		};
	}

	handleTouchTap = (event) => {
		// This prevents ghost click.
		event.preventDefault();

		if (!getAuthToken()) {
			this.props.history.push("/login");
		} else {
			this.setState({
				open: true,
				anchorEl: event.currentTarget
			});
		}
	};

	handleRequestClose = () => {
		this.setState({
			open: false
		});
	};

	refresh = () => {
		window.location.reload();
	};

	createNewPost = () => {
		this.props.history.push("/new");
	};

	redirectToList = () => {
		this.props.history.push("/");
	};

	signOut = () => {
		setAuthToken(null);
		window.location.reload();
	};

	render() {

		return (
			<div>
				<IconButton onTouchTap={this.handleTouchTap}>
					<FontIcon className={`${style.login_icon} fa fa-user`}/>
				</IconButton>

				<Popover
					open={this.state.open}
					anchorEl={this.state.anchorEl}
					anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
					targetOrigin={{horizontal: 'left', vertical: 'top'}}
					onRequestClose={this.handleRequestClose}
					animation={PopoverAnimationVertical}
				>
					<Menu>
						<MenuItem primaryText="Refresh" onTouchTap={this.refresh} />
						<MenuItem primaryText="Create New Post" onTouchTap={this.createNewPost} />
						<MenuItem primaryText="Blog List" onTouchTap={this.redirectToList} />
						<MenuItem primaryText="Sign out" onTouchTap={this.signOut} />
					</Menu>
				</Popover>
			</div>
		);

	}
}

export default withRouter(LoginMenu);