import { FC, useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { FormInput } from "../../common/components/FormInput";
import { Desk } from "./DeskListItem";

export interface DeskFormProps {
  formCallback: (desk: Desk) => any;
  desk?: Desk;
}

export const DeskForm: FC<DeskFormProps> = ({ formCallback, desk }) => {
  const [deskId, setDeskId] = useState<string>("");
  const [deskName, setDeskName] = useState<string>("");

  useEffect(() => {
    setDeskId(desk?.id || "");
    setDeskName(desk?.name || "");
  }, [desk]);

  const resetForm = () => {
    setDeskName("");
    setDeskId("");
  };

  return (
    <div>
      <FormInput
        label="name"
        onChange={(value) => setDeskName(value)}
        value={deskName}
      />
      <button
        onClick={() => {
          formCallback({ id: deskId || uuidV4(), name: deskName });
          resetForm();
        }}
      >
        {desk?.id ? "Edit Desk" : "Add Desk"}
      </button>
    </div>
  );
};
