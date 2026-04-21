import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

//Fetch All Products
export const fetchAdminProducts=createAsyncThunk("admin/fetchAdminProducts",async(_, {rejectWithValue})=>{
    try{
         const {data}=await axios.get('/api/admin/products')

         return data;
    }catch(error){
       
         return rejectWithValue(error.response?.data ||{message:'Error While Fetching the products'});

    }
})

//Create Product
export const createProduct=createAsyncThunk("admin/createProduct",async(productData, {rejectWithValue})=>{
    try{
        const config={
            headers:{
                'Content-Type':'multipart/form-data',
                
            }
        }
         const {data}=await axios.post('/api/admin/product/create',productData,config)

         return data;
    }catch(error){
       
         return rejectWithValue(error.response?.data ||'Product creation Failed');

    }
})

//Update Product
export const updateProduct=createAsyncThunk("admin/updateProduct",async({id,formData}, {rejectWithValue})=>{
    try{
        const config={
            headers:{
                'Content-Type':'multipart/form-data',
                
            }
        }
         const {data}=await axios.put(`/api/admin/product/${id}`,formData,config)

         return data;
    }catch(error){
       
         return rejectWithValue(error.response?.data ||'Product Updation Failed');

    }
})

//Delete Product
export const deleteProduct=createAsyncThunk("admin/deleteProduct",async(productId, {rejectWithValue})=>{
    try{
       
         const {data}=await axios.delete(`/api/admin/product/${productId}`)

         return {productId};
    }catch(error){
       
         return rejectWithValue(error.response?.data ||'Product Updation Failed');

    }
})

//Fetch All Users
export const fetchUsers=createAsyncThunk("admin/fetchUsers",async(_, {rejectWithValue})=>{
    try{
       
         const {data}=await axios.get(`/api/admin/users`)

         return data;
    }catch(error){
       
         return rejectWithValue(error.response?.data ||'Failed to fetch users');

    }
})

//Get single User
export const getSingleUser=createAsyncThunk("admin/getSingleUser",async(id, {rejectWithValue})=>{
    try{
       
         const {data}=await axios.get(`/api/admin/user/${id}`)

         return data;
    }catch(error){
       
         return rejectWithValue(error.response?.data ||'Failed to fetch single user');

    }
})

//Update User Role
export const updateUserRole=createAsyncThunk("admin/updateUserRole",async({userId,role}, {rejectWithValue})=>{
    try{
       
         const {data}=await axios.put(`/api/admin/user/${userId}`,{role})

         return data;
    }catch(error){
       
         return rejectWithValue(error.response?.data ||'Failed to update user role');

    }
})

//Delete User Profile
export const deleteUser=createAsyncThunk("admin/deleteUser",async(userId, {rejectWithValue})=>{
    try{
       
         const {data}=await axios.delete(`/api/admin/user/${userId}`)

         return data;
    }catch(error){
       
         return rejectWithValue(error.response?.data ||'Failed to Delete user ');

    }
})

//Fetch All orders
export const fetchAllOrders=createAsyncThunk("admin/fetchAllOrders",async(_, {rejectWithValue})=>{
    try{
       
         const {data}=await axios.get(`/api/admin/orders`)

         return data;
    }catch(error){
       
         return rejectWithValue(error.response?.data ||'Failed to Fetch Orders ');

    }
})

//Fetch All Reviews
export const fetchProductReviews=createAsyncThunk("admin/fetchProductReviews",async(productId, {rejectWithValue})=>{
    try{
       
         const {data}=await axios.get(`/api/admin/reviews?id=${productId}`)

         return data;
    }catch(error){
       
         return rejectWithValue(error.response?.data ||'Failed to Fetch Orders ');

    }
})

//Delete Review
export const deleteReview=createAsyncThunk("admin/deleteReview",async({productId,reviewId}, {rejectWithValue})=>{
    try{
       
         const {data}=await axios.delete(`/api/admin/reviews?productId=${productId}&id=${reviewId}`)

         return data;
    }catch(error){
       
         return rejectWithValue(error.response?.data ||'Failed to Delete product review ');

    }
})




const adminSlice = createSlice({
    name:'admin',
    initialState:{
        products:[],
        success:false,
        loading:false,
        error:null,
        product:{},
        deleting:{},
        users:[],
        user:{},
        message:null,
        orders:[],
        totalAmount:0,
        reviews:[]

    },
    reducers:{
        removeErrors:(state)=>{
            state.error=null;
        },
        removeSuccess:(state)=>{
        state.success = false;
           
        },
        clearMessage:(state)=>{
        state.message = null;
        }
    },
    extraReducers:(builder)=>{
        //Fetch All Products
        builder
        .addCase(fetchAdminProducts.pending,(state)=>{
            state.loading=true;
            state.error=null
        })

        .addCase(fetchAdminProducts.fulfilled,(state,action)=>{
            state.loading=false;
            state.products=action.payload.products

        })

        .addCase(fetchAdminProducts.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || "Error While Fetching the products"
        })

        //Create Product
        builder
        .addCase(createProduct.pending,(state)=>{
            state.loading=true;
            state.error=null
        })

        .addCase(createProduct.fulfilled,(state,action)=>{
            state.loading=false;
            state.success=action.payload.success
            state.products.push(action.payload.product)
            console.log(state.products);
            


        })

        .addCase(createProduct.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || "Product Deletion Failed"
        })

        //Update Product
        builder
        .addCase(updateProduct.pending,(state)=>{
            state.loading=true;
            state.error=null
        })

        .addCase(updateProduct.fulfilled,(state,action)=>{
            state.loading=false;
            state.success=action.payload.success
            state.products=action.payload.product  
        })

        .addCase(updateProduct.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || "Product Update Failed"
        })

        //Delete Product
        builder
        .addCase(deleteProduct.pending,(state,action)=>{
            const productId=action.meta.arg;
            state.deleting[productId]=true;
            state.error=null
        })

        .addCase(deleteProduct.fulfilled,(state,action)=>{
            const productId=action.payload.productId;
            state.deleting[productId]=false;
            state.products=state.products.filter(product=>product._id!==productId) 
        })

        .addCase(deleteProduct.rejected,(state,action)=>{
            const productId=action.meta.arg;
            state.deleting[productId]=false;
            state.error=action.payload?.message || "Product Deletion Failed"
        })

        //Fetch Users
        builder
        .addCase(fetchUsers.pending,(state)=>{
            state.loading=true;
            state.error=null
        })

        .addCase(fetchUsers.fulfilled,(state,action)=>{
            state.loading=false;
            state.users=action.payload.users
             
        })

        .addCase(fetchUsers.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || "Failed to fetch users"
        })

        //Grt Single User
        builder
        .addCase(getSingleUser.pending,(state)=>{
            state.loading=true;
            state.error=null
        })

        .addCase(getSingleUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=action.payload.user
             
        })

        .addCase(getSingleUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || "Failed to fetch single user"
        })

        //Update User Role
        builder
        .addCase(updateUserRole.pending,(state)=>{
            state.loading=true;
            state.error=null
        })

        .addCase(updateUserRole.fulfilled,(state,action)=>{
            state.loading=false;
            state.success=action.payload.success
             
        })

        .addCase(updateUserRole.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || "Failed to update user role"
        })

         //Delete User
        builder
        .addCase(deleteUser.pending,(state)=>{
            state.loading=true;
            state.error=null
        })

        .addCase(deleteUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.message=action.payload.message
             
        })

        .addCase(deleteUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || "Failed to Delete user"
        })

        //Fetch All Orders
        builder
        .addCase(fetchAllOrders.pending,(state)=>{
            state.loading=true;
            state.error=null
        })

        .addCase(fetchAllOrders.fulfilled,(state,action)=>{
            state.loading=false;
            state.orders=action.payload.orders
            state.totalAmount=action.payload.totalAmount

             
        })

        .addCase(fetchAllOrders.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || "Failed to Fetch Orders"
        })

        //Fetch Product Reviews
        builder
        .addCase(fetchProductReviews.pending,(state)=>{
            state.loading=true;
            state.error=null
        })

        .addCase(fetchProductReviews.fulfilled,(state,action)=>{
            state.loading=false;
            state.reviews=action.payload.reviews
            

             
        })

        .addCase(fetchProductReviews.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || "Failed to Fetch Product Reviews"
        })

        //Delete product Review
        builder
        .addCase(deleteReview.pending,(state)=>{
            state.loading=true;
            state.error=null
        })

        .addCase(deleteReview.fulfilled,(state,action)=>{
            state.loading=false;
            state.success=action.payload.success
            state.message=action.payload.message           
        })

        .addCase(deleteReview.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || "Failed to Delete product Review"
        })
    }
})

export const {removeErrors,removeSuccess,clearMessage}=adminSlice.actions
export default adminSlice.reducer