import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllProducts } from "../../apis/product";
import { ProductType } from "../../interfaces";

const defaultState = {
    allProducts: [],
    isLoadingAllProducts: false,
};

const productSlice = createSlice({
    name: "product",
    initialState: defaultState,
    reducers: {
        setAllProducts: (state, action) => {
            state.allProducts = action.payload;
        },
        addProduct: (state, action) => {
            console.log("add", state.allProducts);
            state.allProducts.push(action.payload as never);
        },
        deleteProduct: (state, action) => {
            const newAllProducts = state.allProducts.filter(
                (product: ProductType) => product.id !== action.payload.id
            );
            state.allProducts = newAllProducts;
        },
        updateProduct: (state, action) => {
            const index = state.allProducts.findIndex(
                (group: any) => group.id === action.payload.id
            );
            const newAllProducts = state.allProducts
                .slice(0, index)
                .concat([action.payload as never])
                .concat(state.allProducts.slice(index + 1, state.allProducts.length));
            state.allProducts = newAllProducts;
        },
    },
    extraReducers: (build) => {
        build
            .addCase(getApiAllProducts.pending, (state, action) => {
                state.isLoadingAllProducts = true;
            })
            .addCase(getApiAllProducts.fulfilled, (state, action) => {
                state.isLoadingAllProducts = false;
                state.allProducts = action.payload
            })
    }
});

export default productSlice;

export const getApiAllProducts = createAsyncThunk('product/getApiAllProducts', async () => {
    try {
        const result = await getAllProducts({}, {}, {});
        return result.products;
    } catch (error) {
        console.log(error)
    }
})
export const allProductsSelector = (state: any) => state.product.allProducts