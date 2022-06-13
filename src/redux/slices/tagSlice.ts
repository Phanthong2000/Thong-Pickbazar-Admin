import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllTags } from "../../apis/tag";
import { TagType } from "../../interfaces";

const defaultState = {
    allTags: [],
    isLoadingAllTags: false,
};
const tagSlice = createSlice({
    name: "tag",
    initialState: defaultState,
    reducers: {
        setTags: (state, action) => {
            state.allTags = action.payload
        },
        addTag: (state, action) => {
            state.allTags.push(action.payload as never)
        },
        deleteTag: (state, action) => {
            const newAllGroups = state.allTags.filter(
                (tag: TagType) => tag.id !== action.payload.id
            );
            state.allTags = newAllGroups;
        },
        updateTag: (state, action) => {
            const index = state.allTags.findIndex(
                (tag: any) => tag.id === action.payload.id
            );
            const newAllTags = state.allTags
                .slice(0, index)
                .concat([action.payload as never])
                .concat(state.allTags.slice(index + 1, state.allTags.length));
            state.allTags = newAllTags;
        },
    },
    extraReducers: (build) => {
        build
            .addCase(getApiAllTags.pending, (state, action) => {
                state.isLoadingAllTags = true;
            })
            .addCase(getApiAllTags.fulfilled, (state, action) => {
                state.allTags = action.payload;
            })
    }
});

export default tagSlice;

export const getApiAllTags = createAsyncThunk('tag/getApiAllTags', async () => {
    try {
        const result = await getAllTags({}, {}, {});
        return result.tags;
    } catch (error) {
        console.log(error)
    }
});

export const allTagsSelector = (state: any) => state.tag.allTags;