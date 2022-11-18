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
    [uuidV4()]: { id: uuidV4(), name: "cuteDesk" },
    [uuidV4()]: { id: uuidV4(), name: "weirdDesk" },
    [uuidV4()]: { id: uuidV4(), name: "niceDesk" },
    [uuidV4()]: { id: uuidV4(), name: "galaxyDesk" },
    [uuidV4()]: { id: uuidV4(), name: "funDesk" },
    [uuidV4()]: { id: uuidV4(), name: "bigDesk" },
    [uuidV4()]: { id: uuidV4(), name: "justDesk" },
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
