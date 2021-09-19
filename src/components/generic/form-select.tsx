import React from 'react';
import Select from 'react-select';
import { FieldWithLabelAndType, Item, SelectOption } from '../../types';

const FormSelect = <T extends Item> (
  {
    item, formField, setItem,
  } : {
    item: Item | null, formField: FieldWithLabelAndType<T>, setItem: (item: T) => void
  },
) : JSX.Element => {
  const selectedValues = (item as T)[formField.field] as number[];
  const optionsDictionary : {[x: number]: SelectOption} = formField.options
    ?.reduce((prev, curr) => ({ ...prev, [curr.value]: curr }), {}) ?? {};
  const selectedOptions = selectedValues
    ?.map((selectedValue) => optionsDictionary[selectedValue]) ?? [];

  formField.options
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
