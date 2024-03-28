import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "../App.css";
// Component for editing tasks
const EditTask = ({ isOpen, index, toggle, taskObj, taskList, setTaskList }) => {
    //Constructing Dummy object to store current tasks details
    const [formValues, setFormValues] = useState({
        Name: taskObj.Name,
        Des: taskObj.Description,
        Team: taskObj.Team,
        Assignee: taskObj.Assignee,
        Priority: taskObj.Priority,
        StartDate: taskObj.StartDate,
        EndDate: taskObj.EndDate,
        Status: taskObj.Status
    });
    const findTaskByName = (name) => {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].Name === name) {
                return { ...taskList[i] };
            }
        }
        return null; // Return null if no matching task is found
    };

    const handleEdit = () => {
        const foundTask = findTaskByName(index);
        if (foundTask) {
            setFormValues({
                foundTask
            });
        }
    };
    // Updating as per the fetched details through modal form
    const handleUpdate = () => {
        const updatedTaskList = taskList.map((task, idx) => {
            if (index === task.Name) {
                return {
                    ...task,
                    Priority: formValues.Priority,
                    Status: formValues.Status
                };
            }
            return task;
        });

        setTaskList(updatedTaskList);
        toggle();
    };

    const handleBothClicks = () => {
        handleEdit();
        handleUpdate();
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle} >
            <ModalHeader toggle={toggle}>Update Task</ModalHeader>
            <ModalBody>
                <form className='formGroup'>
                    <div>
                        <label>Title: </label>
                        <input
                            type="text"
                            value={formValues.Name}
                            readOnly
                            style={{ backgroundColor: '#f0f0f0', marginBottom: "10px" }}
                        />
                    </div>

                    <div>
                        <label>Description: </label>
                        <textarea rows="3"
                            value={formValues.Des}
                            readOnly
                            style={{ backgroundColor: '#f0f0f0', marginBottom: "-7px" }}
                        />
                    </div>

                    <div>
                        <label>Assignee: </label>
                        <input
                            type="text"
                            value={formValues.Assignee}
                            readOnly
                            style={{ backgroundColor: '#f0f0f0' }}
                        />
                    </div>

                    <div>
                        <label>Team: </label>
                        <input
                            type="text"
                            value={formValues.Team}
                            readOnly
                            style={{ backgroundColor: '#f0f0f0' }}
                        />
                    </div>

                    <div>
                        <label>Priority: </label>
                        <select
                            value={formValues.Priority}
                            onChange={(e) => setFormValues({ ...formValues, Priority: e.target.value })}>
                            <option value="P0">P0</option>
                            <option value="P1">P1</option>
                            <option value="P2">P2</option>
                        </select>
                    </div>

                    <div>
                        <label>Status: </label>
                        <select
                            value={formValues.Status}
                            onChange={(e) => setFormValues({ ...formValues, Status: e.target.value })}>
                            <option value="Assigned">Assigned</option>
                            <option value="Completed">Completed</option>
                            <option value="Deployed">Deployed</option>
                            <option value="Pending">Pending</option>
                            <option value="Deffered">Deffered</option>
                        </select>
                    </div>

                </form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleBothClicks}>Update</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
  );
};

export default EditTask;
