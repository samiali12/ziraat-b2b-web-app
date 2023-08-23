import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import productsCRUDServices from "./productCRUDServices"

const initialState = {
    products: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
}

export const getAllProducts = createAsyncThunk("products/fetch", async (thunkApi) => {
    try {
        
        return await productsCRUDServices.getAllProducts()
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

export const productSlice = createSlice({
    name: 'products',
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

            .addCase(getAllProducts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.products = action.payload
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.products = action.payload
            })
    }
})

export default productSlice.reducer;
export const { resetProduct } = productSlice.actions;