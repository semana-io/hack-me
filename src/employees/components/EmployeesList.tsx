import React from 'react';
import { Button } from 'react-bootstrap';
import { AppContext } from '../../context/Context';

const editEmployee = (employee) => {
  alert('Method not yet implemented');
}

const UsersList: React.FC = () => {
	return ( 
      <AppContext.Consumer>{ ({employees}) => {
        const title = employees.length > 0 ? 'Employees list': null;

        return (
          <div>
            <h2>{ title }</h2>
            <hr />
            {employees.map( e => <div key={e.email}> 
              <div className="data-list">
                <span><b>Name:</b> {e.name} </span>
                <span><b>Email:</b> {e.email} </span>
                <span><b>Favorite desks:</b> {e.favoriteDesks.map( d => d.name + ' ')}</span>
                <Button
                  type="button"
                  onClick={() => editEmployee(e)}
                >
                  Edit (open modal TODO)
                </Button>
              </div>
              <hr />
            </div>)}
          </div>
          )
        }
      }
    </AppContext.Consumer>
  )
}

export default UsersList;