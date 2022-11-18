import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { DeskListItem } from "../../desks/components/DeskListItem";
import { selectDesksByIds } from "../../desks/state/selectors";
import { EmployeeDeskPreference } from "../state/employeesSlice";
import { selectEmployeeDeskPreferences } from "../state/selectors";

export interface EmployeeDeskListProps {
  employeeId: string;
  draftMode: boolean;
}

// NOTE: NEXT TIME BE AWARE OF HAVING FORMS THAT AUTO SAVES VS THAT REQUIRES SAVING OF THE DRAFT
//       AND IF POSSIBLE JUST DEFAULT TO DRAFT ONE SINCE ITS MORE POWERFULL AND IT SIMPLIFIES THE WHOLE THING

// couple of observations, with current knowlage you only have "save entire object/collection" action in the store and all the logic of manipulating that
// object/collection lies inside the component (form)  and based on quick research around form libraries thats the prefered way

// so TODO: make it accept list from the props and have it either auto save or have callback that will be called with updated list
// that way it will be usable as live list and draft list

// another todo: implement formik or react final form on other forms on the page
// and fix all the code issues resulted in changing state shape
export const EmployeeDeskList: FC<EmployeeDeskListProps> = ({ employeeId }) => {
  const dispatch = useAppDispatch();

  const desksPreferences = useAppSelector((state) =>
    selectEmployeeDeskPreferences(state, employeeId)
  );
  const desks = useAppSelector((state) =>
    selectDesksByIds(
      state,
      desksPreferences.map(({ id }) => id)
    )
  );

  if (!employeeId) {
    return null;
  }

  const movePreferenceIndex = (
    preferences: EmployeeDeskPreference[],
    deskId: string
  ) => {
    // const preferences = state.employees[employeeId].deskPreferenceList
    const currentIndex = preferences.findIndex((pref) => pref.id === deskId);
    if (currentIndex <= 0) {
      console.error("cannot increase preference of the most loved desk");
      return;
    }
    const newPreferences = preferences.splice(
      currentIndex - 1,
      0,
      preferences.splice(currentIndex, 1)[0]
    );
    return newPreferences.map((preference, i) => ({ ...preference, index: i }));
  };

  return (
    <div>
      {desksPreferences.map((deskPreference, i) => {
        const desk = desks[deskPreference.id];
        const actionButtons = [
          {
            text: "up",
            onClick: () =>
              dispatch(
                increaseEmployeeDeskPreference({
                  desk: deskPreference,
                  employeeId,
                })
              ),
          },
          {
            text: "remove",
            onClick: () =>
              dispatch(
                removeDeskFromEmployeesPreferences({
                  desk: deskPreference,
                  employeeId,
                })
              ),
          },
        ];

        if (i === 0) {
          actionButtons.shift();
        }

        return <DeskListItem {...desk} actionButtons={actionButtons} />;
      })}
    </div>
  );
};
