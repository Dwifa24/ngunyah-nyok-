import React, { useState, useEffect } from 'react'
import { FaRegEnvelope } from 'react-icons/fa'
import { MdLockOutline } from 'react-icons/md'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';
import Swal from 'sweetalert2'
import logo from "../assets/images/logo.png"
import loginimg from "../assets/images/loginimg.png"
import { FcGoogle } from 'react-icons/fc'
import { AiFillFacebook } from 'react-icons/ai'


const Login = () => {
  const { action, status, data } = useSelector(state => state.userReducer)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    if (localStorage.getItem("access_token")){
      if(localStorage.getItem("type")==="user"){
        Swal.fire("Login Success!", "Welcome!", "success");
        navigate('/user/home');
      }else if(localStorage.getItem("type")==="cms"){
        Swal.fire("Login Success!", "Logged in as Admin", "success");
        navigate('/cms/dashboard');
      }
    } ;
  }, [data]);

  const loginHandler = () => {
    dispatch(login(form));
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="m-7 flex flex-col relative w-1/2">
        <div className="bg-gradient-to-r from-darkblue to-lilac mt-7 shadow-2xl sm:rounded-sm">
          <div className="p-5 text-white">
            <h1 className='text-bold text-xl'>Welcome</h1>
            <p className="sm:mt-48 text-sm">Sudah ngunyah belum hari ini?</p>
            <p className="text-xl">Ngunyah nyok!</p>
          </div>
        </div>
        <div
          className="flex items-center flex-col shadow-xl bg-white sm:rounded-sm sm:absolute sm:right-16 md:right-20 sm:-top-4 sm:w-72">
          <div clasName='relative'>
            <div className='absolute -inset-2 bg-gradient-to-l from-darkblue to-lilac blur'></div>
            <div className='relative flex items-center flex-col bg-white'>
          <div className="logo shadow-xl rounded-full w-1/2 h-1/2 mb-6 mt-6">
            <img src={logo} />
          </div>
          <h2 className="text-darkblue mb-6 text-xl font-bold">Log In</h2>
          <div className='flex flex-col items-center p-4'>
          <label className='relative cursor-pointer'>
            <div className='bg-gray-200 w-64 p-2 flex items-center '><FaRegEnvelope className='text-gray-400 mr-2' />
              <input type='email' name='email' placeholder='Email' className='bg-gray-200 outline-none text-sm flex-1   placeholder-gray-200 placeholder-opacity-0 transition duration-200' onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <span className='text-sm text-gray-400 text-opacity-80 absolute left-6 top-2 px-2 transition duration-200 input-text'>Enter email</span>
            </div>      
            </label>
          </div>
          <div className='flex flex-col items-center'>
          <label className='relative cursor-pointer'>
            <div className='bg-gray-200 w-64 p-2 flex items-center '><MdLockOutline className='text-gray-400 mr-2' />
              <input type='password' name='email' placeholder='Password' className='bg-gray-200 outline-none text-sm flex-1  placeholder-gray-200 placeholder-opacity-0 transition duration-200' onChange={(e) => setForm({ ...form, password: e.target.value })} />
              <span className='text-sm text-gray-400 text-opacity-80 absolute left-6 top-2 px-2 transition duration-200 input-text'>Enter password</span>
            </div>
            </label>
          </div>
          <button
            className="bg-darkblue text-cream hover:bg-lilac hover:text-darkblue rounded-xl mt-6 mb-6 focus:outline-none p-3" onClick={() => loginHandler()}>LOGIN</button>
          <p className="text-darkblue mb-6 text-sm">Belum punya akun?<a href="#" className='text-blue-600 font-semibold hover:text-lilac' onClick={() => navigate("/registerUser")}>Buat akun!</a></p>
        </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Login