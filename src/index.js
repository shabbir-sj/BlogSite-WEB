import React from 'react'
import { render } from 'react-dom'

import { polyfill } from 'es6-promise'
import injectTapEventPlugin from 'react-tap-event-plugin';

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import AppProvider from './app-reducer'
import AppRoute from './routes'

polyfill();
injectTapEventPlugin();

render(
	<AppProvider>
		<MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
			<AppRoute />
		</MuiThemeProvider>
	</AppProvider>,
	document.getElementById('app')
);