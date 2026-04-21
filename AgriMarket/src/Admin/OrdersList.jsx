import React, { useEffect } from 'react';
import '../AdminStyles/OrdersList.css';
import Navbar from '../components/Navbar';
import PageTitle from '../components/PageTitle';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrders, removeErrors } from '../features/admin/adminSlice';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';


function OrdersList() {
    const {orders,loading,error}=useSelector(state=>state.admin);
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(fetchAllOrders())
        console.log(orders);
        
    },[dispatch])

    useEffect(()=>{
            if(error){
                toast.error(error.message,{position:'top-center',autoClose:3000});
                dispatch(removeErrors())
            }
        },[dispatch,error])

    if(orders && orders.length===0){
        return(
            <div className="no-orders-container">
                <p>No Orders Found</p>
            </div>
        )
    }

    
  return (
    <>
    {loading?(<Loader/>):(<>
    <Navbar/>
    <PageTitle title='All Orders'/>

    <div className="ordersList-container">
        <h1 className="ordersList-title">All Orders</h1>
        <div className="ordersList-table-container">
            <table className="ordersList-table">
                <thead>
                    <tr>
                        <th>Sr No</th>
                        <th>Order Id</th>
                        <th>Status</th>
                        <th>Total Price</th>
                        <th>Number Of Items</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders && orders.map((order,index)=>(
                        <tr key={order._id}>
                        <td>{index+1}</td>
                        <td>{order._id}</td>
                        <td className={`order-status ${order.orderStatus.toLowerCase()}`}>{order.orderStatus}</td>
                        <td>{order.totalPrice.toFixed(2)}/-</td>
                        <td>{order.orderItems.length}</td>
                        <td>
                            <Link to={`/admin/order/${order._id}`}
                            className='action-icon edit-icon'><Edit/></Link>
                            <button className="action-btn delete-icon"><Delete/></button>
                        </td>
                    </tr>

                    ))}
                </tbody>
            </table>
        </div>
    </div>


    <Footer/>
    </>)}
    </>
  )
}

export default OrdersList