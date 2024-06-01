import React, { useState } from "react";
import Modal from "./Modal";
import "./styleInput.css";

function Input(props) {
    const [name, setName] = useState("");
    const [grade, setGrade] = useState("");

    const changeName = (event) => setName(event.target.value);
    const changeGrade = (event) => setGrade(event.target.value);


    const handleSubmit = (event) => {
        event.preventDefault();
        const val = { name, grade };
        props.editTable(val);
        setName("");
        setGrade("");
    };

    const handleClear = () =>{
        props.clear();
        setName("");
        setGrade("");
    }

    return (
        <>
            {props.isEditModalOpen ? (
                <Modal
                    rowToEdit={props.rowToEdit}
                    handleRowEdit={props.handleRowEdit}
                    handleEditX={props.handleEditX}
                    name={name}
                    grade={grade}
                    setName={setName}
                    setGrade={setGrade}
                />
            ) : (
                <div className="add" >
                    <label id="labelName">Name: </label>
                    <input className="inputName" placeholder="name" type="text" value={name} onChange={changeName} />
                    <label id="labelGrade">Grade: </label>
                    <input className="inputGrade" placeholder="grade" type="text" value={grade} onChange={changeGrade} />
                    <button className="btnAdd" onClick={handleSubmit}>Add</button>
                    <button className="btnClear" onClick={handleClear}>Clear</button>
                </div>

            )}
        </>
    );
}

export default Input;
