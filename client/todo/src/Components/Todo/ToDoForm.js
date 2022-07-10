import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

const ToDoForm = (props) =>{

    const [formData,setFormData] = useState({
        title: "",
        description: ""
    });

    useEffect(()=>{
        if(props.editMode && props.editData){
            debugger;
            setFormData(props.editData);
        }
    },[props.editMode,props.editData])


    const addToDo = () =>{
        if(formData.title !== "" && formData.description !== ""){
            props.setToDo(formData);
            resetFormData();
        }
        else{
            toast.error("Please fill in all fields");
        }
    }

    const resetFormData = () =>{
        setFormData({
            title: "",
            description: ""
        });
       
    }

    const closeModal = () =>{
        if(props.editMode){
            props.resetData();
            resetFormData();
        }
    }

    const handleChange = (e) =>{
        debugger;
        if(e.target.name === "title"){
            setFormData({...formData, title: e.target.value});
        }
        else if(e.target.name === "description"){
            setFormData({...formData, description: e.target.value});
        }
    }

    return(
      
        <div className="modal fade" id="modal" tabIndex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
    <ToastContainer></ToastContainer>
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="modalLabel">Add a todo</h5>
        <button onClick={closeModal} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
        </button>
      </div>
      <div className="modal-body">
        <form>
            <div className="form-group">
                <label className="py-2" htmlFor="titleInput">Title</label>
                <input value={formData.title} name="title" onChange={handleChange} type="text" className="form-control" id="titleInput" aria-describedby="title" placeholder="Enter title" required/>
                </div>
                <div className="form-group">
                <label className="py-2" htmlFor="titleInput">Description</label>
                <input value={formData.description} name="description" onChange={handleChange} type="text" className="form-control" id="titleInput" aria-describedby="title" placeholder="Enter description" required/>
                </div>
                
                </form>
      </div>
      <div className="modal-footer">
      <button type="button" className="btn btn-primary" data-bs-dismiss={formData.title.length > 0 && formData.description.length > 0 ? "modal" : ""} onClick={addToDo}>{props.editMode ? "Edit" : "Add"}</button>
        <button type="button" onClick={closeModal} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
    )
}

export default ToDoForm