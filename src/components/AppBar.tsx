import React from 'react'
import { Header, Box, Heading, Button } from 'grommet'
import { NavLink, withRouter, useHistory } from 'react-router-dom'
import { useMyContext } from 'context/MyContext'

interface AppBarProps {}

const AppBar: React.FC<AppBarProps> = () => {
	const { username, setUsername } = useMyContext()
	const history = useHistory()

	const logout = () => {
		setUsername('')
		history.push('/')
	}

	const renderLoginLogout = () =>
		username ? (
			<Box direction='row' gap='small'>
				<NavLink to='/desks'>Desks</NavLink>
				<NavLink to='/employees'>Employees</NavLink>
				<NavLink to='/calendar'>Calendar</NavLink>
				<Button onClick={() => logout()}>Logout</Button>
			</Box>
		) : (
			<NavLink to='/login'>Login</NavLink>
		)

	return (
		<Header
			pad={{ left: 'medium', right: 'medium', vertical: 'small' }}
			elevation='medium'
			background='brand'
		>
			<Heading level='3' margin='none'>
				Semana Technical Test
			</Heading>
			{username && <div>Logged in as {username}</div>}
			<Box direction='row' gap='small'>
				<NavLink to='/'>Home</NavLink>
				{renderLoginLogout()}
			</Box>
		</Header>
	)
}

export default withRouter(AppBar)
