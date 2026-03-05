import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Authentication } from "../interfaces/auth";


const initialState: Authentication[] = [];

const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    storeUser(state, action: PayloadAction<Authentication>) {
     const exists = state.some(u => u.publicId === action.payload.publicId);
     if (!exists) state.push(action.payload)  ;
     // se esiste già, non facciamo nulla (evitiamo duplicati)
     // action.type = 'authentication/storeUser' (implicito)
     // action.payload = il publicId che hai passato 
    },
    clearUser(state) {
      return initialState;
    },
  }
})

export const { storeUser, clearUser } = authSlice.actions;
export default authSlice.reducer; // export del reducer, lo importeremo nello store tramite alias authReducer