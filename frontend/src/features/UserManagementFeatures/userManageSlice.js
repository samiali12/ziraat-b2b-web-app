import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import userServices from "./userServices"

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}


export const updateUserProfile = createAsyncThunk('um/updateUserProfile', async ({ userId, formData }, thunkApi) => {
    try {
        return await userServices.updateUserProfile(userId, formData)
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
export const getUserDetails = createAsyncThunk('um/getUserDetails', async (userId, thunkApi) => {
    try {
        return await userServices.getSpecificUser(userId)
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


export const userManageSlice = createSlice({
    name: 'userManage',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserDetails.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUserDetails.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(getUserDetails.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.user = null
            })
            .addCase(updateUserProfile.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.user = null
            })

    }
})


export default userManageSlice.reducer