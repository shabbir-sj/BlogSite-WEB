
import { connect } from 'react-redux'
import queryString from 'query-string'
import { fetchPosts } from '../actions'

import PostList from './PostList'

const mapStateToProps = ({postList}, ownProps) => {
	console.log('----------', ownProps, '----------------');

	const posts = postList && postList.response ? postList.response.results : [];
	const count = postList && postList.response ? postList.response.count : 0;
	const error = postList && postList.error ? postList.error : null;

	return {
		posts,
		count,
		error,
		isFetching: (postList && postList.isFetching) || true
	}
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onPageChange: (newPage) => {
			const qs = queryString.stringify({page: newPage});
			ownProps.history.push({pathname: '/', search: ('?' + qs)});
			dispatch(fetchPosts({page: newPage}));
		},

		fetchPosts: () => {
			const qp = queryString.parse(ownProps.location.search);
			dispatch(fetchPosts(qp))
		}
	}
};

const ListContainer = connect(mapStateToProps, mapDispatchToProps)(PostList);
export default ListContainer