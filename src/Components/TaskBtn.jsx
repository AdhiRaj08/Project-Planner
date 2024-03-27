import React, { useState } from 'react';
import '../App.css';

//Component for changing the status on buttons
function TaskBtn({ taskObj }) {
  const [currentStatus, setCurrentStatus] = useState(taskObj.Status);

  return (
    <button className='btn' style={{ backgroundColor: "blue", color: "white", fontSize: "12px" }}>
        {taskObj.Status}
    </button>
  );
}

export default TaskBtn;
