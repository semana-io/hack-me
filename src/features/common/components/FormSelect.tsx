import { FieldInputProps, useField } from "formik";
import { FC } from "react";

export interface FormSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  // making name non optional for formik compatibility
  name: string;
  label: string;
}

export const FormSelect: FC<FormSelectProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error && <div>{meta.error}</div>}
    </>
  );
};
