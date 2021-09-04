import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { AppContext } from './context/Context';
import './App.css';
import DesksPage from './desks/DesksPage';
import EmployeesPage from './employees/EmployeesPage';
import Navigation from './shared/components/Navigation';
import { useState } from 'react';

function App() {
  const [desks, setDesks] = useState([]);
  const [employees, setEmployees] = useState([]);
  return (
    <div>
      <BrowserRouter>
      <Navigation />
      <AppContext.Provider value={{ desks, setDesks, employees, setEmployees }}>
        <Switch>
            <Route path="/" exact render={() => (<Redirect to={`/desks`} />)}/>
            <Route path='/desks' component={ DesksPage } />
            <Route path='/employees' component={ EmployeesPage } />
        </Switch>
        </AppContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
