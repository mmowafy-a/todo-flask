import axios from "axios";
import React, { useEffect } from "react"
import useToken from "../../Hooks/useToken";
import "./Login.css"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { Toast } from "bootstrap";



const Login = () =>{


    const { setToken, token, removeToken } = useToken();
    const navigate = useNavigate();


    const formHandler = async (e) =>{
        e.preventDefault();
        debugger;
        let email = e.target.email.value;
        let password = e.target.pass.value;
        
        let res = await axios.post("http://localhost:5000/login", {email, password})
        .then(res => {
            setToken(res.data.token);
       
    })
    .catch(err => {
        toast.error("Invalid email or password", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            backgroundColor: "white",
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    })
}


    useEffect(()=>{
        if(token){
            navigate("/");
        }
    },[token])

    return(
   <React.Fragment>

    
    
    <div className="login-container">
    <ToastContainer></ToastContainer>
    <form className="form" onSubmit={(e) => formHandler(e)}>
  <div className="mb-3 w-75 white-bg">
    <h3 className="mb-4 white-bg" style={{textAlign:'center'}}>Log in</h3>
    <input type="email" placeholder="Email" className="form-control" id="email" aria-describedby="emailMessage"/>

  </div>
  <div className="mb-3 d-flex w-75 white-bg">
    <input type="password" placeholder="Password" className="form-control" id="pass"/>
  </div>
 
  <button type="submit" className="btn btn-primary w-25">Login</button>
</form>
</div>
        
        </React.Fragment>
        
    )
}

export default Login