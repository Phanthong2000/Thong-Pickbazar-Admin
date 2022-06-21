import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllCoupons,
  getAllOrderStatuses,
  getAllShippings,
  getAllTaxes,
} from "../../apis";
import { getAllProducts } from "../../apis/product";
import {
  CouponType,
  ProductType,
  ShippingType,
  TaxType,
} from "../../interfaces";

const defaultState = {
  allOrders: [],
  isLoadingAllOrders: false,
  cart: localStorage.getItem("cart") || JSON.stringify([]),
  allOrderStatuses: [],
  allCoupons: [],
  allTaxes: [],
  allShippings: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState: defaultState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    addOrderStatus: (state, action) => {
      state.allOrderStatuses.push(action.payload as never);
    },
    updateOrderStatus: (state, action) => {
      const index = state.allOrderStatuses.findIndex(
        (orderStatus: any) => orderStatus.id === action.payload.id
      );
      const newAllOrderStatuses = state.allOrderStatuses
        .slice(0, index)
        .concat([action.payload as never])
        .concat(
          state.allOrderStatuses.slice(index + 1, state.allOrderStatuses.length)
        );
      state.allOrderStatuses = newAllOrderStatuses;
    },
    addCoupon: (state, action) => {
      state.allCoupons.push(action.payload as never);
    },
    deleteCoupon: (state, action) => {
      const newAllCoupons = state.allCoupons.filter(
        (coupon: CouponType) => coupon.id !== action.payload.id
      );
      state.allCoupons = newAllCoupons;
    },
    updateCoupon: (state, action) => {
      const index = state.allCoupons.findIndex(
        (coupon: any) => coupon.id === action.payload.id
      );
      const newAllCoupons = state.allCoupons
        .slice(0, index)
        .concat([action.payload as never])
        .concat(state.allCoupons.slice(index + 1, state.allCoupons.length));
      state.allCoupons = newAllCoupons;
    },
    addTax: (state, action) => {
      state.allTaxes.push(action.payload as never);
    },
    deleteTax: (state, action) => {
      const newAllTaxes = state.allTaxes.filter(
        (tax: TaxType) => tax.id !== action.payload.id
      );
      state.allTaxes = newAllTaxes;
    },
    updateTax: (state, action) => {
      const index = state.allTaxes.findIndex(
        (tax: any) => tax.id === action.payload.id
      );
      const newAllTaxes = state.allTaxes
        .slice(0, index)
        .concat([action.payload as never])
        .concat(state.allTaxes.slice(index + 1, state.allTaxes.length));
      state.allTaxes = newAllTaxes;
    },
    addShipping: (state, action) => {
      state.allShippings.push(action.payload as never);
    },
    deleteShipping: (state, action) => {
      const newAllShippings = state.allShippings.filter(
        (shipping: ShippingType) => shipping.id !== action.payload.id
      );
      state.allShippings = newAllShippings;
    },
    updateShipping: (state, action) => {
      const index = state.allShippings.findIndex(
        (shipping: any) => shipping.id === action.payload.id
      );
      const newAllShippings = state.allShippings
        .slice(0, index)
        .concat([action.payload as never])
        .concat(state.allShippings.slice(index + 1, state.allShippings.length));
      state.allShippings = newAllShippings;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(getApiAllOrderStatuses.fulfilled, (state, action) => {
        state.allOrderStatuses = action.payload;
      })
      .addCase(getApiAllCoupons.fulfilled, (state, action) => {
        state.allCoupons = action.payload;
      })
      .addCase(getApiAllTaxes.fulfilled, (state, action) => {
        state.allTaxes = action.payload;
      })
      .addCase(getApiAllShippings.fulfilled, (status, action) => {
        status.allShippings = action.payload;
      });
  },
});

export default orderSlice;

export const getApiAllOrderStatuses = createAsyncThunk(
  "order/getApiAllOrderStatuses",
  async () => {
    try {
      const result = await getAllOrderStatuses({}, {}, {});
      return result.orderStatuses;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getApiAllCoupons = createAsyncThunk(
  "order/getApiAllCoupons",
  async () => {
    try {
      const result = await getAllCoupons({}, {}, {});
      return result.coupons;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getApiAllTaxes = createAsyncThunk(
  "order/getApiAllTaxes",
  async () => {
    try {
      const result = await getAllTaxes({}, {}, {});
      return result.taxes;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getApiAllShippings = createAsyncThunk(
  "order/getApiAllShipping",
  async () => {
    try {
      const result = await getAllShippings({}, {}, {});
      return result.shippings;
    } catch (error) {
      console.log(error);
    }
  }
);

export const cartSelector = (state: any) => state.order.cart;
export const allOrderStatusesSelector = (state: any) =>
  state.order.allOrderStatuses;
export const allCouponsSelector = (state: any) => state.order.allCoupons;
export const allTaxesSelector = (state: any) => state.order.allTaxes;
export const allShippingsSelector = (state: any) => state.order.allShippings;
