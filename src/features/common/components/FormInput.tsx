import { FC } from "react";

export interface FormInputProps {
  label: string;
  value: string;
  onChange: (value: string) => any;
}

export const FormInput: FC<FormInputProps> = ({ label, value, onChange }) => {
  return (
    <div>
      <div>{label}</div>
      <input
        type="text"
        value={value}
        onChange={({ target }) => onChange(target.value)}
      />
    </div>
  );
};
