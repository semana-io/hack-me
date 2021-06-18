import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders Semana Technical Test', () => {
	render(<App />)
	const linkElement = screen.getByText(/Semana Technical Test/i)
	expect(linkElement).toBeInTheDocument()
})
