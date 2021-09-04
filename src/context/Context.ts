import { createContext, useContext } from 'react';
import { Desk } from '../desks/models/Desk';
import { Employee } from '../employees/models/Employee';

interface ContextType {
  desks: Desk[],
  setDesks: Function,
  employees: Employee[],
  setEmployees: Function
}

const AppContext = createContext<ContextType>({
	desks: [],
	setDesks: value => {},
  employees: [],
  setEmployees: value => {}
})

const useAppContext = () => useContext(AppContext)

export { AppContext, useAppContext }