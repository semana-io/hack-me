import React, { useState } from 'react'
import { Grommet } from 'grommet'
import RouterWrapper from 'router/RouterWrapper'
import { MyContext } from 'context/MyContext'
import useLocalStorage from 'utils/useLocalStorage'
import Employee from 'models/Employee'

const theme = {
	global: {
		font: {
			family: 'Roboto',
			size: '18px',
			height: '20px',
		},
	},
}

const App = () => {
	const [username, setUsername] = useLocalStorage('username', '')
	const [employees, setEmployees] = useState<Employee[]>([])

	return (
		<Grommet theme={theme}>
			<MyContext.Provider
				value={{ username, setUsername, employees, setEmployees }}
			>
				<RouterWrapper />
			</MyContext.Provider>
		</Grommet>
	)
}

export default App
