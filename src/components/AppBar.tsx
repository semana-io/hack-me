import React from 'react'
import { Header, Box, Heading } from 'grommet'

interface AppBarProps {}

const AppBar: React.FC<AppBarProps> = () => (
	<Header
		pad={{ left: 'medium', right: 'medium', vertical: 'small' }}
		elevation='medium'
		background='brand'
	>
		<Heading level='3' margin='none'>
			Semana Technical Test
		</Heading>
		<Box direction='row' gap='small'>
			<Box onClick={() => {}} hoverIndicator>
				Desks
			</Box>
			<Box onClick={() => {}} hoverIndicator>
				Employees
			</Box>
			<Box onClick={() => {}} hoverIndicator>
				Calendar
			</Box>
		</Box>
	</Header>
)

export default AppBar
