import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Profile {
  name: string;
  email: string;
  username: string;
}

interface AppMainState {
  isLoggedIn: boolean;
  profile: Profile | null;
}

const initialState: AppMainState = {
  isLoggedIn: false,
  profile: null, // Added profile field
};

export const appMainSlice = createSlice({
  name: "AppMain",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setProfile: (state, action: PayloadAction<Profile | null>) => {
      state.profile = action.payload; // Updates the profile field
    },
    appMainSliceReset: () => initialState,
  },
});

export const { setIsLoggedIn, setProfile, appMainSliceReset } =
  appMainSlice.actions;

export default appMainSlice.reducer;
