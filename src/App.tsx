import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Desks from './components/desks';
import Employees from './components/employees';
import Navbar from './components/navbar';
import Assignment from './components/assignment';

const App = () : JSX.Element => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="container">
        <Router>
          <Navbar />
          <Route exact path="/employees">
            <Employees />
          </Route>
          <Route exact path="/desks">
            <Desks />
          </Route>
          <Route exact path="/assignment">
            <Assignment />
          </Route>
        </Router>
      </div>
    </QueryClientProvider>
  );
};

export default App;
