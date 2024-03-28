import React, { useEffect, useState, createContext, useContext } from 'react';
import CreateTask from './CreateTask';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "../App.css";
import Taskss from './Taskss';

// Create a Context for the task list
const TaskListContext = createContext();

const TodoList = () => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([]);
    const [startDate, setstartDate] = useState(null);
    const [endDate, setendDate] = useState(null);
    const [priority1, setPriority1] = useState('');
    const [priority2, setPriority2] = useState('');
    const [team, setTeam] = useState('');
    const [assignee, setAssignee] = useState('');
    const [tasksList, setTasksList] = useState(taskList); //For filtering and sorting tempory taskList

    // Load task list from localStorage on component mount
    useEffect(() => {
        let arr = localStorage.getItem("taskList");
        if (arr) {
            let obj = JSON.parse(arr);
            setTaskList(obj);
        }
    }, []);

    // Save task list to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("taskList", JSON.stringify(taskList));
    }, [taskList]);

    const updateListArray = (obj, index) => {
        let tempList = [...taskList];
        tempList[index] = obj;
        setTaskList(tempList);
        window.location.reload();
    }
    
    //For opening and closing the modal forms
    const toggle = () => {
        setModal(!modal);
    }

    // Saves the tasks when Tasks are entered through CreateTasks form into Tasks List
    const saveTask = (taskObj) => {
        let tempList = [...taskList];
        tempList.push(taskObj);
        setTaskList(tempList);
        setModal(false);
    }

    //Filter and Sorting Section
    const filterAndSortTasks = () => {
        setTasksList(taskList);
        const filteredTasks = taskList.filter((task) => {
            const matchesPriority = !priority1 || task.Priority === priority1;
            const matchesAssignee = !assignee || task.Assignee.toLowerCase().includes(assignee.toLowerCase());
            const matchesStartDate = !startDate || new Date(task.StartDate) >= new Date(startDate);
            const matchesEndDate = !endDate || new Date(task.EndDate) <= new Date(endDate);

            return matchesPriority && matchesAssignee && matchesStartDate && matchesEndDate;
        });

        let updatedTasks = filteredTasks;
        if(priority2 !== "All"){                          //When no order is specified, sorting is skipped
            updatedTasks = sortTasks(filteredTasks);
        }
        setTaskList(updatedTasks);
        ClearInput();
    };

    const resetTasks = () => {
        setTaskList(tasksList);
        ClearInput();
    };

    const sortTasks = (tasks) => {
        const priorityValues = {                        // Intrisic order when no sorting priority is specified
            'P0': 0,
            'P1': 1,
            'P2': 2
        };

        if(priority2 === "P0"){                          // Adding 4 to increase value to override the intrinsic order
            priorityValues[priority2] += 4;
        } else if(priority2 === "P1"){
            priorityValues[priority2] += 4;
        } else {
            priorityValues[priority2] += 4;
        }

    return [...tasks].sort((a, b) => {                      //SORTING
            const priorityA = priorityValues[a.Priority];
            const priorityB = priorityValues[b.Priority];

            return priorityB - priorityA;
        });
    }

    //handles the values from mid-section(Filter and sort criteria)
    const handleChange = (e) => {                           
        const { name, value } = e.target;
        if (name === "priority1") {
            setPriority1(value);
        } else if (name === "priority2") {
            setPriority2(value);
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


    // To clear the fields
    const ClearInput = () => {      
        setPriority1('');
        setPriority2('');
        setAssignee('');
        setstartDate(null);
        setendDate(null);
    };

    return (
        <TaskListContext.Provider value={{ taskList, updateListArray }}>
            <div className="header"> 
                <h3 className='mt-2'>Task_Board</h3>
                <img  src={require('./user_logo.png')} alt="user_logo" style = {{borderRadius:'14px', height:'1.9em'}}/>
            </div>
            <button className="btn btn-primary" onClick={() => setModal(true)}>Add New Task</button>
            <hr />

        <div className='mid-section'>
            <div className='filtersection'>
                <p style={{ fontSize: "17px", fontWeight: "600", paddingTop: "10px" }}>Filter By:</p>
                <div className="forms">
                    <input type="text" className="forms" value={assignee} onChange={handleChange} name="assignee" placeholder="Assignee Name" />
                </div>
                <div className="forms">
                    <select className="form-control" value={priority1} onChange={handleChange} name="priority1" id="priority1">
                        <option value="All">Select Priority</option>
                        <option value="P0">P0</option>
                        <option value="P1">P1</option>
                        <option value="P2">P2</option>
                    </select>
                </div>
                <div className="forms">
                    <DatePicker
                        id="startDate"
                        selected={startDate}
                        onChange={handleDateChangeend}
                        dateFormat="dd/MM/yyyy"
                        className="forms"
                        placeholderText=" Start Date"
                    />
                    </div>
                    <div className="forms"> 
                    <DatePicker
                        id="endDate"
                        selected={endDate}
                        onChange={handleDateChangestart}
                        dateFormat="dd/MM/yyyy"
                        className="forms"
                        placeholderText=" End Date"
                    />
                </div>
            </div>
            <div className='sortsection'>
                <p style={{ fontSize: "17px", fontWeight: "600", paddingTop: "1.2%", paddingRight: "0.8%" }}>Sort By:</p>
                <div className="forms">
                    <select className="form-control" value={priority2} onChange={handleChange} name="priority2" id="priority2">
                        <option value="All">Select Priority</option>
                        <option value="P0">P0</option>
                        <option value="P1">P1</option>
                        <option value="P2">P2</option>
                    </select>
                </div>
                <div className='buttons'>
                    <button id = "apply" className="btn btn-primary" onClick={filterAndSortTasks}>Apply</button>
                    <button id = "reset" className="btn btn-primary" onClick={resetTasks}>Reset</button>
                </div>
            </div>
        </div>
            <CreateTask toggle={toggle} modal={modal} save={saveTask} />
            <Taskss taskList={taskList} setTaskList={setTaskList}/>
        </TaskListContext.Provider>
    );
};

// Custom hook to access the TaskListContext
export const useTaskListContext = () => {
    return useContext(TaskListContext);
}

export default TodoList;
