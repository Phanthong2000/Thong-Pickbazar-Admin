import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllOrderStatuses } from "../../apis";
import { getAllProducts } from "../../apis/product";
import { ProductType } from "../../interfaces";

const defaultState = {
    allOrders: [],
    isLoadingAllOrders: false,
    cart: localStorage.getItem('cart') || JSON.stringify([]),
    allOrderStatuses: []
};

const orderSlice = createSlice({
    name: "order",
    initialState: defaultState,
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload
        },
        addOrderStatus: (state, action) => {
            state.allOrderStatuses.push(action.payload as never)
        },
        updateOrderStatus: (state, action) => {
            const index = state.allOrderStatuses.findIndex(
                (orderStatus: any) => orderStatus.id === action.payload.id
            );
            const newAllOrderStatuses = state.allOrderStatuses
                .slice(0, index)
                .concat([action.payload as never])
                .concat(state.allOrderStatuses.slice(index + 1, state.allOrderStatuses.length));
            state.allOrderStatuses = newAllOrderStatuses;
        },
    },
    extraReducers: (build) => {
        build
            .addCase(getApiAllOrderStatuses.fulfilled, (state, action) => {
                state.allOrderStatuses = action.payload
            })
    }
});

export default orderSlice;

export const getApiAllOrderStatuses = createAsyncThunk('order/getApiAllOrderStatuses', async () => {
    try {
        const result = await getAllOrderStatuses({}, {}, {});
        return result.orderStatuses;
    } catch (error) {
        console.log(error)
    }
})

export const cartSelector = (state: any) => state.order.cart;
export const allOrderStatusesSelector = (state: any) => state.order.allOrderStatuses
