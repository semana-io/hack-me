import React from 'react'
import { Box } from 'grommet'
import { useMyContext } from '../context/MyContext'

const HomePage: React.FC = () => {
	const { employees, desks } = useMyContext()
	const employeesLength = employees.length
	const desksLength = desks.length
	const renderMessage = employeesLength !== 0 || desksLength !== 0
	return (
		<Box>
			<h1>Home page</h1>
			{renderMessage && (
				<p>
					You have {employeesLength} employees and {desksLength} desks.
				</p>
			)}
		</Box>
	)
}

export default HomePage
