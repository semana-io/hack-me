import React from 'react'
import { Box } from 'grommet'
import AppBar from './AppBar'

interface LayoutProps {
	children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
	<Box>
		<AppBar />
		<Box
			flex
			overflow={{ horizontal: 'hidden' }}
			align='center'
			justify='center'
			pad='small'
		>
			{children}
		</Box>
	</Box>
)

export default Layout
