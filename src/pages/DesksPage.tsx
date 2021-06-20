import React from 'react'
import { Box, Grid, Button } from 'grommet'
import { FormClose } from 'grommet-icons'
import { useMyContext } from 'context/MyContext'
import DeskGrid from 'components/DeskGrid'

const DesksPage: React.FC = () => {
	const { desks, setDesks } = useMyContext()

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
