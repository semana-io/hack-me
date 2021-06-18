import React from 'react'
import { Header, Box, Heading } from 'grommet'
import { NavLink } from 'react-router-dom'

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
			<NavLink to='/'>Home</NavLink>
			<NavLink to='/desks'>Desks</NavLink>
			<NavLink to='/employees'>Employees</NavLink>
			<NavLink to='/calendar'>Calendar</NavLink>
		</Box>
	</Header>
)

export default AppBar
