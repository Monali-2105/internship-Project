import React, { useEffect, useState } from 'react'
import '../UserStyles/Form.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeErrors, removeSuccess, updateProfile } from '../features/user/userSlice';

function UpdateProfile() {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [avatar,setAvatar]=useState("");
    const [avatarPreview,setAvatarPreview]=useState("./images/profile.png");
    const {user,error,success,message,loading}=useSelector((state)=>state.user);
    const dispatch=useDispatch();
    const navigate =useNavigate();

    const profileImageUpdate=(e)=>{
         const reader=new FileReader();
            reader.onload=()=>{
                if(reader.readyState===2){
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            }
            reader.onerror=(error)=>{
                toast.error("Error Reading File");
            }
            reader.readAsDataURL(e.target.files[0]);
    }

    const updateSubmit=(e)=>{
        e.preventDefault();
        const myform=new FormData();
        myform.set("name",name);
        myform.set("email",email);
        myform.set("avatar",avatar);
        dispatch(updateProfile(myform));
    }

    useEffect(()=>{
            if(error){
                toast.error(error,{position:'top-center',autoClose:3000});
                dispatch(removeErrors())
            }
        },[dispatch,error])

    useEffect(()=>{
            if(success){
                toast.success(message,{position:'top-center',autoClose:3000});
                dispatch(removeSuccess());
                navigate("/profile");
            }
        },[dispatch,success])

    useEffect(()=>{
        if(user){
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url || './images/profile.png');
        }
    },[user])
  return (
    <>
    {loading?(<Loader/>):(<>
    <Navbar/>

    <div className="container update-container">
        <div className="form-content">
            <form  className="form" encType='multipart/form-data' onSubmit={updateSubmit}>
                <h2>Update Profile</h2>
                <div className="input-group avatar-group">
                    <input type="file"  accept='image/'
                    className='file-input' name='avatar' onChange={profileImageUpdate}/>
                    <img src={avatarPreview} alt="user Profile" className="avatar"/>
                </div>
                <div className="input-group">
                    <input type="text" value={name} name='name' onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div className="input-group">
                    <input type="email" value={email} name='email' onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <button className='authBtn'>Update</button>
            </form>
        </div>

    </div>



    <Footer/>
    
    </>)}
    </>
  )
}

export default UpdateProfile