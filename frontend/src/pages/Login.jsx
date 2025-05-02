import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utils'
function Login() {
    const[loginInfo,setLoginInfo]=useState({
        email:'',
        password:''
    })
    const handleChange=(e)=>{
        const {name,value} =e.target;
        console.log(name,value);
        const copyLoginInfo={...loginInfo};//cannot change the original state directly,so we will make a copy then assign the value
        copyLoginInfo[name]=value;
        setLoginInfo(copyLoginInfo);

    }
    const navigate=useNavigate();// tool that lets your code say "Go to this page" without the user having to click a <Link>.
    const handleLogin=async(e)=>{
        e.preventDefault();
        const{email,password}=loginInfo;
        if(!email||!password){
            return handleError("email and password are required")
        }
        //When the user clicks the “Sign Up” button, you want to send their information (like name, email, and password) to a server. 
        // The server is running on your computer at http://localhost:8080, and the signup route is /auth/signup.
        try{
            const url="http://localhost:8080/auth/login";// where your user’s signup information will be sent.
            //Send a request to the server at this URL.”
            //await means wait here until the server sends back a response.
            // //fetch() is a built-in function that helps you talk to a server
            const response=await fetch(url,{    
                method:"POST",      //POST is used when you want to send new data, like during signup.
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify(loginInfo)

            });
            const result= await response.json();
            const {success,message,jwtToken,name,error}=result;//This line extracts values from the result object using destructuring.
            if(success){
                handleSuccess(message);
                localStorage.setItem('token',jwtToken);
                localStorage.setItem('loggedInUser',name);
                setTimeout(()=>{
                    navigate('/home')

                },1000)
            }
            else if(error){
                const details=error?.details[0].message;
                handleError(details);

            }
            else if(!success)
            {
                handleError(message);

            }
            console.log(result);
        }catch(err){
            handleError(err);
        }
    }

  return (
    
    <div className='container'>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>{/* page does not reload*/}
           
           <div>
                <label htmlFor='email'>Email</label>
                <input
                  onChange={handleChange}
                type="email"
                name="email"
                placeholder='Enter your email.....'
                value={loginInfo.email}
                />
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <input
                  onChange={handleChange}
                type="password"
                name="password"
                placeholder='Enter your password .....'
                value={loginInfo.password}
                />
            </div>
            <button>Login</button>
            <span>Dont have an account . 
                <Link to="/Signup">signup</Link>
            </span>
        </form>
        <ToastContainer/>
    </div>
  )
}

export default Login
