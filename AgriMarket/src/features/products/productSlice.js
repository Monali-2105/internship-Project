import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//import { removeSuccess } from "../user/userSlice";



export const getProduct = createAsyncThunk('product/getProduct',
    async({keyword,page=1,category},{rejectWithValue})=>{
        try{
            let link='/api/products?page='+page;
            if(category){
                link+=`&category=${encodeURIComponent(category)}`;
            }

            if(keyword){
                link+=`&keyword=${keyword}`;
            }

            //const link=keyword? `/api/products?keyword=${encodeURIComponent(keyword)}`:
            '/api/products';
            const {data}=await axios.get(link);
            console.log('Response',data);
            return data;
            

        }catch(error){
            return rejectWithValue(error.response?.data || 'An error occurred while fetching products')
        }

})

//Product Details
export const getProductDetails = createAsyncThunk('product/getProductDetails',
    async(id,{rejectWithValue})=>{
        try{
            const link=`/api/admin/product/${id}`;
            const {data}=await axios.get(link);
            return data;

        }catch(error){
            return rejectWithValue(error.response?.data || 'An error occurred while fetching products')

        }
        

})

//Submit Review
export const createReview = createAsyncThunk('product/createReview',
    async({rating,comment,productId},{rejectWithValue})=>{
        try{
            const config={
                headers:{
                    'Content-Type':'application/json'
                }
            }

            const {data}=await axios.put('/api/review',{rating,comment,productId},config);
            return data;

        }catch(error){
            return rejectWithValue(error.response?.data || 'An error occurred ')

        }
        

})

const productSlice=createSlice({
    name:'product',
    initialState:{
        products:[],
        productCount:0,
        loading:false,
        error:null,
        product:null,
        //resultsPerPage:4,
        //totalPages:0,
        reviewSuccess:false,
        reviewLoading:false
    },
    reducers:{
        removeErrors:(state)=>{
            state.error=null;
        },
        removeSuccess:(state)=>{
            state.reviewSuccess=false;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getProduct.pending,(state)=>{
            state.loading=true;
            state.error=null;

        })
        .addCase(getProduct.fulfilled,(state,action)=>{
            console.log('Fulfilled action payload',action.payload);
            state.loading=false;
            state.error=null;
            state.products=action.payload.products;
            state.productCount=action.payload.productCount;
            
        })
        .addCase(getProduct.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload || 'Failed to fetch products';
            state.products=[];

        })

        builder.addCase(getProductDetails.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getProductDetails.fulfilled,(state,action)=>{
            console.log('Product Details',action.payload);
            state.loading=false;
            state.error=null;
            state.product=action.payload.product;
            
        })
        .addCase(getProductDetails.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload || 'Failed to fetch product details';

        })

        //createReview
        builder.addCase(createReview.pending,(state)=>{
            state.reviewLoading=true;
            state.error=null;
        })
        .addCase(createReview.fulfilled,(state,action)=>{
            state.reviewLoading=false;
            state.reviewSuccess=true;
            
            
        })
        .addCase(createReview.rejected,(state,action)=>{
            state.reviewLoading=false;
            state.error=action.payload || 'Something went wrong';

        })
    }
})

export const {removeErrors,removeSuccess}=productSlice.actions;
export default productSlice.reducer;