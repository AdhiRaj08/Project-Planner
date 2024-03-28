import React, {useState} from 'react';
import TaskBtn from './TaskBtn';
import "../App.css";
import EditTask from './EditTask';
import DeleteTask from './DeleteTask';

//Functional Component to create a Task Cards.
const TaskCard = ({ taskObj, index, taskList, setTaskList }) => {
        const [showEditModal, setShowEditModal] = useState(false);
        const [showDeleteModal, setShowDeleteModal] = useState(false);
        const [isshowDeleteModal, issetshowDeleteModal] = useState(false);
        const [selectedTask, setSelectedTask] = useState(null);

        const handleEditClick = () => {
            setShowEditModal(true);
        };

        const handleDeleteClick = () => {
            setSelectedTask(taskObj);
            setShowDeleteModal(true);
            if(taskObj.Status !== "Completed")
            issetshowDeleteModal(true);
        };

        const toggleEditModal = () => {
            setShowEditModal(!showEditModal);
        };

        const toggleDeleteModal = () => {
            setShowDeleteModal(!showDeleteModal);
            issetshowDeleteModal(false);
        };

        //For the drop-down menu [Edit and Delete]
        const [showMenu, setShowMenu] = useState(false);

        const toggleMenu = () => {
            setShowMenu(!showMenu);
            
        };

    return (
        <div>
            <div className = "task-holder" >
                    <div style = {{padding: "10%",backgroundColor:"#dcdbdb"}}>
                    <div className='gps' >
                        <p style = {{fontSize:"20px", fontWeight:"700", marginBottom: "0px", paddingBottom: "1px"}}>{taskObj.Name}</p>
                        <p className='priority'>{taskObj.Priority}</p>
                    </div>
                    <hr style = {{margin :"0px", opacity: "1"}}/>
                        <p className='grps' style = {{ fontSize: "12px"}}>{taskObj.Description}</p>
                        <div className="groups" style={{ fontSize: "15px", fontWeight: "600", marginTop: "25px" }}>{'@'}{taskObj.Assignee}
                    <div className='dropdown'>
                        <button className="dropbtn" onClick={toggleMenu}>
                            :
                        </button>
                        {showMenu && (
                            <div className="dropdown-content">
                                <a onClick={() => handleEditClick()}>Edit</a>
                                <a onClick={handleDeleteClick}>Delete</a>
                            </div>
                        )}
                    </div>
                        </div>

                        <TaskBtn taskObj={taskObj} />
                        </div>
                </div>
                    {showEditModal && <EditTask isOpen={showEditModal} toggle={toggleEditModal} index={taskObj.Name} taskObj={taskList[index]} taskList={taskList} setTaskList={setTaskList}/>}
                    {showDeleteModal && <DeleteTask isOpen={isshowDeleteModal} toggle={toggleDeleteModal} index={taskObj.Name} taskObj={taskList[index]} taskList={taskList} setTaskList={setTaskList}/>}
            </div>
    );
};

export default TaskCard;
