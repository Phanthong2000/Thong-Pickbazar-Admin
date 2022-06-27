import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSetting } from "../../apis/setting";
import { SettingType } from "../../interfaces";

const defaultState = {
  setting: null as SettingType | any,
  isLoadingSetting: true,
};
const settingSlice = createSlice({
  name: "setting",
  initialState: defaultState,
  reducers: {
    setSetting: (state, action) => {
      state.setting = action.payload;
    },
  },
  extraReducers: (build) =>
    build.addCase(getApiSetting.fulfilled, (state, action) => {
      state.isLoadingSetting = false;
      state.setting = action.payload;
    }),
});

export default settingSlice;

export const getApiSetting = createAsyncThunk(
  "setting/getApiSetting",
  async () => {
    try {
      const result = await getSetting({}, {}, {});
      return result;
    } catch (error) {
      console.log(error);
    }
  }
);

export const settingSelector = (state: any) => state.setting.setting;
export const isLoadingSettingSelector = (state: any) =>
  state.setting.isLoadingSetting;
