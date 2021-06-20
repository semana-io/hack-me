import React, { useState } from 'react'
import { Form, FormField, TextInput, Box, Button } from 'grommet'
import { useHistory, withRouter } from 'react-router-dom'
import { useMyContext } from 'context/MyContext'

interface LoginInput {
	username: string
	password: string
}

const initialState = { username: '', password: '' }

const LoginForm: React.FC = () => {
	const history = useHistory()
	const { setUsername } = useMyContext()
	const [inputs, setInputs] = useState<LoginInput>(initialState)

	const handleOnSubmit = (username: string) => {
		setUsername(username)
		history.push('/')
	}
	return (
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
	)
}

export default withRouter(LoginForm)
