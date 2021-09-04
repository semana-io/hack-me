import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import DesksPage from './desks/DesksPage';
import EmployeesPage from './employees/EmployeesPage';

function App() {
  return (
    <BrowserRouter>
            <Switch>
                <Route path="/" exact render={() => (<Redirect to={`/desks`} />)}/>
                <Route path='/desks' component={ DesksPage } />
                <Route path='/employees' component={ EmployeesPage } />
            </Switch>
        </BrowserRouter>

  );
}

export default App;
