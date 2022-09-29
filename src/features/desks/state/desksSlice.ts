import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Desk } from "../components/DeskListItem";
import { v4 as uuidV4 } from "uuid";
import { RootState } from "../../../app/store";

export interface DesksState {
  desks: Desk[];
}

export const initialDesksState: DesksState = {
  desks: [
    { id: uuidV4(), name: "cuteDesk" },
    { id: uuidV4(), name: "weirdDesk" },
    { id: uuidV4(), name: "niceDesk" },
    { id: uuidV4(), name: "galaxyDesk" },
    { id: uuidV4(), name: "funDesk" },
    { id: uuidV4(), name: "bigDesk" },
    { id: uuidV4(), name: "justDesk" },
  ],
};

export const desksSlice = createSlice({
  name: "desks",
  initialState: initialDesksState,
  reducers: {
    addDesk: (state, action: PayloadAction<Desk>) => {
      state.desks.push(action.payload);
    },
    removeDesk: (state, action: PayloadAction<Desk>) => {
      state.desks = state.desks.filter((desk) => desk.id !== action.payload.id);
    },
    editDesk: (state, action: PayloadAction<Desk>) => {
      state.desks = state.desks.map((desk) =>
        desk.id === action.payload.id ? action.payload : desk
      );
    },
  },
});

export const { addDesk, removeDesk, editDesk } = desksSlice.actions;

export const selectDesks = (state: RootState) => state.desks.desks;

export default desksSlice.reducer;
