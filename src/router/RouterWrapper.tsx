import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CalendarPage from 'pages/CalendarPage'
import DesksPage from 'pages/DesksPage'
import EmployeesPage from 'pages/EmployeesPage'
import HomePage from 'pages/HomePage'
import Layout from 'components/Layout'
import LoginPage from 'pages/LoginPage'
import LoggedInRoute from './LoggedInRoute'

interface RouterWrapperProps {}

const RouterWrapper: React.FC<RouterWrapperProps> = () => (
	<Router>
		<Layout>
			<Switch>
				<Route exact path='/'>
					<HomePage />
				</Route>
				<LoggedInRoute path='/desks' component={<DesksPage />} />
				<LoggedInRoute path='/employees' component={<EmployeesPage />} />
				<LoggedInRoute path='/calendar' component={<CalendarPage />} />
				<Route path='/login'>
					<LoginPage />
				</Route>
			</Switch>
		</Layout>
	</Router>
)

export default RouterWrapper
