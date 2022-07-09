
import axios from "axios";
import React, { useEffect, useState } from "react";
import ToDoForm from "./ToDoForm";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Todo = () =>{

    const [todosPost, setTodosPost] = useState(null);
    const [todosList,setToDosList] = useState([]);
    const [actionsStyle,setActionsStyle] = useState(null);
    const navigate = useNavigate();

    /**
     * Check if user has token, if not, redirect to login page
     */
    useEffect(()=>{
        if(!localStorage.getItem("jwt")){
            navigate("/login");
        }
    },[])


    const setToDoForm = (data) =>{
        
        setTodosPost({"title": data.title, "description": data.description});
    }

    useEffect(()=>{
        if(todosPost){
            sendData();

        }
       
    },[todosPost])

    /**
     * Action buttons for todo, can be edit and delete
     * @returns 
     */
    const actions = (id) => {
        return(
            <div className="d-flex py-2 justify-content-center">
            <button className="btn btn-primary ps-2" id={id} onClick={editHandler}>Edit</button>
            <button className="btn btn-danger ms-2" id={id} onClick={deleteHandler}>Delete</button>
            </div>
        )
    
    }

    const deleteHandler = async (e) =>{
        debugger;
        await axios({
            method: "DELETE",
            url:`http://localhost:5000/todo/${e.target.id}`,
            headers:{
                Authorization: "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => {
            toast.error("To do deleted", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                backgroundColor: "white",
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            getToDos()
        }
        )
    }

    const editHandler = () =>{

    }
       
    const sendData = async () =>{
        debugger;
        await axios({
            url: "http://localhost:5000/create",
            method: "POST",
            data: todosPost,
            headers:{
                Authorization: "Bearer " + localStorage.getItem("jwt")
            }

        }).then(res => {
            toast.success("To do added", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,})
                getToDos()
        });
        setTodosPost(null);
    }


    const getToDos = async () =>{
        await axios({
            url: "http://localhost:5000/todo",
            method: "GET",
            headers:{
                Authorization: "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res =>{
            debugger;
            setToDosList(res.data);
        });
    }
    

    useEffect(()=>{
        setActionsStyle(actions());
        getToDos();
    },[])

    const logoutHandler = async () =>{
        debugger;
        await axios({
            url: "http://localhost:5000/logout",
            method: "POST",
            headers:{
                Authorization: "Bearer " + localStorage.getItem("jwt")
            }
        })
        .then(res => {
            localStorage.removeItem("jwt");
            navigate("/login");
        })
    }


    return(
        <>
         <ToastContainer></ToastContainer>
         <div className="d-flex w-100 justify-content-end pe-3 mt-2">
         <button onClick={logoutHandler}><i class="fa fa-sign-out" aria-hidden="true"></i></button>
         </div>
        <div className="d-flex justify-content-center align-items-center mt-4">
        
        <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#modal">
        <i className="fa fa-check bg-primary text-white rounded p-2"></i>
    
        </button>
        
        <h1 className="ps-2">Press here to add a todo task</h1>
    
    </div>
    {todosList.TODOs && actionsStyle &&
    <div className="row justify-content-center align-items-center mb-4" style={{height:'50vh'}}>
    <div className="col-sm-4">
     <table className="table table-light table-hover w-100 pt-5 table-striped">
          <thead className="table-dark">
            <tr className="text-center">
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {todosList.TODOs.map(todo => (
                <tr key={todo.ID}>
                <td>{todo.TITLE}</td>
                <td>{todo.DESCRIPTION}</td>
                <td>{actions(todo.ID)}</td>
                </tr>
            ))}
          </tbody>
     </table>
     </div>
     </div>
}
     <ToDoForm setToDo={setToDoForm}></ToDoForm>
     </>
    )
    }

export default Todo