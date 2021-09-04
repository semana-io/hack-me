import React, { useState, useContext } from 'react'
import { Button } from 'react-bootstrap';

import { AppContext } from '../../context/Context';
import { Desk } from '../../desks/models/Desk';
import { Employee } from '../models/Employee';

import EmployeesList from './EmployeesList';

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
    const deskToAdd = desks.find( d => d.id === parseInt(e.target.value, 10));
    const tmpFavoriteDesks = values.favoriteDesks;
    if (deskToAdd && !tmpFavoriteDesks.find( d => d.id === parseInt(e.target.value, 10))) {
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

	return ( 
    <div>
      <h2>Employee Creation</h2>
      <form className="form-container" onSubmit={handleSubmission}>
        <input className="form-field" placeholder="Albert" value={values.name} onChange={handleUserNameChange}/>
        <br />
        <input className="form-field" placeholder="Dupontel" value={values.email} onChange={handleUserEmailChange}/>
        <br />
        <select onChange={handleUserDesksChange} placeholder="Montmartre" multiple>
          {
            desks.map( d => <option key={ d.id } value={d.id}>{ d.name }</option>)
          }
        </select>
        <br />
        <Button type="submit">Save User</Button>
      </form>
      {/* This would have been put in Employees Page if I could find a way to pass data between siblings with Context */}
      <EmployeesList />
    </div>
  )
}
export default AddEmployeeForm;


