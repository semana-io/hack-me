import { FC } from "react";
import { Desk } from "../../desks/components/DeskListItem";

export interface DeskSelectInputProps {
  desks: Desk[];
  value?: Desk;
  onChange: (desk: Desk) => any;
}

export const DeskSelectInput: FC<DeskSelectInputProps> = ({
  desks,
  value,
  onChange,
}) => {
  if (!value) {
    return null;
  }

  return (
    <select
      value={value.id}
      onChange={({ target }) =>
        onChange(desks.find((desk) => desk.id === target.value)!)
      }
    >
      {desks.map(({ id, name }) => (
        <option value={id}>{name}</option>
      ))}
    </select>
  );
};
