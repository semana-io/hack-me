import { FieldInputProps, useField } from "formik";
import { FC } from "react";

export interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  // making name non optional for formik compatibility
  name: string;
  label: string;
}

export const FormInput: FC<FormInputProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input {...field} {...props} />
      {meta.touched && meta.error && <div>{meta.error}</div>}
    </>
  );
};
