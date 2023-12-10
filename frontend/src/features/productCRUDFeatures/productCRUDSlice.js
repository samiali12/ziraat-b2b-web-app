import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import productsCRUDServices from "./productCRUDServices"
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
}

const middleware = [...getDefaultMiddleware({
    serializableCheck: false, // Disable the ImmutableStateInvariantMiddleware
    // Other middleware options go here if needed
})];

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

export const getProductByCategory = createAsyncThunk("products/category", async (categoryName, thunkApi) => {
    try {
        
        return await productsCRUDServices.getProductByCategory(categoryName)
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

export const getProductById = createAsyncThunk("product/fetch", async (data, thunkApi) => {
    try {

        return await productsCRUDServices.getProductById(data)
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

export const addNewProduct = createAsyncThunk('product/new', async (data, thunkApi) => {
    try {
        return await productsCRUDServices.addNewProduct(data)
    }
    catch (error) {
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
    middleware,
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
            .addCase(getProductByCategory.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProductByCategory.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.products = action.payload
            })
            .addCase(getProductByCategory.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.products = action.payload
            })

            .addCase(getProductById.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.products = action.payload
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.products = action.payload
            })
            .addCase(addNewProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addNewProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.products = action.payload
            })
            .addCase(addNewProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.products = action.payload
            })
    }
})

export default productSlice.reducer;
export const { resetProduct } = productSlice.actions;