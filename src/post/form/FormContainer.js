import { connect } from 'react-redux'
import { createPost } from '../actions'

import PostForm from './PostForm'

const mapStateToProps = (state, ownProps) => {
	const {newPost} = state;

	if (!newPost) {
		return {
			isFetching: true
		}
	}

	return {
		isFetching: newPost.isFetching
	}
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		createPost: () => {
			dispatch(createPost())
		}
	}
};

const FormContainer = connect(mapStateToProps, mapDispatchToProps)(PostForm);
export default FormContainer