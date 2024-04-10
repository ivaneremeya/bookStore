import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  email: string;
  password: string;
}

const initialState: AuthState = {
  email: "",
  password: "",
};
const AuthFormSlace = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<AuthState>) {
      return action.payload;
    },
  },
});

export const { setAuth } = AuthFormSlace.actions;
export default AuthFormSlace.reducer;
