
import axios from "axios";
import React, { useEffect, useState } from "react";
import ToDoForm from "./ToDoForm";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import $ from 'jquery';

const Todo = () =>{

    const [todosPost, setTodosPost] = useState(null);
    const [todosList,setToDosList] = useState([]);
    const [actionsStyle,setActionsStyle] = useState(null);
    const [editMode,setEditMode] = useState(false);
    const [editData,setEditData] = useState(null)
    const [showModal,setShowModal] = useState(false);

    const navigate = useNavigate();

    /**
     * Check if user has token, if not, redirect to login page
     */
    useEffect(()=>{
        if(!localStorage.getItem("jwt")){
            navigate("/login");
        }
    },[])

    const resetEditData = () =>{
        setTodosPost(null);
        setEditMode(false);
        setEditData(null);
    }


    const setToDoForm = (data) =>{
        setTodosPost({"title": data.title, "description": data.description});
    }

    useEffect(()=>{
        if(todosPost){
            if(!editMode){
                sendData();
            }
            else{
                updateData();
            }
        }
       
    },[todosPost])

    /**
     * Updates a todo task.
     */

    const updateData = async () =>{
        debugger;
        
        await axios({
            method: "PUT",
            url: `http://localhost:5000/todo/${editData.id}`,
            data: todosPost,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
        .then(res => {
            toast.success("Todo updated successfully");
            setTodosPost(null);
            setEditMode(false);
            setEditData(null);
            getToDos();
        })
    }

    useEffect(()=>{
        debugger;
        console.log(editMode)
    },[editMode])

    /**
     * Action buttons for todo, can be edit and delete
     * @returns 
     */
    const actions = (id,todo) => {
        return(
            <div className="d-flex py-2 justify-content-center">
            <button data-bs-toggle="modal" data-bs-target="#modal" className="btn btn-primary ps-2" id={id} onClick={(e) => editHandler(e,todo)}>Edit</button>
            <button className="btn btn-danger ms-2" id={id} onClick={deleteHandler}>Delete</button>
            </div>
        )
    
    }

    const deleteHandler = async (e) =>{
        
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

    const editHandler = (e,todo) =>{
        setEditMode(true);
        
        setEditData({title : todo.TITLE, description: todo.DESCRIPTION, id: e.target.id})
      
    }
       
    const sendData = async () =>{
        
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
            
            setToDosList(res.data);
        });
    }
    

    useEffect(()=>{
        setActionsStyle(actions());
        getToDos();
    },[])

    const logoutHandler = async () =>{
        
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
                <td>{actions(todo.ID,todo)}</td>
                </tr>
            ))}
          </tbody>
     </table>
     </div>
     </div>
}
    
     <ToDoForm resetData={resetEditData} editData = {editData} editMode={editMode} setToDo={setToDoForm}></ToDoForm>
     </>
    )
    }

export default Todo