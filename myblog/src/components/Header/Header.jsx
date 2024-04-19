import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Logo,LogoutBtn} from '../index'
import { useSelector } from 'react-redux'

function Header() {
  const authStatus = useSelector((state)=> state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      path: '/',
      active: true
    },
    {
      name: 'Login',
      path: '/login',
      active: !authStatus,
    },
    {
      name: 'Signup',
      path: '/signup',
      active: !authStatus,
    },
    {
      name: 'All Posts',
      path: '/all-posts',
      active: authStatus,
    },
    {
      name: 'Add Post',
      path: '/add-post',
      active: authStatus,
    }
  ]
  return (
    <nav class="navbar navbar-expand-sm bg-black">
  <div class="container-fluid  ">
  <Link to={'/'} className='navbar-brand'> <Logo /> </Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse nav-css" id="navbarText">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item m-3 d-sm-flex">
        {navItems.map((item)=>
            item.active ? (
              <li key={item.name}>
                <button className=' fw-bold btn btn-outline-info border-0 rounded-pill btn-sm mx-1 text-bold' 
                onClick={()=>navigate(item.path)}>{item.name}</button>
              </li>
            ):null
            )}
            {authStatus && (
              <li ><LogoutBtn/></li>
            )}
        </li>
        
      </ul>
     
    </div>
  </div>
</nav>

  )
}

export default Header;
