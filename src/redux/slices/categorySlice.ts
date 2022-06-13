import { getAllCategories } from "./../../apis/category";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CategoryType } from "../../interfaces";

const defaultState = {
  allCategories: [],
  isLoadingAllCategories: false,
};

const categorySlice = createSlice({
  name: "category",
  initialState: defaultState,
  reducers: {
    addCategory: (state, action) => {
      console.log("add", action.payload);
      state.allCategories.push(action.payload as never);
    },
    deleteCategory: (state, action) => {
      const newAllCategories = state.allCategories.filter(
        (category: CategoryType) => category.id !== action.payload.id
      );
      state.allCategories = newAllCategories;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(getApiAllCategories.pending, (state, action) => {
        state.isLoadingAllCategories = true;
      })
      .addCase(getApiAllCategories.fulfilled, (state, action) => {
        state.allCategories = action.payload;
      });
  },
});

export default categorySlice;

export const getApiAllCategories = createAsyncThunk(
  "category/getApiAllCategories",
  async () => {
    try {
      const result = await getAllCategories({}, {}, {});
      return result.categories;
    } catch (error) {
      console.log(error);
    }
  }
);

export const allCategoriesSelector = (state: any) =>
  state.category.allCategories;
