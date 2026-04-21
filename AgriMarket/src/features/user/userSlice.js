import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//Register API
export const register=createAsyncThunk("user/register",async(userData,
    {rejectWithValue,dispatch})=>{
        try{
            const config={
                headers:{
                    'Content-Type':'multipart/form-data'

                }
                
            }
            const {data} =await axios.post('/api/register', userData, config);
            return data;
        }catch(error){
            
            return rejectWithValue(error.response?.data || 'Registration failed. Please try again.');
        }

})

//Login API
export const login=createAsyncThunk("user/login",async({email,password},
    {rejectWithValue,dispatch})=>{
        try{
            const config={
                headers:{
                    'Content-Type':'application/json'

                }
                
            }
            const {data} =await axios.post('/api/login', {email,password}, config);
            console.log('login data',data);
            
            return data;
        }catch(error){
            return rejectWithValue(error.response?.data || 'Login failed. Please try again.');
        }

})

//Load User API  
export const loadUser=createAsyncThunk("user/loadUser",async(rejectWithValue)=>{
    try{
        const {data}=await axios.get('/api/profile');
        return data;

    }catch(error){
         return rejectWithValue(error.response?.data || 'Load user failed. Please try again.');

    }
})
//Logout API
export const logout=createAsyncThunk("user/logout",async(rejectWithValue)=>{
    try{
        const {data}=await axios.post('/api/logout',{withCredentials:true});
        return data;

    }catch(error){
         return rejectWithValue(error.response?.data || 'Logout failed. Please try again.');

    }
})

//Update user profile API
export const updateProfile=createAsyncThunk("user/updateProfile",async(userData, {rejectWithValue})=>{
    try{
        const config={
            headers:{
                    'Content-Type':'multipart/form-data'

                }
        }
        const {data}=await axios.put('/api/profile/update', userData, config);
        return data;

    }catch(error){
         return rejectWithValue(error.response?.data || {message:'Profile update failed. Please try again.'});

    }
})

//Update Password API
export const updatePassword=createAsyncThunk("user/updatePassword",async(formData, {rejectWithValue})=>{
    try{
        const config={
            headers:{
                    'Content-Type':'application/json'

                } 
                
        }
        const {data}=await axios.put('/api/password/update', formData, config);
        return data;

    }catch(error){
        console.log(error.response);
         return rejectWithValue(error.response?.data ||'Password update failed. Please try again.');

    }
})

//Forgot Password  API
export const forgotPassword=createAsyncThunk("user/forgotPassword",async(email, {rejectWithValue})=>{
    try{
        const config={
            headers:{
                    'Content-Type':'application/json'

                } 
                
        }
        const {data}=await axios.post('/api/password/forgot', email, config);
        return data;

    }catch(error){
        console.log(error.response);
         return rejectWithValue(error.response?.data ||{message:'Password reset failed. Please try again.'});

    }
})

//Reset Password  API
export const resetPassword=createAsyncThunk("user/resetPassword",async({token, userData}, {rejectWithValue})=>{
    try{
        const config={
            headers:{
                    'Content-Type':'application/json'

                } 
                
        }
        const {data}=await axios.post(`/api/reset/${token}`, userData, config);
        return data;

    }catch(error){
        
         return rejectWithValue(error.response?.data ||{message:'Password reset failed. Please try again.'});

    }
})

const userSlice=createSlice({
    name:"user",
    initialState:{
        user:localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null,

        loading:false,
        error:null,
        success:false,
        isAuthenticated:localStorage.getItem('isAuthenticated')==='true',
        message:null

    },
    reducers:{
        removeErrors:(state)=>{
            state.error=null;
        },
        removeSuccess:(state)=>{
        state.success = false;
        state.message = null;   
        },
            registerRequest:(state)=>{
                state.success=null;
            }

    },
    extraReducers:(builder)=>{
        //Registration cases
        builder.addCase(register.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(register.fulfilled,(state,action)=>{
            state.loading=false;
            state.error=null;
            state.success=action.payload.success;
            state.user=action.payload?.user || null;
            state.isAuthenticated=Boolean(action.payload?.user);

            //store in local storage
            localStorage.setItem('user',JSON.stringify(state.user));
            localStorage.setItem('isAuthenticated',JSON.stringify(state.isAuthenticated));


        })
        .addCase(register.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || 'Registration failed. Please try again.';
            state.user=null;
            state.isAuthenticated=false;
        })

        //Login cases
        builder.addCase(login.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.loading=false;
            state.error=null;
            state.success=action.payload.success;
            state.user=action.payload?.user || null;
            state.isAuthenticated=Boolean(action.payload?.user);
            console.log(state.user);
             //store in local storage
            localStorage.setItem('user',JSON.stringify(state.user));
            localStorage.setItem('isAuthenticated',JSON.stringify(state.isAuthenticated));


            
            
        })
        .addCase(login.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || 'Login failed. Please try again.';
            state.user=null;
            state.isAuthenticated=false;
        })

        //Load User cases
        builder.addCase(loadUser.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(loadUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.error=null;
            state.user=action.payload?.user || null;
            state.isAuthenticated=Boolean(action.payload?.user);
             //store in local storage
            localStorage.setItem('user',JSON.stringify(state.user));
            localStorage.setItem('isAuthenticated',JSON.stringify(state.isAuthenticated));

        })
        .addCase(loadUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || 'Failed to load user data.';
            state.user=null;
            state.isAuthenticated=false;
             if(action.payload?.statusCode===401){
                state.user=null;
                state.isAuthenticated=false
                localStorage.removeItem("user")                
                localStorage.removeItem("isAuthenticated")
            }
        })


        //Logout cases
        builder.addCase(logout.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(logout.fulfilled,(state,action)=>{
            state.loading=false;
            state.error=null;
            state.user=null;
            state.isAuthenticated=false;
            localStorage.removeItem("user")                
            localStorage.removeItem("isAuthenticated")
            
        })
        .addCase(logout.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || 'Logout failed. Please try again.';
        })

        //update user profile cases
        builder.addCase(updateProfile.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(updateProfile.fulfilled,(state,action)=>{
            state.loading=false;
            state.error=null;
            state.user=action.payload?.user || null;
            state.success=action.payload?.success
            state.message=action.payload?.message

            
            
        })
        .addCase(updateProfile.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || 'Profile update failed. Please try again.';
        })

        //update user password cases
        builder.addCase(updatePassword.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(updatePassword.fulfilled,(state,action)=>{
            state.loading=false;
            state.error=null;
            
            state.success=action.payload?.success
            
        })
        .addCase(updatePassword.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.error || action.payload?.message || 'Password update failed.';
        })

        //forgot password cases
        builder.addCase(forgotPassword.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(forgotPassword.fulfilled,(state,action)=>{
            state.loading=false;
            state.error=null;
            state.success=action.payload?.success
            state.message=action.payload?.message

            
        })
        .addCase(forgotPassword.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.error || action.payload?.message || 'email send failed';
        })

        //reset password cases
        builder.addCase(resetPassword.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(resetPassword.fulfilled,(state,action)=>{
            state.loading=false;
            state.error=null;
            state.success=action.payload?.success
            state.user=null;
            state.isAuthenticated=false;
            

            
        })
        .addCase(resetPassword.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || 'Password Reset failed';
        })
    }
})

export const {removeErrors,removeSuccess}=userSlice.actions; 
export default userSlice.reducer;