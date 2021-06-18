import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Calendar from 'pages/Calendar'
import Desks from 'pages/Desks'
import Employees from 'pages/Employees'
import Home from 'pages/Home'
import Layout from 'components/Layout'

interface RouterWrapperProps {}

const RouterWrapper: React.FC<RouterWrapperProps> = () => (
	<Router>
		<Layout>
			<Switch>
				<Route exact path='/'>
					<Home />
				</Route>
				<Route path='/desks'>
					<Desks />
				</Route>
				<Route path='/employees'>
					<Employees />
				</Route>
				<Route path='/calendar'>
					<Calendar />
				</Route>
			</Switch>
		</Layout>
	</Router>
)

export default RouterWrapper
