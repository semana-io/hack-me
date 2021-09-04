import React, { useContext, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

import { AppContext } from '../../context/Context';
import { Desk } from '../models/Desk';

import AddDeskForm from './AddDeskForm';


const DesksList: React.FC = () => {
  const { desks, setDesks ,setDeskToEdit } = useContext(AppContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const editDeskList = (desk: Desk) => {
    setDeskToEdit(desk)
    setShow(true);
  };

  const removeFromDesksList = (desk: Desk) => {
    const idx = desks.findIndex( d => d.id === desk.id );
    desks.splice(idx, 1);
    setDesks(desks);
  }

	return ( 
    <div>
      <AppContext.Consumer>{ ({desks}) => {
        const title = desks.length > 0 ? 'Desks list': null;
        return (
          <div>
            <h2>{ title }</h2>
            {desks.map( d => <div key={d.id}>
                <div className="data-list">
                  {d.name}
                  <Button
                    type="button"
                    onClick={() => editDeskList(d)}
                  >
                    Edit
                  </Button>
                  <Button
                    type="button"
                    onClick={() => removeFromDesksList(d)}
                  >
                    Delete (works but view not refreshed)
                  </Button>
                </div>
                <hr />
              </div>)}
            </div>
            )
          }
        }
      </AppContext.Consumer>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Desk Assignation</Modal.Title>
        </Modal.Header>
        <Modal.Body>{
          <AddDeskForm inModal={true}/>
        }</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
export default DesksList;