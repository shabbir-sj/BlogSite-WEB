import { connect } from 'react-redux'
import { fetchPost } from '../actions'

import PostDetail from './PostDetail'

const mapStateToProps = (state, ownProps) => {
	console.log('----------', ownProps, '----------------');
	const {post} = state;

	if (!(post && post.response.id == ownProps.match.params.post_id)) {
		return {
			isFetching: true
		}
	}

	return {
		post: post.response,
		isFetching: post.isFetching,
		error: post.error
	}
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		fetchPost: () => {
			dispatch(fetchPost(ownProps.match.params.post_id))
		}
	}
};

const DetailContainer = connect(mapStateToProps, mapDispatchToProps)(PostDetail);
export default DetailContainer