import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "../App.css";

//Component to create task input form
const CreateTask = ({modal, toggle, save }) => {
    const [title, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setstartDate] = useState(new Date()); //Set current date as default 
    const [endDate, setendDate] = useState(null);
    const [priority, setPriority] = useState('');
    const [team, setTeam] = useState('');
    const [assignee, setAssignee] = useState('');

    //Updates the variables on receiving values form form
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "title") {
            setTaskName(value);
        } else if (name === "description") {
            setDescription(value);
        } else if (name === "priority") {
            setPriority(value);
        } else if (name === "team") {
            setTeam(value);
        } else if (name === "assignee") {
            setAssignee(value);
        }
    };

    const handleDateChangestart = (date) => {
        setendDate(date);
    };
    const handleDateChangeend = (date) => {
        setstartDate(date);
    };
    
    //Clears the form once input operation is done
    const ClearInput = () => {
        setTaskName('');
        setDescription('');
        setPriority('');
        setAssignee('');
        setTeam('');
        setstartDate(null);
        setendDate(null);
    };

    let currentDate = new Date();

    //Saves all discrete info into single object
    const handleSave = (e) => {
        e.preventDefault()

        let taskObj = {
            Name: title,
            Description: description,
            StartDate: currentDate,
            EndDate: endDate,
            Team: team,
            Assignee: assignee,
            Priority: priority,
            Status: "Progress"
        };
        save(taskObj);
        ClearInput();
    };

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Create Task</ModalHeader>
            <ModalBody style = {{backgroundColor:"#E9EEF6"}}>
                    <div className = "form-group">
                        <label>Title: </label>
                        <input type="text" className = "form-control" value = {title} onChange = {handleChange} name = "title"/>
                    </div>

                    <div className = "form-group">
                        <label>Description: </label>
                        <textarea rows = "3" className = "form-control" value = {description} onChange = {handleChange} name = "description"></textarea>
                    </div>

                    <div className = "form-group">
                        <label>Team: </label>
                        <input type="text" className = "form-control" value = {team} onChange = {handleChange} name = "team"/>
                    </div>

                    <div className = "form-group">
                        <label>Assignees: </label>
                        <input type="text" className = "form-control" value = {assignee} onChange = {handleChange} name = "assignee"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="endDate">End Date:</label> {"  "} 
                        <DatePicker
                            id="endDate"
                            selected={endDate}
                            onChange={handleDateChangestart}
                            dateFormat="dd/MM/yyyy"
                            className="form-control"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="priority">Priorities: </label>
                        <select className="form-control" value={priority} onChange={handleChange} name="priority" id="priority">
                            <option value="All">Select Priority</option>
                            <option value="P0">P0</option>
                            <option value="P1">P1</option>
                            <option value="P2">P2</option>
                        </select>
                    </div>
            </ModalBody>
            <ModalFooter style = {{margin:"-5px"}}>
                <Button color="primary" onClick={handleSave}>Create</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
      </Modal>
      
    );
};

export default CreateTask;