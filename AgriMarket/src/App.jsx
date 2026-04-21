
import React, { useEffect } from "react"
import Home from "./pages/Home";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";
import Register from "./User/Register";
import  Login  from "./User/Login";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./features/user/userSlice";
import UserDashboard from "./User/UserDashboard";
import Profile from "./User/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import UpdateProfile from "./User/UpdateProfile";
import UpdatePassword from "./User/UpdatePassword";
import ForgotPassword from "./User/ForgotPassword";
import ResetPassword from "./User/ResetPassword";
import Cart from "./Cart/Cart";
import Shipping from "./Cart/Shipping";
import OrderConfirm from "./Cart/OrderConfirm";
import Payment from "./Cart/Payment";
import Dashboard from "./Admin/Dashboard";
import ProductList from "./Admin/ProductList";
import CreateProduct from "./Admin/CreateProduct";
import UpdateProduct from "./Admin/UpdateProduct";
import UsersList from "./Admin/UsersList";
import UpdateRole from "./Admin/UpdateRole";
import OrdersList from "./Admin/OrdersList";
import ReviewsList from "./Admin/ReviewsList";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";



function App() {
  const {isAuthenticated,user}=useSelector((state)=>state.user);
  const dispatch=useDispatch();
  useEffect(()=>{
    if(isAuthenticated){
      dispatch(loadUser());
    }
  },[dispatch]);
  console.log(isAuthenticated,user);
  
  return (
    <div>
   <Router>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/product/:id" element={<ProductDetails/>}/>
      <Route path="/products" element={<Products/>}/>
      <Route path="/products/:keyword" element={<Products/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/about-us" element={<About/>}/>
      <Route path="/contact-us" element={<ContactUs/>}/>



      <Route path="/profile" element ={<ProtectedRoute element={<Profile/>} />}/>
      <Route path="/profile/update" element ={<ProtectedRoute element={<UpdateProfile/>} />}/>
      <Route path="/password/update" element ={<ProtectedRoute element={<UpdatePassword/>} />}/>
      <Route path="/password/forgot" element={<ForgotPassword/>}/>
      <Route path="/reset/:token" element={<ResetPassword/>}/>
      <Route path="/cart" element={<ProtectedRoute element={<Cart/>}/>}/>
      <Route path="/password/update" element ={<ProtectedRoute element={<UpdatePassword/>} />}/>
      <Route path="/shipping" element ={<ProtectedRoute element={<Shipping/>} />}/>
      <Route path="/order/confirm" element ={<ProtectedRoute element={<OrderConfirm/>} />}/>
      <Route path="/process/payment" element ={<ProtectedRoute element={<Payment/>} />}/>

      {/* Admin Routes */}

      <Route path="/admin/dashboard" element ={<ProtectedRoute element={<Dashboard/>} adminOnly={true} />}/>
      <Route path="/admin/products" element ={<ProtectedRoute element={<ProductList/>} adminOnly={true} />}/>
      <Route path="/admin/product/create" element ={<ProtectedRoute element={<CreateProduct/>} adminOnly={true} />}/>
      <Route path="/admin/product/:updateId" element ={<ProtectedRoute element={<UpdateProduct/>} adminOnly={true} />}/>
      <Route path="/admin/users" element ={<ProtectedRoute element={<UsersList/>} adminOnly={true} />}/>
      <Route path="/admin/user/:userId" element ={<ProtectedRoute element={<UpdateRole/>} adminOnly={true} />}/>
      <Route path="/admin/orders" element ={<ProtectedRoute element={<OrdersList/>} adminOnly={true} />}/>
      <Route path="/admin/reviews" element ={<ProtectedRoute element={<ReviewsList/>} adminOnly={true} />}/>










    </Routes>
    {isAuthenticated && <UserDashboard user={user}/>}
   </Router>

      

    
   </div>
  )
}

export default App
