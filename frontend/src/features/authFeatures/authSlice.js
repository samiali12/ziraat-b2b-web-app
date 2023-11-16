import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import authServices from "./authServices"



const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}



export const userRegister = createAsyncThunk('auth/register', async (user, thunkApi) => {

    try {
        return await authServices.register(user)
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

// Login user
export const userLogin = createAsyncThunk('auth/login', async (user, thunkApi) => {

    try {
        return await authServices.login(user)
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


export const logoutUser = createAsyncThunk('auth/logout', async (thunkApi) => {
    try{
        await authServices.logout()
    }
    catch(error){
        const message = (
            error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()

        return thunkApi.rejectWithValue(message)
    }
    

})


export const passwordResetUrl = createAsyncThunk('auth/passwordResetUrl', async (email, thunkApi) => {
    try {
        await authServices.passwordResetUrl(email)
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


export const resetUserPassword = createAsyncThunk('auth/passwordreset', async (data, thunkApi) => {


    try {
        await authServices.resetPassword(data)
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

export const updatePassword = createAsyncThunk('auth/updatePassword', async(userData, thunkApi) => {


    try{
        await authServices.updatePassword(userData)
    }catch(error){
        const message = (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString()

        return thunkApi.rejectWithValue(message)
    }
})

export const sendEmailVerification = createAsyncThunk('auth/email', async (data, thunkApi) => {

    try {
        await authServices.sendEmailVerification(data)
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


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        resetUser: (state) => {
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userRegister.pending, (state) => {
                state.isLoading = true
            })
            .addCase(userRegister.fulfilled, (state, action) => {
                state.isError = false
                state.isSuccess = true
                state.isLoading = false
                state.user = action.payload
            })
            .addCase(userRegister.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.isLoading = false
                state.message = action.payload
                state.user = null
            })

            .addCase(userLogin.pending, (state) => {
                state.isLoading = true
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.isError = false
                state.isSuccess = true
                state.isLoading = false
                state.user = action.payload
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.isLoading = false
                state.message = action.payload
                state.user = null
            })
            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.isError = false
                state.isSuccess = true
                state.isLoading = false
                state.user = action.payload
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.isLoading = false
                state.message = action.payload
                state.user = null
            })

            .addCase(passwordResetUrl.pending, (state) => {
                state.isLoading = true
            })
            .addCase(passwordResetUrl.fulfilled, (state, action) => {
                state.isError = false
                state.isSuccess = true
                state.isLoading = false
                state.user = action.payload
            })
            .addCase(passwordResetUrl.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.isLoading = false
                state.message = action.payload
                state.user = null
            })

            .addCase(resetUserPassword.pending, (state) => {
                state.isLoading = true
            })
            .addCase(resetUserPassword.fulfilled, (state, action) => {
                state.isError = false
                state.isSuccess = true
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(resetUserPassword.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.isLoading = false
                state.message = action.payload
                state.user = null
            })

            .addCase(updatePassword.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updatePassword.fulfilled, (state, action) => {
                state.isError = false
                state.isSuccess = true
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.isLoading = false
                state.message = action.payload
                state.user = null
            })

            .addCase(sendEmailVerification.pending, (state) => {
                state.isLoading = true
            })
            .addCase(sendEmailVerification.fulfilled, (state, action) => {
                state.isError = false
                state.isSuccess = true
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(sendEmailVerification.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.isLoading = false
                state.message = action.payload
                state.user = null
            })

    }
})


export default authSlice.reducer;
export const { resetUser } = authSlice.actions