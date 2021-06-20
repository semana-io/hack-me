import { createContext, useContext } from 'react'
import Employee from 'models/Employee'

interface IMyContext {
	username: string
	setUsername: Function
	employees: Employee[]
	setEmployees: Function
}

const MyContext = createContext<IMyContext>({
	username: '',
	setUsername: () => {},
	employees: [],
	setEmployees: () => {},
})

const useMyContext = () => useContext(MyContext)

export { MyContext, useMyContext }
