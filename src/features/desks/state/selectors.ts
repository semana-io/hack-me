import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { Desk } from "./desksSlice";

export const selectDesks = (state: RootState) => state.desks.desks;
export const selectDesksArray = createSelector(selectDesks, (desks) =>
  Object.values(desks)
);
export const selectDesksByIds = createSelector(
  [selectDesks, (state: RootState, ids: string[]) => ids],
  (desks, ids) => {
    const set: Record<string, Desk> = {};
    ids.forEach((id) => (set[id] = desks[id]));
    return set;
  }
);
