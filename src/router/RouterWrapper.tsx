import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CalendarPage from 'pages/CalendarPage'
import DesksPage from 'pages/DesksPage'
import EmployeesPage from 'pages/EmployeesPage'
import HomePage from 'pages/HomePage'
import Layout from 'components/Layout'

interface RouterWrapperProps {}

const RouterWrapper: React.FC<RouterWrapperProps> = () => (
	<Router>
		<Layout>
			<Switch>
				<Route exact path='/'>
					<HomePage />
				</Route>
				<Route path='/desks'>
					<DesksPage />
				</Route>
				<Route path='/employees'>
					<EmployeesPage />
				</Route>
				<Route path='/calendar'>
					<CalendarPage />
				</Route>
			</Switch>
		</Layout>
	</Router>
)

export default RouterWrapper
