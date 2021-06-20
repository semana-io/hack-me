import React from 'react'
import { Grid, Box } from 'grommet'
import { useMyContext } from 'context/MyContext'
import Desk from '../models/Desk'

const DeskGrid: React.FC = () => {
	const arr = Array(8).fill('30px')
	const { desks, setDesks } = useMyContext()

	const formatAreaName = (x: number, y: number) => `area-${x}-${y}`

	const buildAreas = () => {
		const areas = []
		for (let x = 0; x < 8; x += 1) {
			for (let y = 0; y < 8; y += 1) {
				areas.push({ name: formatAreaName(x, y), start: [x, y], end: [x, y] })
			}
		}
		return areas
	}

	const addDesk = (x: number, y: number) => {
		const desk = new Desk(x, y)
		setDesks([...desks, desk])
	}

	const removeDesk = (x: number, y: number) => {
		setDesks(desks.filter(desk => desk.x !== x || desk.y !== y))
	}

	const buildGridSquares = () => {
		const squares = []

		for (let x = 0; x < 8; x += 1) {
			for (let y = 0; y < 8; y += 1) {
				const isAlreadyPresent = desks.find(desk => desk.x === x && desk.y === y)

				squares.push(
					<Box
						key={formatAreaName(x, y)}
						onClick={() => (isAlreadyPresent ? removeDesk(x, y) : addDesk(x, y))}
						gridArea={formatAreaName(x, y)}
						border='all'
						justify='center'
						align='center'
						background={isAlreadyPresent ? 'red' : ''}
					>
						{x} {y}
					</Box>
				)
			}
		}

		return squares
	}

	return (
		<Grid
			rows={arr}
			columns={arr}
			gap='small'
			margin='small'
			areas={buildAreas()}
		>
			{buildGridSquares()}
		</Grid>
	)
}

export default DeskGrid
