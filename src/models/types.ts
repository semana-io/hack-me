export type Item = {[x: string]: string | number};
export type FieldsWithLabels<T> = ({ field: keyof T, label: string })[];
export type FieldsWithLabelsAndTypes<T> = ({ field: keyof T, label: string, type: 'text' | 'email' | 'number' })[];
