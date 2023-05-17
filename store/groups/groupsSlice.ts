import { type Group } from '../../types/Group'
import { createSlice } from '@reduxjs/toolkit'

interface GroupsState {
  groups: Group[]
}
const initialState: GroupsState = {
  groups: []
}

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    handleAddGroups: (state, action) => {
      state.groups = action.payload
    }
  }
})

export const { handleAddGroups } = groupsSlice.actions

export default groupsSlice.reducer
