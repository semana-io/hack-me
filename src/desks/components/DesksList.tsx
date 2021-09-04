import React from 'react';
import { AppContext } from '../../context/Context';
import { Desk } from '../models/Desk';

const editDeskList = (desk: Desk) => {
  console.log('desk', desk);
  alert('Method not yet implemented');
}


const DesksList: React.FC = () => {
	return ( 
  <div>
    <h2>Desks list</h2>
    <AppContext.Consumer>{ 
      ({desks}) => {
        return desks.map( d => <div key={d.id}> 
          {d.name}
          <br />
          <button
            type="button"
            onClick={() => editDeskList(d)}
          >
            Edit {d.name} (open modal TODO)
          </button>
        </div>
        )}
      }
    </AppContext.Consumer>
  </div>)
}
export default DesksList;