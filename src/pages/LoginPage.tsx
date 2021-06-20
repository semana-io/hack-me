import React from 'react'
import LoginForm from 'components/LoginForm'
import { Box } from 'grommet'

const LoginPage: React.FC = () => (
	<Box>
		<h1>Login page</h1>
		<p>(for simplicity purposes, you can enter anything you want to login)</p>
		<LoginForm />
	</Box>
)

export default LoginPage
