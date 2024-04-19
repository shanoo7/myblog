import React, {useState} from 'react'
import authservice from '../appwrite/auth'
import {Link, useNavigate} from 'react-router-dom'
import {Button, Input, Logo} from './index'
import { login } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import {useForm} from 'react-hook-form'

function Signup() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {register, handleSubmit} = useForm()
    const [error, setError]= useState("")

    const create =async (data)=>{
      setError("")
      try {
        const userData = await authservice.createAcount(data)
        if(userData){
            const userData = await authservice.getCurrentUser()
            if(userData){
                dispatch(login(userData))
                navigate("/")
            }
        }
      } catch (error) {
        setError(error.message)
      }
    }
  return (
    <div className='container-fluid fw-bold container text-light' style={{maxWidth:"400px"}}>
      <div className='text-center text-secondary '>
         <span><Logo width="100%"/></span>
         <h2>Sign up to your account</h2>
      <p>already have an account <Link className='text-decoration-none fw-normal text-se' to={'/login'}>Sign in</Link></p>
      </div>
      

      {error && <p className='error-message'>{error}</p>}

      <form onSubmit={handleSubmit(create)}>
      <div>
      <Input
        label="Name: "
        type="text"
        placeholder="Enter your name"
        {...register("name",{
          require:true,
      } )}
        />
        <Input
        label="Enter: "
        type="email"
        placeholder="Enter your email"
        {...register("email",{
          require : true,
          validate:{
              matchPatern: (value)=>{
                  return /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) || 
                  "Email address must be a valid address"
              }
          }
      })}
        />
        <Input
        label="Password: "
        type="password"
        placeholder="Enter your password"
        {...register("password",{
          require: true,
         
      })}
        />
        <Button className='btn-outline-secondary w-100' type="submit">Create account</Button>
      </div>
      </form>
    </div>
  )
}

export default Signup
