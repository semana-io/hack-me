import React from 'react'
import { Grommet } from 'grommet'
import Layout from 'components/Layout'

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
		<Layout> Body </Layout>
	</Grommet>
)

export default App
