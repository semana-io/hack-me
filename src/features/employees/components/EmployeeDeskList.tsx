import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { DeskListItem } from "../../desks/components/DeskListItem";
import { selectDesksByIds } from "../../desks/state/selectors";
import { EmployeeDeskPreference } from "../state/employeesSlice";

export interface EmployeeDeskListProps {
  employeeId: string;
  preferences: EmployeeDeskPreference[];
  onChange?: (preferences: EmployeeDeskPreference[]) => any;
}

// NOTE: NEXT TIME BE AWARE OF HAVING FORMS THAT AUTO SAVES VS THAT REQUIRES SAVING OF THE DRAFT
//       AND IF POSSIBLE JUST DEFAULT TO DRAFT ONE SINCE ITS MORE POWERFULL AND IT SIMPLIFIES THE WHOLE THING

// couple of observations, with current knowlage you only have "save entire object/collection" action in the store and all the logic of manipulating that
// object/collection lies inside the component (form)  and based on quick research around form libraries thats the prefered way

// so TODO: make it accept list from the props and have it either auto save or have callback that will be called with updated list
// that way it will be usable as live list and draft list

// another todo: implement formik or react final form on other forms on the page
// and fix all the code issues resulted in changing state shape
export const EmployeeDeskList: FC<EmployeeDeskListProps> = ({
  employeeId,
  preferences,
  onChange,
}) => {
  // const dispatch = useAppDispatch();

  const [draftPreferences, setDraftPreferences] = useState<
    EmployeeDeskPreference[]
  >([]);

  useEffect(() => {
    setDraftPreferences(preferences);
  }, [preferences]);

  // const desksPreferences = useAppSelector((state) =>
  //   selectEmployeeDeskPreferences(state, employeeId)
  // );
  const desks = useAppSelector((state) =>
    selectDesksByIds(
      state,
      draftPreferences.map(({ id }) => id)
    )
  );

  // if (!employeeId) {
  //   return null;
  // }

  const movePreferenceIndexByOneUp = (
    preferences: EmployeeDeskPreference[],
    deskId: string
  ) => {
    // const preferences = state.employees[employeeId].deskPreferenceList
    const currentIndex = preferences.findIndex((pref) => pref.id === deskId);
    if (currentIndex <= 0) {
      console.error("cannot increase preference of the most loved desk");
      return;
    }
    const newPreferences = preferences.map((p) => p);
    newPreferences.splice(
      currentIndex - 1,
      0,
      newPreferences.splice(currentIndex, 1)[0]
    );

    return newPreferences.map((preference, i) => ({ ...preference, index: i }));
  };

  const removePreferenceFromArray = (
    preferences: EmployeeDeskPreference[],
    deskId: string
  ) => {
    const slimedPreferences = preferences.filter(
      (preference) => preference.id !== deskId
    );
    return slimedPreferences;
  };

  return (
    <div>
      {draftPreferences.map((deskPreference, i) => {
        const desk = desks[deskPreference.id];
        const actionButtons = onChange
          ? [
              {
                text: "up",
                onClick: () => {
                  const newPrefrences = movePreferenceIndexByOneUp(
                    draftPreferences,
                    deskPreference.id
                  )!;
                  setDraftPreferences(newPrefrences);
                  onChange(newPrefrences);
                  // have a state outside of the

                  // dispatch(
                  //   increaseEmployeeDeskPreference({
                  //     desk: deskPreference,
                  //     employeeId,
                  //   })
                  // ),
                },
              },
              {
                text: "remove",
                onClick: () => {
                  setDraftPreferences(
                    removePreferenceFromArray(
                      draftPreferences,
                      deskPreference.id
                    )
                  );
                  onChange(draftPreferences);
                  // dispatch(
                  //   removeDeskFromEmployeesPreferences({
                  //     desk: deskPreference,
                  //     employeeId,
                  //   })
                  // ),
                },
              },
            ]
          : [];

        if (i === 0 && actionButtons.length > 0) {
          actionButtons.shift();
        }

        return (
          <DeskListItem key={desk.id} {...desk} actionButtons={actionButtons} />
        );
      })}
    </div>
  );
};
