import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import client from "../../Networks/Client";

import URL from "../../Networks/Endpoints"

const initialState = {

}
export const RegisterUser = createAsyncThunk("LOGIN_REDUCER/Register",
    async (payload, { rejectWithValue }) => {
        try {
                const response = await client.post(URL.REGISTER(),payload);
                const json = await response.json();
                console.log(json,"json");
                
                if (!response.ok) {
                    return rejectWithValue(json);
                } else {
                }
                return json;
        } catch (error) {
            // const response = error.response.data.error.message
            // return response
        }
    })
export const LoginUser = createAsyncThunk("LOGIN_REDUCER/login",
    async (payload, { rejectWithValue }) => {
        try {
           
                const response = await client.post(URL.LOGIN(),payload);
                const json = await response.json();
                console.log(json,"json");
                
                if (!response.ok) {
                    return rejectWithValue(json);
                } else {
                }
                return json;
        } catch (error) {
            // const response = error.response.data.error.message
            // return response
        }
    })



export const loginReducer = createSlice({
    name: "LOGIN_REDUCER",
    initialState,
    reducers: {
        clearLoginData: (state, action) => {

        },
        clearOTPData: (state, action) => {

        },
        clearOtpMessage: (state, action) => {

        },
        clearEmailField: (state, action) => {

        }

    },
    extraReducers: (builder) => {
        builder.addCase(LoginUser.pending, (state, action) => {

        }).addCase(LoginUser.fulfilled, (state, action) => {


        }).addCase(LoginUser.rejected, (state, action) => {
        })
    }
})

export const { clearLoginData, clearOTPData, clearEmailField, clearOtpMessage } = loginReducer.actions;

export default loginReducer.reducer;