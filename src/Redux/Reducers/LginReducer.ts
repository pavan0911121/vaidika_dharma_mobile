import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

// import {  deviceinfoURL} from "../../networks/EndPoints";

const initialState = {
  
}

export const LoginUser = createAsyncThunk("LOGIN_REDUCER/LoginUser",
    async(payload,{ rejectWithValue})=>{
    try{
        console.log("helloworld");
        
    //     const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    //   .then(response => response.json())
    //   .then(json => {
    //     const resp = json.json()
    //     return resp;
    //   })
    //   const json = await response.json()
    //     const userToken = await AsyncStorage.getItem("token");
    //    const response = await axios.post(deviceinfoURL(),payload, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Authorization: userToken
    //         }
    //     });
    //     const json = response;
    //     if (!response.data) {
    //         return rejectWithValue(json);
    //     }
    }catch(error){
        // const response = error.response.data.error.message
        // return response
    }
})



export const loginReducer = createSlice({
    name: "LOGIN_REDUCER",
    initialState,
    reducers: {
        clearLoginData : ( state ,action) => {
          
        },
        clearOTPData:(state,action) =>{
           
        },
        clearOtpMessage:(state,action) => {
          
        },
        clearEmailField:(state,action) =>{
           
        }

    },
    extraReducers: (builder) => {
        builder.addCase(LoginUser.pending, (state, action) => {

        }).addCase(LoginUser.fulfilled, (state, action) => {

        }).addCase(LoginUser.rejected, (state, action) => {
        })
    }
})

export const { clearLoginData,clearOTPData,clearEmailField,clearOtpMessage } = loginReducer.actions;

export default loginReducer.reducer;