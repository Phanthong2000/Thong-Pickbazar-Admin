import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllGroups } from "../../apis/group";
import { GroupType } from "../../interfaces";

const defaultState = {
  allGroups: [],
  isLoadingAllGroups: false,
};
const groupSlice = createSlice({
  name: "group",
  initialState: defaultState,
  reducers: {
    setAllGroup: (state, action) => {
      state.allGroups = action.payload;
    },
    addGroup: (state, action) => {
      console.log("add", state.allGroups);
      state.allGroups.push(action.payload as never);
    },
    deleteGroup: (state, action) => {
      const newAllGroups = state.allGroups.filter(
        (group: GroupType) => group.id !== action.payload.id
      );
      state.allGroups = newAllGroups;
    },
    updateGroup: (state, action) => {
      const index = state.allGroups.findIndex(
        (group: any) => group.id === action.payload.id
      );
      const newAllGroups = state.allGroups
        .slice(0, index)
        .concat([action.payload as never])
        .concat(state.allGroups.slice(index + 1, state.allGroups.length));
      state.allGroups = newAllGroups;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getApiAllGroups.pending, (state, action) => {
        state.isLoadingAllGroups = true;
      })
      .addCase(getApiAllGroups.fulfilled, (state, action) => {
        state.isLoadingAllGroups = false;
        state.allGroups = action.payload.groups;
      });
  },
});

export default groupSlice;

export const getApiAllGroups = createAsyncThunk(
  "group/getApiAllGroups",
  async () => {
    const result = await getAllGroups({}, {}, {});
    return result;
  }
);

export const allGroupsSelector = (state: any) => state.group.allGroups;
