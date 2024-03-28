import React from 'react';
import TaskCard from './TaskCard';

// Places the Tasks into right status cards as per their status
const Taskss = ({taskList, setTaskList}) => {
    
    //Function to filter the tasks according to status
    const filterTasksByStatus = (status) => {
        return taskList ? taskList.filter(task => task.Status === status) : [];
    };    

    return (

        <div className="task-container">
            <div className="card-wrapperX ">
                <div className="card-top" style={{"backgroundColor": "#5D93E1"}}>Pending</div>
                <div style={{minHeight: "500px"}}>
                    {filterTasksByStatus('Pending').map((task, index) => (
                        <TaskCard key={index} taskObj={task} index={index} taskList={taskList} setTaskList={setTaskList}/>
                    ))}
                </div>
            </div>

            <div className="card-wrapperX ">
                <div className="card-top" style={{"backgroundColor": "#F9D288"}}>Progress</div>
                <div style={{minHeight: "500px"}}>
                    {filterTasksByStatus('Progress').map((task, index) => (
                        <TaskCard key={index} taskObj={task} index={index} taskList={taskList} setTaskList={setTaskList}/>
                    ))}
                </div>
            </div>

            <div className="card-wrapperX ">
                <div className="card-top" style={{"backgroundColor": "#5DC250"}}>Completed</div>
                <div style={{minHeight: "500px"}}>
                    {filterTasksByStatus('Completed').map((task, index) => (
                        <TaskCard key={index} taskObj={task} index={index} taskList={taskList} setTaskList={setTaskList}/>
                    ))}
                </div>
            </div>

            <div className="card-wrapperX ">
                <div className="card-top" style={{"backgroundColor": "#F48687"}}>Deployed</div>
                <div style={{minHeight: "500px"}}>
                    {filterTasksByStatus('Deployed').map((task, index) => (
                        <TaskCard key={index} taskObj={task} index={index} taskList={taskList} setTaskList={setTaskList}/>
                    ))}
                </div>
            </div>

            <div className="card-wrapperX ">
                <div className="card-top" style={{"backgroundColor": "#B964F7"}}>Deffrered</div>
                <div style={{minHeight: "500px"}}>
                    {filterTasksByStatus('Deffered').map((task, index) => (
                        <TaskCard key={index} taskObj={task} index={index} taskList={taskList} setTaskList={setTaskList}/>
                    ))}
                </div>
            </div>
            
        </div>
    );
};

export default Taskss;
