import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import searchProductsList from "./searchProductServices"

const initialState = {
    products: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
}

export const getSearchProducts =  createAsyncThunk("searchProducts", async (query, thunkApi)  => {
    try {
        
        return await searchProductsList.getSearchProducts(query)
    } catch (error) {
        const message = (
            error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkApi.rejectWithValue(message)
    }
})

export const searchSlice = createSlice({
    name: 'searchProducts',
    initialState,
    reducers: {
        resetProduct: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.products = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSearchProducts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getSearchProducts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.products = action.payload
            })
            .addCase(getSearchProducts.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.products = action.payload
            })
    }
})


export default searchSlice.reducer;
export const { resetProduct } = searchSlice.actions;