/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Box, Grid, Form, FormField, TextInput, Button } from 'grommet'
import { FormClose } from 'grommet-icons'
import { useMyContext } from 'context/MyContext'
import Desk from 'models/Desk'
import DeskGrid from 'components/DeskGrid'

interface DesksFormInput {
	x: number
	y: number
}

const initialState = { x: 0, y: 0 }

const DesksPage: React.FC = () => {
	const [inputs, setInputs] = useState<DesksFormInput>(initialState)
	const { desks, setDesks } = useMyContext()

	const handleOnSubmit = ({ x, y }: DesksFormInput) => {
		if (desks.find(desk => desk.x === x && desk.y === y)) {
			return
		}

		const desk = new Desk(x, y)
		setDesks([...desks, desk])
	}

	const handleOnClickItem = (id: string) => {
		setDesks(desks.filter(desk => desk.id !== id))
	}

	const desksList = desks.map(desk => (
		<Box key={desk.id} direction='row' align='center'>
			{`${desk.x} ${desk.y}`}
			<Button icon={<FormClose />} onClick={() => handleOnClickItem(desk.id)} />
		</Box>
	))

	return (
		<Grid
			rows={['auto', 'medium']}
			columns={['medium', 'auto']}
			gap='small'
			margin='small'
			areas={[
				{ name: 'header', start: [0, 0], end: [1, 0] },
				{ name: 'display', start: [0, 1], end: [0, 1] },
				{ name: 'list', start: [1, 1], end: [1, 1] },
			]}
		>
			<Box gridArea='header' align='center' width='95vw'>
				<h1>Desks configuration</h1>
			</Box>
			<Box gridArea='display' pad='small' border='all'>
				<DeskGrid />
			</Box>
			<Box gridArea='list' pad='medium' gap='xsmall' border='all'>
				{desksList}
			</Box>
		</Grid>
	)
}
export default DesksPage
