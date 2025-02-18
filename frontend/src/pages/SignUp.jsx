import React, { useState } from 'react';
import logo from "../images/logo.png";
import image from "../images/auth_page_side.jpg";
import { Link, useNavigate } from 'react-router-dom';
import { api_base_url } from '../helper';

const SignUp = () => {
    const [username,setUsername] = useState("");
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [pwd,setPwd ] = useState("");

    const [error,setError] = useState("");
    const navigate = useNavigate();
    
    const submitForm = (e) => {
        e.preventDefault();
        fetch(api_base_url + "/signUp",{
          mode: "cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: username,
            name: name,
            email: email,
            password: pwd
          })
        }).then((res)=>res.json()).then((data)=>{
          if(data.success === true){
            alert("Account created successfully");
            navigate("/login"); 
          }
          else{
            setError(data.message);
          }
        })
      }
    

  return (
    <>
      <div className="conatainer w-screen min-h-screen flex items-center justify-between px-[100px]">
        <div className="left w-[40%]">
            <img  className="w-[200px]" src={logo} alt="alt" />
            <form onSubmit={submitForm} className='w-full mt-[60px]' action="">
            <div className="inputBox">
              <input required onChange={(e)=>{setUsername(e.target.value)}} value={username} type="text" placeholder='Username'/>
            </div>

            <div className="inputBox">
              <input required onChange={(e)=>{setName(e.target.value)}} value={name} type="text" placeholder='Name'/>
            </div>

            <div className="inputBox">
              <input required onChange={(e)=>{setEmail(e.target.value)}} value={email} type="email" placeholder='Email'/>
            </div>

            <div className="inputBox">
              <input required onChange={(e)=>{setPwd(e.target.value)}} value={pwd} type="password" placeholder='Password'/>
            </div>

            <p className='text-[gray]'>Already have an account <Link to="/login" className='text-[#00AEEF]'>login</Link></p>

            <p className='text-red-500 text-[14px] my-2'>{error}</p>

            <button className="btnBlue w-full mt-[20px]">Sign Up</button>
          </form>
        </div>
        <div className="right w-[55%]">
            <img className='h-[100vh] w-[100%] object-cover' src={image} alt="" />
        </div>
      </div>
    </>
  )
}

export default SignUp
