import React from 'react'
import { useMyContext } from 'context/MyContext'
import { Redirect, Route } from 'react-router-dom'

interface LoggedInRouteProps {
	path: string
	component: React.ReactNode
}

const LoggedInRoute: React.FC<LoggedInRouteProps> = ({ path, component }) => {
	const { username } = useMyContext()
	return (
		<>
			{username ? (
				<Route path={path} render={() => component} />
			) : (
				<Redirect to='/login' />
			)}
		</>
	)
}

export default LoggedInRoute
