import { AttributeType } from './../../interfaces/index';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllAttributes } from '../../apis/attribute';

const defaultState = {
    allAttributes: [],
    isLoadingAllAttributes: false,
};
const attributeSlice = createSlice({
    name: "attribute",
    initialState: defaultState,
    reducers: {
        setAttributes: (state, action) => {
            state.allAttributes = action.payload
        },
        addAttribute: (state, action) => {
            state.allAttributes.push(action.payload as never)
        },
        deleteAttribute: (state, action) => {
            const newAllAttributes = state.allAttributes.filter(
                (attribute: AttributeType) => attribute.id !== action.payload.id
            );
            state.allAttributes = newAllAttributes;
        },
        updateAttribute: (state, action) => {
            const index = state.allAttributes.findIndex(
                (attribute: any) => attribute.id === action.payload.id
            );
            const newAllAttributes = state.allAttributes
                .slice(0, index)
                .concat([action.payload as never])
                .concat(state.allAttributes.slice(index + 1, state.allAttributes.length));
            state.allAttributes = newAllAttributes;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getApiAllAttributes.pending, (state, action) => {
                state.isLoadingAllAttributes = false
            })
            .addCase(getApiAllAttributes.fulfilled, (state, action) => {
                state.isLoadingAllAttributes = false;
                state.allAttributes = action.payload
            })
    }
});

export const getApiAllAttributes = createAsyncThunk("attribute/getApiAllAttributes", async () => {
    try {
        const result = await getAllAttributes({}, {}, {});
        return result.attributes;
    } catch (error) {
        console.log(error)
    }
})

export default attributeSlice;

export const allAttributesSelector = (state: any) => state.attribute.allAttributes;