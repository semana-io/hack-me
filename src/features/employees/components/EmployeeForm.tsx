import { Form, Formik } from "formik";
import { FC } from "react";
import { useAppSelector } from "../../../app/hooks";
import { FormInput } from "../../common/components/FormInput";
import { selectDesksArray } from "../../desks/state/selectors";
import { Employee, EmployeeDeskPreference } from "../state/employeesSlice";
import { EmployeeDeskList } from "./EmployeeDeskList";
import * as Yup from "yup";
import { Desk } from "../../desks/state/desksSlice";
import { FormSelect } from "../../common/components/FormSelect";
import { v4 as uuid } from "uuid";

// pretty much quick copy of the desk form but I'm in a hurry so I won't get fancy :P

export interface EmployeeFormProps {
  formCallback: (employee: Employee) => any;
  employee?: Employee;
}

interface EmployeFormState {
  id: string;
  name: string;
  email: string;
  selectedDesk: string;
  preferences: EmployeeDeskPreference[];
}

export const EmployeeForm: FC<EmployeeFormProps> = ({
  formCallback,
  employee,
}) => {
  const desks = useAppSelector(selectDesksArray);

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={turnEmployeeObjectIntoFormState(employee)}
        // this one is not typed, figure it out!
        validationSchema={Yup.object({
          id: Yup.string(),
          name: Yup.string().required("Required"),
          email: Yup.string().required("Required"),
          selectedDesk: Yup.string(),
          preferences: Yup.array(),
        })}
        onSubmit={(values, { setFieldValue, setSubmitting, resetForm }) => {
          if (!values.id) {
            console.log("New Employee");
            values.id = uuid();
          }
          formCallback(turnFormStateIntoEmployee(values));
          resetForm();
        }}
      >
        {({ values, setFieldError, setTouched, setFieldValue }) => (
          <Form>
            <FormInput
              label="name"
              name="name"
              type="text"
              placeholder="name"
            />
            <FormInput
              label="email"
              name="email"
              type="text"
              placeholder="email"
            />
            <EmployeeDeskList
              employeeId={values.id}
              preferences={values.preferences}
              onChange={(preferences) => {
                setFieldValue("preferences", preferences);
              }}
            />

            <FormSelect label="selectedDesk" name="selectedDesk">
              <option key="" value="">
                Select a desk
              </option>
              {getNonListedDesks(desks, values.preferences).map(
                ({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                )
              )}
            </FormSelect>

            <button
              type="button"
              onClick={() => {
                if (!values.selectedDesk) {
                  setTouched({ selectedDesk: true }, false);
                  setFieldError("selectedDesk", "Select a desk to add it");
                  return;
                }

                setFieldValue("preferences", [
                  ...values.preferences,
                  {
                    id: values.selectedDesk,
                    index: values.preferences.length,
                  },
                ]);
              }}
            >
              add desk
            </button>

            <button type="submit">
              {values.id ? "Edit Employee" : "Save Employee"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

// utils
const turnEmployeeObjectIntoFormState = (
  employee?: Employee
): EmployeFormState => ({
  id: employee?.id || "",
  name: employee?.name || "",
  email: employee?.email || "",
  preferences: employee?.deskPreferenceList || [],
  selectedDesk: "",
});

const turnFormStateIntoEmployee = ({
  email,
  id,
  name,
  preferences,
}: EmployeFormState): Employee => ({
  id,
  name,
  email,
  deskPreferenceList: preferences,
});

const getNonListedDesks = (
  allDesks: Desk[],
  desksInPreferences: EmployeeDeskPreference[]
) => {
  return allDesks.filter(
    (desk) =>
      !desksInPreferences.find((listedDesk) => listedDesk.id === desk.id)
  );
};
