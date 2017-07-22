import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Main from './components/Main'
import ListContainer from './post/list/ListContainer'
import DetailContainer from './post/detail/DetailContainer'
import FormContainer from './post/form/FormContainer'
import LoginContainer from './login/LoginContainer'

const AppRoute = () => (
	<Router>
		<Main>
			<Route exact path="/" component={ListContainer}/>
			<Route exact path="/login" component={LoginContainer}/>
			<Route path="/new" component={FormContainer}/>
			<Route name="post-detail" path="/post/:post_id" component={DetailContainer}/>
		</Main>
	</Router>
);

export default AppRoute;