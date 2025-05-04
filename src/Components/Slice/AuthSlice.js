import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
  email:'',
   otp:'',
   location:'',
   packageId:'',
   finalAmount:''
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setEmail:(state, action)=>{
        state.email = action.payload;
    },
    setOtp:(state,action)=>{
        state.otp=action.payload
    },
    setLocation:(state,action)=>{
      state.location=action.payload
    },
    setPrice:(state,action)=>{
      state.price=action.payload
    },
    setPackageId:(state,action)=>{
      state.packageId=action.payload
    },
    setFinalamount:(state,action)=>{
      state.finalAmount=action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { 
  setEmail,
   setOtp,
   setLocation,
   setPrice,setPackageId,setFinalamount} = counterSlice.actions

export default counterSlice.reducer