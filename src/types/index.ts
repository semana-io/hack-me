type SelectOption = { label: string, value: number };
type FieldType = 'text' | 'email' | 'number' | 'select';

export type Item = {[x: string]: string | number | number[]};
export type FieldsWithLabels<T> = ({ field: keyof T, label: string })[];

export type FieldWithLabelAndType<T extends Item> = {
  field: keyof T, label: string, type: FieldType, options?: SelectOption[]
};
export type FieldsWithLabelsAndTypes<T extends Item> = FieldWithLabelAndType<T>[];
