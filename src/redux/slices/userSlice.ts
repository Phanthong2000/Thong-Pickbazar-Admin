import { getAllUsers } from './../../apis/user';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const defaultState = {
    allUser: [],
    isLoadingAllUser: false,
    count: 0,
    isLogin: window.localStorage.getItem('token') ? true : false,
    user: JSON.parse(`${window.localStorage.getItem('user')}`)
}
const userSlice = createSlice({
    name: 'user',
    initialState: defaultState,
    reducers: {
        plus: (state, action) => {
            console.log('plus' + state.count, action.payload)
            state.count = state.count + 1;
        },
        logout: (state) => {
            state.isLogin = false
            state.user = null;
        },
        login: (state, action) => {
            state.isLogin = true;
            state.user = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getApiAllUser.pending, (state, action) => {
                state.isLoadingAllUser = true;
            })
            .addCase(getApiAllUser.fulfilled, (state, action) => {
                state.isLoadingAllUser = false
            })
    }
})

export default userSlice;

export const getApiAllUser = createAsyncThunk('user/getApiAllUser', async () => {
    const result = await getAllUsers({}, {}, {});
    return result;
})

export const countSelector = (state: any) => state.user.count;
export const allUserSelector = (state: any) => state.user.allUser;
export const isLoadingAllUserSelector = (state: any) => state.user.isLoadingAllUser;
export const isLoginSelector = (state: any) => state.user.isLogin;
export const userSelector = (state: any) => state.user.user;