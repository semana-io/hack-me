import { useState } from "react";
import { DeskListItem } from "./DeskListItem";
import { DeskForm } from "./DeskForm";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { addOrEditDesk, Desk, removeDesk } from "../state/desksSlice";
import { selectDesksArray } from "../state/selectors";

export const DeskList = () => {
  const desks = useAppSelector(selectDesksArray);
  const dispatch = useAppDispatch();

  const [selectedDesk, setSelectedDesk] = useState<Desk>();

  return (
    <div>
      {desks.map((desk) => (
        <DeskListItem
          key={desk.id}
          {...desk}
          actionButtons={[
            { text: "edit", onClick: () => setSelectedDesk(desk) },
            {
              text: "remove",
              onClick: () => dispatch(removeDesk(desk)),
            },
          ]}
        />
      ))}
      <DeskForm
        formCallback={(desk) => {
          if (selectedDesk) {
            dispatch(addOrEditDesk(desk));
          } else {
            dispatch(addOrEditDesk(desk));
          }
          setSelectedDesk(undefined);
        }}
        desk={selectedDesk}
      />
    </div>
  );
};
