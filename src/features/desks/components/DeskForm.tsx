import { Form, Formik } from "formik";
import { FC, useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { FormInput } from "../../common/components/FormInput";
import { Desk } from "../state/desksSlice";
import * as Yup from "yup";

export interface DeskFormProps {
  formCallback: (desk: Desk) => any;
  desk?: Desk;
}

interface FormState {
  id: string;
  name: string;
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

  // const [initialFormValues, setInitialFormValue] = useState({ name: "" });

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={turnDeskObjectIntoFormState(desk)}
        onSubmit={(values, { resetForm }) => {
          if (!values.id) {
            console.log("new desk");
            values.id = uuidV4();
          }
          formCallback(turnFormStateIntoDesk(values));
          resetForm();
        }}
        validationSchema={Yup.object({
          id: Yup.string(),
          name: Yup.string().required("required"),
        })}
      >
        {({ values }) => (
          <Form>
            <FormInput
              name="name"
              label="name"
              placeholder="name"
              // onChange={(value) => setDeskName(value)}
              // value={deskName}
            />
            <button
              type="submit"
              // onClick={() => {
              //   // formCallback({ id: deskId || uuidV4(), name: deskName });
              //   // resetForm();
              // }}
            >
              {values.id ? "Edit Desk" : "Add Desk"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const turnDeskObjectIntoFormState = (desk?: Desk): FormState => ({
  id: desk?.id || "",
  name: desk?.name || "",
});

const turnFormStateIntoDesk = ({ id, name }: FormState): Desk => ({
  id,
  name,
});
