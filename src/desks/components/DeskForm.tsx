import React, { useState, useContext } from 'react'
import { Button, Form } from 'react-bootstrap';
import { AppContext } from '../../context/Context';
import { Desk } from '../models/Desk';
import DesksList from './DesksList';

const DeskForm: React.FC<{ inModal: boolean }> = ({ inModal }) => {
  const { desks, setDesks, deskToEdit, setDeskToEdit } = useContext(AppContext);
  
  const [values, setValues] = useState<{
    id: number;
    name: string;
  }>({
      id: deskToEdit ? deskToEdit.id : -1,
      name: deskToEdit ? deskToEdit.name : ''
    });

  const handleDeskNameChange = (event) => {
    setValues({...values, name: event.target.value});
  }

  const handleSubmission = (event) => {
    event.preventDefault();
    if (!inModal) {
      desks.length === 0 ? desks.push(new Desk(values.id, values.name)) : desks.push(new Desk(desks[desks.length - 1].id + 1, values.name));
    } else {
      const deskTmpIdx = desks.findIndex(d => d.id === deskToEdit.id);
      desks[deskTmpIdx].name = values.name;
    }
    setDesks(desks);
    setValues({id: -1, name: ''});
    setDeskToEdit({id: -1, name: ''});
  }

	return ( 
    <div>
      <h2>Desk Creation</h2>
      
      <Form id="desk-form" className="form-container" onSubmit={handleSubmission}>
        <Form.Group controlId="name">
          <Form.Label>Desk name</Form.Label>
          <Form.Control type="text" placeholder="Montmartre" value={values.name} onChange={handleDeskNameChange}/>
        </Form.Group>
        <Button className="form-button" type="submit" disabled={!values.name}>Save Desk</Button>
      </Form>

      {/* This would have been put in Desks Page if I could find a way to pass data between siblings with Context */}
      {
        inModal ?  null : <DesksList />
      }

    </div>
  )
}
export default DeskForm;


