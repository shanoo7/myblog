import React from 'react';
import { useDispatch } from 'react-redux';
import authservice from '../../appwrite/auth';
import { logout } from '../../store/authSlice';


function LogoutBtn() {

  const dispatch = useDispatch()
  const logoutHandler = ()=>{
    authservice.logout().then(()=>{
      dispatch(logout())
    })
  }
  return (
    <button onClick={logoutHandler}className='btn btn-outline-danger fw-bold border-0 rounded-pill btn-sm mx-1'>Logout</button>
  )
}

export default LogoutBtn;
