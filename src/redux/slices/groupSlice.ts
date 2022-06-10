import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllGroups } from '../../apis/group';

const defaultState = {
    allGroups: [],
    isLoadingAllGroups: false,
}
const groupSlice = createSlice({
    name: 'group',
    initialState: defaultState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getApiAllGroups.pending, (state, action) => {
                state.isLoadingAllGroups = true;
            })
            .addCase(getApiAllGroups.fulfilled, (state, action) => {
                state.isLoadingAllGroups = false;
                state.allGroups = action.payload.groups;
            })
    }
})

export default groupSlice;

export const getApiAllGroups = createAsyncThunk('group/getApiAllGroups', async () => {
    const result = await getAllGroups({}, {}, {});
    return result;
})

export const allGroupsSelector = (state: any) => state.group.allGroups