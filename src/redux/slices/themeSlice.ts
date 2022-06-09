import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
    name: "theme",
    initialState: {
        theme: "light"
    },
    reducers: {
        changeTheme: (state, action) => {
            state.theme = action.payload
        }
    }
})

export const themeSelector = (state: any) => state.theme.theme