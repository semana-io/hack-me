import React, { FormEvent, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { FieldsWithLabelsAndTypes, Item } from '../../types';
import FormSelect from './form-select';

const FormModal = <T extends Item> (
  {
    title, isModalOpen, setIsModalOpen, formFields, initialItem, submit,
  } :
  {
    title: string,
    isModalOpen: boolean,
    setIsModalOpen: (bool: boolean) => void,
    formFields: FieldsWithLabelsAndTypes<T>,
    initialItem: Item | null,
    submit: (item: T) => Promise<void>
  },
) : JSX.Element => {
  const [item, setItem] = useState<Item | null>(initialItem);

  useEffect(() => {
    setItem(initialItem);
  }, [initialItem]);

  const onSubmit = async (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submit(item as T);
    setIsModalOpen(false);
  };

  return (
    <Modal
      isOpen={!!item && isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
      contentLabel={title}
      className="modal d-block"
      ariaHideApp={false}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setIsModalOpen(false)} />
          </div>
          <form onSubmit={onSubmit} data-testid="form">
            <div className="modal-body">
              {formFields.map((formField) => (
                <div className="mb-3" key={formField.field as string} data-testid={`field-${formField.field as string}`}>
                  {`${formField.label}:`}
                  {formField.type === 'select'
                    ? <FormSelect formField={formField} item={item} setItem={setItem} />
                    : <input required type={formField.type} value={(item as T)[formField.field] as string | number} onChange={(e) => setItem({ ...(item as T), [formField.field]: e.target.value })} className="form-control" />}
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setIsModalOpen(false)}>Close</button>
              <button type="submit" className="btn btn-dark" data-testid="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default FormModal;
