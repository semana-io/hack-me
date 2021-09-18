import React from 'react';
import Select from 'react-select';
import { FieldWithLabelAndType, Item } from '../../types';

const FormSelect = <T extends Item> (
  {
    item, formField, setItem,
  } : {
    item: Item | null, formField: FieldWithLabelAndType<T>, setItem: (item: T) => void
  },
) : JSX.Element => {
  const selectedValues = (item as T)[formField.field] as number[];
  const selectedOptions = formField.options
    ?.filter((option) => selectedValues?.includes(option.value as number));
  return (
    <Select
      options={formField.options}
      isMulti
      value={selectedOptions}
      onChange={
      (values) => setItem(
        {
          ...(item as T), [formField.field]: values.map((value) => value.value),
        },
      )
    }
    />
  );
};

export default FormSelect;
