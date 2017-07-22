import React  from 'react'
import { Link } from 'react-router-dom'

import {AppBar} from 'material-ui'
import FlatButton from 'material-ui/FlatButton'

import LoginMenu from '../login/LoginMenu'

import style from './main.css'

const Main = (props) => {
	return (
		<div>
			<AppBar
				href="/"
				title={<Link to='/' className={style.navbar__title}>Blog Site</Link>} showMenuIconButton={false}
				iconElementRight={<LoginMenu />}
			/>
			<div className="container">
				{/* <!-- Mount child routes --> */}
				{props.children}
			</div>
		</div>
	);
};

export default Main;