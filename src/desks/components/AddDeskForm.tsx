import React, { useState, useContext } from 'react'
import { Button } from 'react-bootstrap';
import { AppContext } from '../../context/Context';
import { Desk } from '../models/Desk';
import DesksList from './DesksList';

const AddDeskForm: React.FC = () => {
  const { desks, setDesks } = useContext(AppContext);

  const [values, setValues] = useState({
    id: 0,
    name: ''
  });

  const handleDeskNameChange = (e) => {
    setValues({...values, name: e.target.value});
  }

  const handleSubmission = (e) => {
    e.preventDefault();
    desks.length === 0 ? desks.push(new Desk(values.id, values.name)) : desks.push(new Desk(desks[desks.length - 1].id + 1, values.name));
    setDesks(desks);
    setValues({id: 0, name: ''});
  }

	return ( 
    <div>
      <form id="deskForm" className="form-container" onSubmit={handleSubmission}>
        <input className="form-field" placeholder="Montmartre" value={values.name} onChange={handleDeskNameChange}/>
        <br />
        <Button type="submit">Save Desk</Button>
      </form>
      <DesksList />
    </div>
  )
}
export default AddDeskForm;


