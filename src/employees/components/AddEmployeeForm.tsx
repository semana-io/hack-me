import React, { useState, useContext, useRef } from 'react'
import { Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import { AppContext } from '../../context/Context';
import { Desk } from '../../desks/models/Desk';
import { Employee } from '../models/Employee';

import EmployeesList from './EmployeesList';

const animatedComponents = makeAnimated();

const AddEmployeeForm: React.FC = () => {
  // Put prop here if in edition mode
  const [values, setValues] = useState<{
    name: string;
    email: string;
    favoriteDesks: Desk[];
}>({
    name: '',
    email: '',
    favoriteDesks: []
  });

  const { employees, setEmployees, desks } = useContext(AppContext);

  const handleUserNameChange = (e) => {
    setValues({...values, name: e.target.value});
  }

  const handleUserEmailChange = (e) => {
    setValues({...values, email: e.target.value});
  }

  const handleUserDesksChange = (e) => {
    const deskToAdd = desks.find( d => d.id === e[0].value);
    console.log(deskToAdd);
    const tmpFavoriteDesks = values.favoriteDesks;
    if (deskToAdd && !tmpFavoriteDesks.find( d => d.id === parseInt(e.value, 10))) {
      tmpFavoriteDesks.push(deskToAdd)
      setValues({...values, favoriteDesks: tmpFavoriteDesks});
    }
  }

  const handleSubmission = (e) => {
    e.preventDefault();
    employees.push(new Employee(values.name, values.email, Array.isArray(values.favoriteDesks) ? values.favoriteDesks : []));
    setEmployees(employees);
    setValues({ name: '', email: '', favoriteDesks: []});
  }

  const desksToSelect = desks.map( d => ({ value: d.id, label: d.name }));

	return ( 
    <div>
      <h2>Employee Creation</h2>
      <Form id="employees-form" className="form-container" onSubmit={handleSubmission}>

        <Form.Group controlId="name">
          <Form.Label>Employee name</Form.Label>
          <Form.Control type="text" placeholder="Montmartre" value={values.name} onChange={handleUserNameChange}/>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Employee name</Form.Label>
          <Form.Control type="text" placeholder="albert@gmail.com" value={values.email} onChange={handleUserEmailChange}/>
        </Form.Group>
        <br />
        <Select
          controlId="desk"
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={desksToSelect}
          onChange={handleUserDesksChange}
          nodeRef={useRef(null)}
        />

        <Button className="form-button" type="submit">Save User</Button>

      </Form>
      {/* This would have been put in Employees Page if I could find a way to pass data between siblings with Context */}
      <EmployeesList />
    </div>
  )
}
export default AddEmployeeForm;


