import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Input from "./Input";
import "./styleTable.css";
import { FaTrash } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { IoMdArrowRoundUp } from "react-icons/io";
import { IoMdArrowRoundDown } from "react-icons/io";


function Table() {
    const [table, setTable] = useState([]);
    const [rowToEdit, setRowToEdit] = useState(null);
    const [count, setCount] = useState(0);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [place, setPlace] = useState(0);
    const n = 2;
    const rowsToShow = (n) => {
        if (n >= table.length) {
            return [...table];
        } else {
            const lastNRows = table.slice(table.length - n);
            return lastNRows;
        }
    };

    const toShow = rowsToShow(2);

    const rows = toShow.map((data) => (
        <tr key={uuidv4()}>
            <td>{data.number}</td>
            <td>{data.name}</td>
            <td>{data.grade}</td>
            <td className="edit">
                <button className="btnDel" onClick={() => handleDelete(data.number)}><FaTrash /></button>
                <button className="btnEdit" onClick={() => handleEdit(data.number)}><MdModeEdit /></button>
            </td>
        </tr>
    ));

    const editTable = (data) => {
        arrangeRows();
        arrangeRowsNames();
        let newLine = sortID();
        setCount(count + 1);
        data.number = count + 1;
        newLine.push(data);
        setTable(newLine);
        setPlace(newLine.length);
    };

    const clear = () => {
        setTable([]);
        setCount(0);
        setPlace(0);
        setRowToEdit(null);
        setIsEditModalOpen(false);
    }
    const sortID = () => {
        const sortedData = [...table].sort((a, b) => {
            return a.number - b.number;
        });
        return sortedData;
    };

    const handleDelete = (index) => {
        arrangeRowsNames();
        arrangeRows();
        let newTable = sortID();
        newTable = newTable.filter((item) => item.number !== index); // Remove the row with the corresponding number
        setTable(newTable);
        sortID();
        setPlace(newTable.length);
    };




    const handleEdit = (index) => {
        setRowToEdit(index); // Set the data of the row to edit
        setIsEditModalOpen(true); // Open the edit modal
    };

    const handleRowEdit = (data) => {
        console.log(rowToEdit);
        arrangeRowsNames();
        arrangeRows();
        setPlace(table.length)
        let newTable = [];
        for (let i = 0; i < table.length; i++) {
            if(table[i].number === 4) console.log(i);
            if (table[i].number !== rowToEdit) {
                newTable.push(table[i]);
            }
            else {
                
                data.number = rowToEdit;
                newTable.push(data);
            }
        }
        setIsEditModalOpen(false);
        setRowToEdit(null);
        setTable(newTable);
        sortID();
    };

    const handleEditX = () =>{
        setIsEditModalOpen(false);
        setRowToEdit(null);
    }

    const handleUp = () => {
        if (table.length <= 1 || place <= n) return;

        const last = table[table.length - 1];
        let newPersonData = [...table];

        for (let i = table.length - 1; i > 0; i--) {
            newPersonData[i] = table[i - 1];
        }
        setPlace(place - 1)
        newPersonData[0] = last;
        setTable(newPersonData);
    };



    const handleDown = () => {

        if (table.length <= 1 || table.length - place <= 0) return; // If there's only one person, no need to move up

        const first = table[0];
        let newPersonData = [...table];

        for (let i = 0; i < table.length - 1; i++) {
            newPersonData[i] = table[i + 1]; // Update each person's name to the one below
        }
        setPlace(place + 1);
        newPersonData[table.length - 1] = first; // Move the first person's name to the last position
        setTable(newPersonData);
    };

    const arrangeRows = () => {
        for (let i = place; i < table.length; i++) {
            const first = table[0];
            let newPersonData = [...table];

            for (let i = 0; i < table.length - 1; i++) {
                newPersonData[i] = table[i + 1];
            }
            newPersonData[table.length - 1] = first;
            setTable(newPersonData);

        }
    };

    const arrangeRowsNames = () => {
        for (let i = place; i < table.length; i++) {
            const first = table[0].name;
            let newPersonData = [...table];

            for (let i = 0; i < table.length - 1; i++) {
                newPersonData[i].name = table[i + 1].name;
            }
            newPersonData[table.length - 1].name = first;
            setTable(newPersonData);

        }
    };

    const handleNameUp = () => {
        if (table.length <= 1 || place <= n) return;

        const last = table[table.length - 1].name;
        let newPersonData = [...table];

        for (let i = table.length - 1; i > 0; i--) {
            newPersonData[i].name = table[i - 1].name;
        }
        setPlace(place - 1)
        newPersonData[0].name = last;
        setTable(newPersonData);
    }
    const handleNameDown = () => {
        if (table.length <= 1 || table.length - place <= 0) return; // If there's only one person, no need to move up

        const first = table[0].name;
        let newPersonData = [...table];

        for (let i = 0; i < table.length - 1; i++) {
            newPersonData[i].name = table[i + 1].name; // Update each person's name to the one below
        }
        setPlace(place + 1);
        newPersonData[table.length - 1].name = first; // Move the first person's name to the last position
        setTable(newPersonData);
    }

    return (
        <div>
            <table>
                <thead>
                    {table.length > 0 && (
                        <>
                            <button className="lineUp" onClick={handleUp}><IoMdArrowRoundUp /></button>
                            <button className="lineDown" onClick={handleDown}><IoMdArrowRoundDown /></button>
                        </>
                    )}
                    <tr>
                        <th>Number

                        </th>
                        <th>
                            Name
                            {table.length > 0 && (
                                <>
                                    <button className="nameUp" onClick={handleNameUp}><IoMdArrowRoundUp /></button>
                                    <button className="nameDown" onClick={handleNameDown}><IoMdArrowRoundDown /></button>
                                </>
                            )}
                        </th>
                        <th>Grade</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}</tbody>
            </table>
            <Input editTable={editTable} clear={clear} handleEditX={handleEditX}
                isEditModalOpen={isEditModalOpen} handleRowEdit={handleRowEdit}
            />
        </div>
    );
}

export default Table;