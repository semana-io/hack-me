import React from 'react'
import { Grommet } from 'grommet'
import RouterWrapper from 'router/RouterWrapper'

const theme = {
	global: {
		font: {
			family: 'Roboto',
			size: '18px',
			height: '20px',
		},
	},
}

const App = () => (
	<Grommet theme={theme}>
		<RouterWrapper />
	</Grommet>
)

export default App
