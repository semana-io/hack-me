import { useState } from "react";
import { Desk, DeskListItem } from "./DeskListItem";
import { DeskForm } from "./DeskForm";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  addDesk,
  editDesk,
  removeDesk,
  selectDesks,
} from "../state/desksSlice";

export const DeskList = () => {
  const desks = useAppSelector(selectDesks);
  const dispatch = useAppDispatch();

  const [selectedDesk, setSelectedDesk] = useState<Desk>();

  return (
    <div>
      {desks.map((desk) => (
        <div>
          <DeskListItem
            {...desk}
            actionButtons={[
              { text: "edit", onClick: () => setSelectedDesk(desk) },
              {
                text: "remove",
                onClick: () => dispatch(removeDesk(desk)),
              },
            ]}
          />
        </div>
      ))}
      <DeskForm
        formCallback={(desk) => {
          if (selectedDesk) {
            dispatch(editDesk(desk));
          } else {
            dispatch(addDesk(desk));
          }
          setSelectedDesk(undefined);
        }}
        desk={selectedDesk}
      />
    </div>
  );
};
