import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { FieldsWithLabelsAndTypes, Item } from '../../models/types';

const FormModal = <T extends Item> (
  {
    label, isModalOpen, setIsModalOpen, formFields, initialItem, submit,
  } :
  {
    label: string,
    isModalOpen: boolean,
    setIsModalOpen: (bool: boolean) => void,
     formFields: FieldsWithLabelsAndTypes<Item>,
     initialItem: T | null,
     submit: (item: T) => Promise<void>
  },
) : JSX.Element => {
  const [item, setItem] = React.useState<T | null>(initialItem);

  const addItemAndClose = async (newItem: T) => {
    await submit(newItem);
    setIsModalOpen(false);
  };

  useEffect(() => {
    setItem(initialItem);
  }, [initialItem]);

  Modal.setAppElement('#root');

  return (
    <Modal
      isOpen={!!item && isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
      contentLabel={label}
      className="modal d-block"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{label}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setIsModalOpen(false)} />
          </div>
          <div className="modal-body">
            <form>
              {formFields.map((formField) => (
                <div className="mb-3" key={formField.field}>
                  {`${formField.label}:`}
                  <input type={formField.type} value={(item as T)[formField.field] as string | number} onChange={(e) => setItem({ ...(item as T), [formField.field]: e.target.value })} className="form-control" />
                </div>
              ))}
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setIsModalOpen(false)}>Close</button>
            <button type="button" className="btn btn-dark" onClick={() => addItemAndClose((item as T))}>{label}</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default FormModal;
