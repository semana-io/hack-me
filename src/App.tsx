import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Desks from './components/desks';
import Employees from './components/employees';
import Navbar from './components/navbar';

const App = () : JSX.Element => (
  <div>
    <Router>
      <Navbar />
      <Route exact path="/employees">
        <Employees />
      </Route>
      <Route exact path="/desks">
        <Desks />
      </Route>
    </Router>
  </div>
);

export default App;
