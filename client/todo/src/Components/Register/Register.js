import React from "react"
import "./Register.css"
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Register = () =>{

  const navigate = useNavigate();

  const formHandler = async (e) =>{
    e.preventDefault();
    debugger;
    let email = e.target.email.value;
    let password = e.target.pass.value;
    
    await axios.post("http://localhost:5000/register", {email, password})
    .then(res => {
    
        
        toast.success("Account created, you can now sign in", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,})

        const timeOut = setTimeout(() => {
             navigate("/login");
         }, 2000);
        
         //clearTimeout(timeOut)
})
.catch(err => {
    toast.error("Email already exists", {
        position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,})

      
})
  }
    return(
   <React.Fragment>
    <ToastContainer></ToastContainer>
    <div className="login-container">
    <form className="form" onSubmit={formHandler}>
  <div className="mb-3 w-75 white-bg">
    <h3 className="mb-4 white-bg" style={{textAlign:'center'}}>Create an account</h3>
    <input type="email" placeholder="Email" className="form-control" id="email" aria-describedby="emailMessage"/>

  </div>
  <div className="mb-3 d-flex w-75 white-bg">
    <input type="password" placeholder="Password" className="form-control" id="pass"/>
  </div>
 
  <button type="submit" className="btn btn-primary w-25">Create</button>
</form>
</div>
        </React.Fragment>
    )
}

export default Register