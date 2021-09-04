import React from 'react';
import { AppContext } from '../../context/Context';

const editEmployee = (employee) => {
  console.log('employee', employee);
  alert('Method not yet implemented');
}

const UsersList: React.FC = () => {
	return ( 
    <div>
      <h2>Employees list</h2>
      <AppContext.Consumer>{ ({employees}) =>
        employees.map( e => <div key={e.email}> 
            <p>Name: {e.name}</p>
            <p>Email: {e.email}</p>
            <div>Favorite desks : {e.favoriteDesks.map( d => d.name + ' ')}</div>
            <br />
            <button
              type="button"
              onClick={() => editEmployee(e)}
            >
              Edit {e.name} (open modal TODO)
            </button>
          </div>
          )
        }
      </AppContext.Consumer>
    </div>
  )
}
export default UsersList;