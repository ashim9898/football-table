import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
 scoreUpdate: {}

}

const scoreSlice = createSlice({
  name: 'score',
  initialState,
  reducers: {
    setScore: (state, actions) => {
      state.scoreUpdate = actions.payload
    },
  }
})

export const { setScore} =
scoreSlice.actions;
export default scoreSlice.reducer;