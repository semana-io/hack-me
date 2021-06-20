import React from 'react'
import { Box, Main } from 'grommet'
import AppBar from './AppBar'

interface LayoutProps {
	children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
	<Box>
		<AppBar />
		<Main align='center' justify='center' pad='small'>
			{children}
		</Main>
	</Box>
)

export default Layout
