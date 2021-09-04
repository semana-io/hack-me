import React, { useContext } from 'react';
import { AppContext } from '../../context/Context';
import { Desk } from '../models/Desk';
import AddDeskForm from './AddDeskForm';

let editDesk: boolean = false;

const editDeskList = (desk: Desk) => {
  console.log('desk', desk);
  editDesk = !editDesk;
}


const DesksList: React.FC = () => {
	return ( 
  <div>
    <h2>Desks list</h2>
    <AppContext.Consumer>{ 
      ({desks}) => {
        console.log('desks', desks);
        return desks.map( d => <div key={d.id}> 
          {d.name}
          <button
            type="button"
            onClick={() => editDeskList(d)}
          >
            Edit (open modal TODO)
          </button>
        </div>
        )}
      }
    </AppContext.Consumer>
  </div>)
}
export default DesksList;