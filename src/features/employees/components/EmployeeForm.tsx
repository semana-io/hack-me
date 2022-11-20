import { Form, Formik } from "formik";
import { FC, useEffect, useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { FormInput } from "../../common/components/FormInput";
import { selectDesksArray } from "../../desks/state/selectors";
import { Employee, EmployeeDeskPreference } from "../state/employeesSlice";
import { DeskSelectInput } from "./DeskSelectInput";
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
  const [formState, setFormState] = useState<EmployeFormState>(
    turnEmployeeObjectIntoFormState()
  );

  // update employee if new one is passed from props
  useEffect(() => {
    setFormState(turnEmployeeObjectIntoFormState(employee));
  }, [employee]);

  // const [name, setName] = useState<string>("");
  // const [email, setEmail] = useState<string>("");
  // const [deskList, setDeskList] = useState<EmployeeDeskPreference[]>([]);
  // const [selectedDesk, setSelectedDesk] = useState<EmployeeDeskPreference>();

  // useEffect(() => {
  //   setName(employee?.name || "");
  //   setEmail(employee?.email || "");
  //   setDeskList(employee?.deskPreferenceList || []);
  //   setSelectedDesk(employee?.deskPreferenceList[0]);
  // }, [employee]);

  // const resetForm = () => {
  //   setName("");
  //   setEmail("");
  //   setDeskList([]);
  // };

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={formState}
        validationSchema={Yup.object({
          name: Yup.string().required("Required"),
          email: Yup.string().required("Required"),
          selectedDesk: Yup.string(),
        })}
        onSubmit={(values, { setFieldValue, setSubmitting }) => {
          if (!values.id) {
            console.log("New Employee");
            setFieldValue("id", uuid());
          }
          console.log("Values on submit", values);
          setFormState(turnEmployeeObjectIntoFormState());
          formCallback(turnFormStateIntoEmployee(formState));
        }}
      >
        {({ values, setFieldError, setTouched }) => (
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
            {/* NOTE: there is a fieldArray component that can be used here but its simpler and cleaner to have preferences
                  be handled outside of formik, TODO:!!! try to move it to use <FieldArray> */}
            <EmployeeDeskList
              employeeId={values.id}
              preferences={values.preferences}
              // employee={{ name, email, deskPreferenceList: deskList }}
              onChange={(preferences) =>
                setFormState({ ...formState, preferences })
              }
            />

            <FormSelect label="selectedDesk" name="selectedDesk">
              <option key="" value="">
                Select a desk
              </option>
              {getNonListedDesks(desks, formState.preferences).map(
                ({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                )
              )}
            </FormSelect>

            {/* <DeskSelectInput
          desks={getNonListedDesks()}
          value={selectedDesk || getNonListedDesks()[0]}
          onChange={(desk) => {
            setSelectedDesk({
              ...desk,
              index: deskList.length,
            });
          }}
        /> */}

            <button
              type="button"
              onClick={() => {
                if (!values.selectedDesk) {
                  setTouched({ selectedDesk: true }, false);
                  setFieldError("selectedDesk", "Select a desk to add it");
                  return;
                }

                const newState = {
                  ...formState,
                  preferences: [
                    ...formState.preferences,
                    {
                      id: values.selectedDesk,
                      index: formState.preferences.length,
                    },
                  ],
                };
                setFormState(newState);
                // setDeskList([...deskList, selectedDesk!]);
              }}
            >
              add desk
            </button>

            <button
              // onClick={() => {

              //   // formCallback({ name, email, deskPreferenceList: deskList });
              //   // resetForm();
              // }}
              type="submit"
            >
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
