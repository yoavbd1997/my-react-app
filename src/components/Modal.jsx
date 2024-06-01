import React from "react";
import { FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import "./styleModal.css";

function Modal({ handleRowEdit, handleEditX, name, grade, setName, setGrade }) {
    const handleV = (event) => {
        event.preventDefault();
      
        const val = { name, grade };
        setName("");
        setGrade("");
        handleRowEdit(val);
    };
    const handleX = (event) =>{
        event.preventDefault();
        handleEditX();
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleGradeChange = (event) => {
        setGrade(event.target.value);
    };

    return (
        <div className="modal-container">
        <div className="modal">
            <h1 id="h1Edit">Edit</h1>
            <div>
                <label className="editLabelName">Name:</label>
                <input className="nameEdit"
                    type="text" 
                    value={name} 
                    onChange={handleNameChange} 
                />
                <br></br>
                <label className="editLabelGrade">Grade:</label>
                <input 
                    className="gradeEdit"
                    type="text" 
                    value={grade} 
                    onChange={handleGradeChange} 
                />
                <button className="btnV" onClick={handleV}><FaCheck /></button>
                <button className="btnX" onClick={handleX}><FaTimes /></button>
            </div>
        </div>
        </div>
    );
}

export default Modal;
<FaTimes />
