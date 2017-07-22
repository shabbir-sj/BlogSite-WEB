import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper';

import style from '../post.css'

class PostDetail extends Component {
	static propTypes = {
		posts: PropTypes.object,
		isFetching: PropTypes.bool,
		fetchPost: PropTypes.func.isRequired
	};

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.fetchPost();
	}

	render() {

		const { post } = this.props;

		if (!post) {
			return null
		}

		return (
			<div className={style.post_page}>
				<div className={style.post_page__title}>
					{post.title}
				</div>

				<Paper zDepth={1} className={style.post_detail}>
					<div className={style.post_detail__desc}>
						{post.desc}
					</div>

					<div className={style.post_detail__author}>
						{post.author}
					</div>
				</Paper>



			</div>
		)
	}
}

export default PostDetail

