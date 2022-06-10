import { configureStore } from "@reduxjs/toolkit";
import groupSlice from "./slices/groupSlice";
import themeSlice from "./slices/themeSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        theme: themeSlice.reducer,
        group: groupSlice.reducer
    }
})
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;