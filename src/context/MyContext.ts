import { createContext, useContext } from 'react'

interface IMyContext {
	username: string
	setUsername: Function
}

const MyContext = createContext<IMyContext>({
	username: '',
	setUsername: () => {},
})

const useMyContext = () => useContext(MyContext)

export { MyContext, useMyContext }
