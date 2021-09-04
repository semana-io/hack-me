import React, { useState, useContext } from 'react'
import { Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import { AppContext } from '../../core/context/Context';
import { Desk } from '../../desks/models/Desk';
import { Employee } from '../models/Employee';

import EmployeesList from './EmployeesList';

const animatedComponents = makeAnimated();

const AddEmployeeForm: React.FC = () => {
  
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
    let tmpFavoriteDesks = values.favoriteDesks;
    tmpFavoriteDesks = desks.filter(d => !!e.find( desk => desk.value === d.id));
    setValues({...values, favoriteDesks: tmpFavoriteDesks});
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
          <Form.Control type="text" placeholder="Albert" required value={values.name} onChange={handleUserNameChange}/>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Employee name</Form.Label>
          <Form.Control type="text" placeholder="albert@gmail.com" required value={values.email} onChange={handleUserEmailChange}/>
        </Form.Group>
        <br />
        <Select
          controlId="desk"
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={desksToSelect}
          onChange={handleUserDesksChange}
        />

        <Button className="form-button" type="submit" disabled={!values.email || !values.name}>Save User</Button>

      </Form>
      
      {/* This would have been put in Employees Page if I could find a way to pass data between siblings with Context */}
      <EmployeesList />

    </div>
  )
}

export default AddEmployeeForm;


