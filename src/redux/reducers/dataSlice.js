import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
 
  dataOfTeams: '',
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData: (state, actions) => {
      state.dataOfTeams = actions.payload
    },
  }
})

export const { setData} =
  dataSlice.actions;
export default dataSlice.reducer;