import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllProducts } from "../../apis/product";
import { ProductType } from "../../interfaces";

const defaultState = {
    allOrders: [],
    isLoadingAllOrders: false,
    cart: localStorage.getItem('cart') || JSON.stringify([])
};

const orderSlice = createSlice({
    name: "order",
    initialState: defaultState,
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload
        }
    }
});

export default orderSlice;

export const cartSelector = (state: any) => state.order.cart
