import React from 'react';
import { Button } from 'react-bootstrap';
import { AppContext } from '../../context/Context';

const editEmployee = (employee) => {
  console.log('employee', employee);
  alert('Method not yet implemented');
}

const UsersList: React.FC = () => {
	return ( 
      <AppContext.Consumer>{ ({employees}) => {
        const title = employees.length > 0 ? 'Employees list': null;
        return (
          <div>
          <h2>{ title }</h2>
          {employees.map( e => <div key={e.email}> 
              <p>Name: {e.name}</p>
              <p>Email: {e.email}</p>
              <div>Favorite desks : {e.favoriteDesks.map( d => d.name + ' ')}</div>
              <br />
              <Button
                type="button"
                onClick={() => editEmployee(e)}
              >
                Edit {e.name} (open modal TODO)
              </Button>
            </div>)}
          </div>
          )
        }
      }
    </AppContext.Consumer>
  )
}
export default UsersList;