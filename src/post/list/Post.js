import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper';
import style from '../post.css'
import { Link } from 'react-router-dom'


class Post extends Component {

	static contextTypes = {
		router: PropTypes.object.isRequired
	};

	static propTypes = {
		post: PropTypes.object.isRequired
	};

	constructor(props) {
		super(props);
		//this.handlePostClick = this.handlePostClick.bind(this);
	}

	getTruncatedString(string, n) {
		return (string.length > n) ? string.substr(0, n - 1) + '...' : this;
	}

	render() {
		const { post } = this.props;
		return (
			<Link to={`/post/${post.id}`} style={{ textDecoration: 'none' }}>
				<Paper className={style.post} zDepth={1}>
					<div className={style.post__pic}></div>
					<div className={style.post__info_container}>
						<div className={style.post__title}>
							{post.title}
						</div>
						<div className={style.post__author}>
							{post.author}
						</div>
						<div className={style.post__desc}>
							{this.getTruncatedString(post.desc, 300)}
						</div>
					</div>
				</Paper>
			</Link>
		)
	}
}

export default Post