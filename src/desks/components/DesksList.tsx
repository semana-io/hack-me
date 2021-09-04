import React from 'react';
import { Button } from 'react-bootstrap';
import { AppContext } from '../../context/Context';
import { Desk } from '../models/Desk';

const editDeskList = (desk: Desk) => {
  console.log('desk', desk);
  alert('Method not yet implemented');
}


const DesksList: React.FC = () => {
	return ( 
    <AppContext.Consumer>{ ({desks}) => {
        const title = desks.length > 0 ? 'Desks list': null;
        return (
          <div>
          <h2>{ title }</h2>
          {desks.map( d => <div key={d.id}> 
              {d.name}
              <br />
              <Button
                type="button"
                onClick={() => editDeskList(d)}
              >
                Edit {d.name} (open modal TODO)
              </Button>
            </div>)}
          </div>
          )
        }
      }
    </AppContext.Consumer>
  )
}
export default DesksList;