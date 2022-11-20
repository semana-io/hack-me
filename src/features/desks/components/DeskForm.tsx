import { Formik } from "formik";
import { FC, useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { FormInput } from "../../common/components/FormInput";
import { Desk } from "../state/desksSlice";
import * as Yup from "yup";

export interface DeskFormProps {
  formCallback: (desk: Desk) => any;
  desk?: Desk;
}

export const DeskForm: FC<DeskFormProps> = ({ formCallback, desk }) => {
  // const [deskId, setDeskId] = useState<string>("");
  // const [deskName, setDeskName] = useState<string>("");

  // useEffect(() => {
  //   setDeskId(desk?.id || "");
  //   setDeskName(desk?.name || "");
  // }, [desk]);

  // const resetForm = () => {
  //   setDeskName("");
  //   setDeskId("");
  // };

  const [initialFormValues, setInitialFormValue] = useState({ name: "" });

  return (
    <div>
      <Formik
        initialValues={initialFormValues}
        onSubmit={(values) =>
          formCallback({ id: desk?.id || uuidV4(), name: values.name })
        }
        validationSchema={Yup.object({
          name: Yup.string().required("required"),
        })}
      >
        <>
          <FormInput
            name="name"
            label="name"
            // onChange={(value) => setDeskName(value)}
            // value={deskName}
          />
          <button
            onClick={() => {
              // formCallback({ id: deskId || uuidV4(), name: deskName });
              // resetForm();
            }}
          >
            {desk?.id ? "Edit Desk" : "Add Desk"}
          </button>
        </>
      </Formik>
    </div>
  );
};
