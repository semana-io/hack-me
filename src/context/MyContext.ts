import { createContext, useContext } from 'react'
import Employee from 'models/Employee'
import Desk from 'models/Desk'

interface IMyContext {
	username: string
	setUsername: Function
	employees: Employee[]
	setEmployees: Function
	desks: Desk[]
	setDesks: Function
}

const MyContext = createContext<IMyContext>({
	username: '',
	setUsername: () => {},
	employees: [],
	setEmployees: () => {},
	desks: [],
	setDesks: () => {},
})

const useMyContext = () => useContext(MyContext)

export { MyContext, useMyContext }
