import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utils'
function Signup() {
    const[signupInfo,setSignupInfo]=useState({
        name:'',
        email:'',
        password:''
    })
    const handleChange=(e)=>{
        const {name,value} =e.target;
        console.log(name,value);
        const copySignupInfo={...signupInfo};//cannot change the original state directly,so we will make a copy then assign the value
        copySignupInfo[name]=value;
        setSignupInfo(copySignupInfo);

    }
    const navigate=useNavigate();// tool that lets your code say "Go to this page" without the user having to click a <Link>.
    const handleSignup=async(e)=>{
        e.preventDefault();
        const{name,email,password}=signupInfo;
        if(!name||!email||!password){
            return handleError("name,email and password are required")
        }
        //When the user clicks the “Sign Up” button, you want to send their information (like name, email, and password) to a server. 
        // The server is running on your computer at http://localhost:8080, and the signup route is /auth/signup.
        try{
            const url="http://localhost:8080/auth/signup";// where your user’s signup information will be sent.
            //Send a request to the server at this URL.”
            //await means wait here until the server sends back a response.
            // //fetch() is a built-in function that helps you talk to a server
            const response=await fetch(url,{    
                method:"POST",      //POST is used when you want to send new data, like during signup.
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify(signupInfo)

            });
            const result= await response.json();
            const {success,message,error}=result;
            if(success){
                handleSuccess(message);
                setTimeout(()=>{
                    navigate('/login')

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
        <h1>Signup</h1>
        <form onSubmit={handleSignup}>{/* page does not reload*/}
            <div>
                <label htmlFor='name'>Name</label>
                <input
                onChange={handleChange}
                type="text"
                name="name"
                autoFocus
                placeholder='Enter your name .....'
                value={signupInfo.name}
                />
            </div>
           <div>
                <label htmlFor='email'>Email</label>
                <input
                  onChange={handleChange}
                type="email"
                name="email"
                placeholder='Enter your email.....'
                value={signupInfo.email}
                />
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <input
                  onChange={handleChange}
                type="password"
                name="password"
                placeholder='Enter your password .....'
                value={signupInfo.password}
                />
            </div>
            <button>Signup</button>
            <span>Already have an account?
                <Link to="/login">Login</Link>
            </span>
        </form>
        <ToastContainer/>
    </div>
  )
}

export default Signup
