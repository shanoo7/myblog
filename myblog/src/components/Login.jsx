import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { login as storeLogin } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import {Button, Logo, Input} from './index';
import authservice from '../appwrite/auth';
import {useForm} from 'react-hook-form';


function Login() {
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const login = async (data)=>{
        setError("")
        try {
            const session = await authservice.login(data)
            if(session){
               const userData = await authservice.getCurrentUser()
               if(userData){
                dispatch(storeLogin(userData))
                navigate("/")
               }
            }
        } catch (error) {
            console.log("Error in Login component : ",error.message)
            setError(error.message)
        }
    }
  return (
    <div className='container text-light' style={{maxWidth:"400px"}}>
      <div className='text-center text-secondary fw-bold'>
        <span><Logo width='100%'/></span>
        <h2 className=''>Sign in to your account</h2>
      <p>Don't have an account <Link className='text-decoration-none fw-normal text-se' to={'/signup'}>Sign up</Link></p>
      </div>
      
      {error && <p className='error-message'>{error}</p>}
      <form onSubmit={handleSubmit(login)}>
         <div>
            <Input
            label="Email: "
            type= "email"
            placeholder="Enter your email"
            {...register("email",{
                require:true,
                validate:{
                    matchPatern: (value)=>  /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) || 
                        "Email address must be a valid address"
                    
                }
            })}
            />
            <Input
            label="Password: "
            type="password"
            placeholder="Enter your password"
            {...register("password",{
                require:false,
            })}
            />
            <Button className='btn-outline-secondary w-100' type="submit">sign in</Button>
         </div>
      </form>
    </div>
  )
}

export default Login
