import { api, action } from '../api-service/actions'

const path = 'post/posts/';
const listIdentifier = 'postList';
const detailIdentifier = 'post';
const createIdentifier = 'newPost';

export const fetchPosts = (qp) => dispatch => {
	let {request, response, error} = action(listIdentifier);
	request();
	api.getAll(path, qp, null, listIdentifier).then(
        (res) => dispatch(response(res)),
        (err) => dispatch(error(err))
	).catch((err) => {
		dispatch(err);
	});
};

export const fetchPost = (id) => dispatch => {
	let {request, response, error} = action(detailIdentifier);
	request();
	api.getOne(path, id, null, null, detailIdentifier).then(
        (res) => dispatch(response(res))
	).catch((err) => {
		dispatch(err);
	});
};


export const createPost = () => dispatch => {
	let {request, response, error} = action(createIdentifier);
	request();
	api.post(path, data, params, header, identifier).then(
        (res) => dispatch(response(res))
	).catch((err) => {
		dispatch(err);
	});
};