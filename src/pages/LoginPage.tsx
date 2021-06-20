/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import useLocalStorage from 'utils/useLocalStorage'
import { Form, FormField, TextInput, Box, Button } from 'grommet'
import { useHistory, withRouter } from 'react-router-dom'
import { useMyContext } from 'context/MyContext'

interface LoginInput {
	username: string
	password: string
}

const initialState = { username: '', password: '' }

const LoginPage: React.FC = () => {
	const history = useHistory()
	const { setUsername } = useMyContext()
	const [inputs, setInputs] = useState<LoginInput>(initialState)

	const handleOnSubmit = (username: string) => {
		setUsername(username)
		history.push('/')
	}

	return (
		<Box>
			<h1>Login page</h1>
			<p>(for simplicity purposes, you can enter anything you want to login)</p>
			<Form
				value={inputs}
				onChange={nextValue => {
					setInputs(nextValue)
				}}
				onReset={() => setInputs(initialState)}
				onSubmit={({ value }) => handleOnSubmit(value.username)}
			>
				<FormField name='username' htmlFor='username-input-id' label='Username'>
					<TextInput id='username-input-id' name='username' />
				</FormField>
				<FormField name='password' htmlFor='password-input-id' label='Password'>
					<TextInput id='password-input-id' name='password' type='password' />
				</FormField>
				<Box direction='row' gap='medium' justify='center'>
					<Button type='submit' primary label='Submit' />
				</Box>
			</Form>
		</Box>
	)
}

export default withRouter(LoginPage)
