import { getAllUsers } from "./../../apis/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const defaultState = {
  allUser: [],
  isLoadingAllUser: false,
  isLogin: window.sessionStorage.getItem("isLogin") ? true : false,
  user: JSON.parse(`${window.sessionStorage.getItem("user")}`),
};
const userSlice = createSlice({
  name: "user",
  initialState: defaultState,
  reducers: {
    logout: (state) => {
      state.isLogin = false;
      state.user = null;
    },
    login: (state, action) => {
      state.isLogin = true;
      state.user = action.payload;
    },
    setAllUsers: (state, action) => {
      state.allUser = action.payload;
    },
    addUser: (state, action) => {
      state.allUser.push(action.payload as never);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getApiAllUser.pending, (state, action) => {
        state.isLoadingAllUser = true;
      })
      .addCase(getApiAllUser.fulfilled, (state, action) => {
        state.isLoadingAllUser = false;
        state.allUser = action.payload;
      });
  },
});

export default userSlice;

export const getApiAllUser = createAsyncThunk(
  "user/getApiAllUser",
  async () => {
    try {
      const result = await getAllUsers({}, {}, {});
      return result.users;
    } catch (error) {
      console.log(error);
    }
  }
);

export const allUserSelector = (state: any) => state.user.allUser;
export const isLoadingAllUserSelector = (state: any) =>
  state.user.isLoadingAllUser;
export const isLoginSelector = (state: any) => state.user.isLogin;
export const userSelector = (state: any) => state.user.user;
