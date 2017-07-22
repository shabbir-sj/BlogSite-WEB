import React from 'react'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { combineReducers } from 'redux'

import reducer from './api-service/reducers'

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
	middleware.push(createLogger())
}

const store = createStore(
	reducer,
	applyMiddleware(...middleware)
);

const AppProvider = (props) => (
	<Provider store={store}>
		{props.children}
	</Provider>
);

export default AppProvider;