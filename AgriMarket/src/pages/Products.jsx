import React, { useEffect } from 'react'
import '../pageStyles/Products.css';
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import { getProduct, removeErrors } from '../features/products/productSlice';
import Loader from '../components/Loader';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import NoProduct from '../components/NoProducts';


function Products() {
    const navigate=useNavigate();
    const {loading,error,products,productCount}=useSelector((state)=>state.Product);
    const dispatch=useDispatch();
    const location=useLocation();
    const searchParams=new URLSearchParams(location.search);
    const keyword=searchParams.get("keyword");
    const category=searchParams.get("category");
    


    const categories=["Fruits", "Vegetables", "Dairy-Products"]
    
    

     useEffect(()=>{
            dispatch(getProduct({keyword,category}));
        },[dispatch, keyword, category])

    useEffect(()=>{
            if(error){
                toast.error(error.message,{position:'top-center',autoClose:3000});
                dispatch(removeErrors())
            }
        },[dispatch,error])

        const handleCategoryClick=(category)=>{
            const newSearchParams=new URLSearchParams(location.search);
            newSearchParams.set("category",category);
            newSearchParams.delete("page");
            navigate(`?${newSearchParams.toString()}`);
        
        }

  return (
   <> 
    {
    loading?(<Loader/>):(
        <>
    <PageTitle title="All Products"/>
    <Navbar/>

    <div className="products-layout">
        <div className="filter-section">
            <h3 className="filter-heading">CATEGORIES</h3>
            {/* <ul className="category-list">*/}
            <ul>
                {
                    categories.map((category)=>{
                        return(
                            <li key={category} onClick={()=>handleCategoryClick(category)}>{category}</li>
                        )
                    })
                }
            </ul>

        </div>
        <div className="products-section">
            {products.length>0?(
            <div className="products-product-container">
                {products?.map((product) => (
                    <Product product={product} key={product._id} />
                ))}
            </div>):(
                <NoProduct keyword={keyword} />
            )}
        </div>
    </div>


    <Footer/>


     </>
    
    )}

    </>
  )
}

export default Products