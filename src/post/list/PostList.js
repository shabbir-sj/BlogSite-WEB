import React, { Component } from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import RaisedButton from 'material-ui/RaisedButton';

import Post from './Post';
import style from '../post.css'
import Pagination from '../../components/pagination-ui/pagination'

class PostList extends Component {

	static contextTypes = {
		router: PropTypes.object.isRequired
	};

	static propTypes = {
		posts: PropTypes.array.isRequired,
		isFetching: PropTypes.bool.isRequired,
		onPageChange: PropTypes.func.isRequired,
		fetchPosts: PropTypes.func.isRequired
	};

	constructor(props) {
		super(props);
		this.onPageChange = this.props.onPageChange.bind(this);
		this.redirectToPostForm = this.redirectToPostForm.bind(this);
	}

	redirectToPostForm() {
		this.context.router.history.push(`/new`);
	}

	componentDidMount() {
		this.props.fetchPosts();
	}

	render() {
		const { posts, isFetching, count } = this.props;
		const isEmpty = posts.length === 0;
		return (
			<div className={style.post_list}>

				<div className={style.post_list__header}>
					Latest Posts
				</div>

				<div>
					{posts.map((post, i) =>
						<Post key={post.id} post={post}/>
					)}
				</div>

				<Pagination totalItems={count} onSetPage={this.onPageChange}/>
			</div>
		)
	}
}

export default PostList

