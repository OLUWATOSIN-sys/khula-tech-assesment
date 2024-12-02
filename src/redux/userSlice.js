import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: null,
  progress: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUserData: (state, action) => {
      state.userData = action.payload;
    },
    updateProgress: (state, action) => {
      state.progress = action.payload;
    },
  },
});

export const { saveUserData, updateProgress } = userSlice.actions;
export default userSlice.reducer;
