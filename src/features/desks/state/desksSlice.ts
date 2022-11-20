import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidV4 } from "uuid";
import { RootState } from "../../../app/store";

export interface Desk {
  id: string;
  name: string;
}

export interface DesksState {
  desks: Record<string, Desk>;
}

export const initialDesksState: DesksState = {
  desks: {
    "6924301c-68bf-11ed-989b-eba2f77bdfc0": {
      id: "6924301c-68bf-11ed-989b-eba2f77bdfc0",
      name: "cuteDesk",
    },
    "738e2e72-68bf-11ed-a723-7f3cc90a8082": {
      id: "738e2e72-68bf-11ed-a723-7f3cc90a8082",
      name: "weirdDesk",
    },
    "753b1dfc-68bf-11ed-b8bc-df44f1c0ad46": {
      id: "753b1dfc-68bf-11ed-b8bc-df44f1c0ad46",
      name: "niceDesk",
    },
    "769dcb18-68bf-11ed-9f72-670330a48984": {
      id: "769dcb18-68bf-11ed-9f72-670330a48984",
      name: "galaxyDesk",
    },
    "76f9bb58-68bf-11ed-b2f1-9baedd626b07": {
      id: "76f9bb58-68bf-11ed-b2f1-9baedd626b07",
      name: "funDesk",
    },
    "774d0006-68bf-11ed-8679-678af601fccd": {
      id: "774d0006-68bf-11ed-8679-678af601fccd",
      name: "bigDesk",
    },
    "779c0c0a-68bf-11ed-8782-8f83f45784da": {
      id: "779c0c0a-68bf-11ed-8782-8f83f45784da",
      name: "justDesk",
    },
  },
};

export const desksSlice = createSlice({
  name: "desks",
  initialState: initialDesksState,
  reducers: {
    addOrEditDesk: (state, action: PayloadAction<Desk>) => {
      state.desks[action.payload.id] = action.payload;
    },
    removeDesk: (state, action: PayloadAction<Desk>) => {
      delete state.desks[action.payload.id];
    },
  },
});

export const { addOrEditDesk, removeDesk } = desksSlice.actions;

export default desksSlice.reducer;
