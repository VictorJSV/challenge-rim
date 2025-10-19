import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type UserState = {
  docNumber: string | null
  cell: string | null
  name: string | null
  lastName: string | null
  birthDay: string | null
}

const initialState: UserState = {
  docNumber: null,
  cell: null,
  name: null,
  lastName: null,
  birthDay: null
}

const userSlice = createSlice({
  name: 'quote',
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<{
      docNumber: string;
      cell: string;
      name: string;
      lastName: string;
      birthDay: string;
    }>) {
      state.docNumber = action.payload.docNumber
      state.cell = action.payload.cell
      state.name = action.payload.name
      state.lastName = action.payload.lastName
      state.birthDay = action.payload.birthDay
    },
    clearUser(state) {
      state.docNumber = null
      state.cell = null
      state.name = null
      state.lastName = null
      state.birthDay = null
    }
  }
})

export const { setUserData, clearUser } = userSlice.actions
export default userSlice.reducer
