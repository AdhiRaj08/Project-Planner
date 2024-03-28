import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import TaskBtn from './TaskBtn';
import EditTask from './EditTask';
import DeleteTask from './DeleteTask';


// Functional Component to create a Task Cards.
const TaskCard = ({ taskObj, index, taskList, setTaskList }) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isshowDeleteModal, issetshowDeleteModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [showMenu, setShowMenu] = useState(false);

    const handleEditClick = () => {
        setSelectedTask(taskObj);
        setShowEditModal(true);
    };

    const handleDeleteClick = () => {
        setSelectedTask(taskObj);
        setShowDeleteModal(true);
        if (taskObj.Status !== "Completed")
            issetshowDeleteModal(true);
    };

    const toggleEditModal = () => {
        setShowEditModal(!showEditModal);
    };

    const toggleDeleteModal = () => {
        setShowDeleteModal(!showDeleteModal);
        issetshowDeleteModal(false);
    };

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <View>
            <View style={styles.taskHolder}>
                <View style={{ padding: "10%", backgroundColor: "#dcdbdb" }}>
                    <View style={styles.gps}>
                        <Text style={styles.taskName}>{taskObj.Name}</Text>
                        <Text style={styles.priority}>{taskObj.Priority}</Text>
                    </View>
                    <View style={styles.hr} />
                    <Text style={styles.description}>{taskObj.Description}</Text>
                    <View style={styles.groups}>
                        <Text style={styles.assignee}>@{taskObj.Assignee}</Text>
                        <TouchableOpacity style={styles.dropdown} onPress={toggleMenu}>
                            <Text style={styles.dropdownText}>:</Text>
                        </TouchableOpacity>
                        {showMenu && (
                            <View style={styles.dropdownContent}>
                                <TouchableOpacity onPress={handleEditClick}><Text>Edit</Text></TouchableOpacity>
                                <TouchableOpacity onPress={handleDeleteClick}><Text>Delete</Text></TouchableOpacity>
                            </View>
                        )}
                    </View>
                    <TaskBtn taskObj={taskObj} />
                </View>
            </View>
            {showEditModal && <EditTask isOpen={showEditModal} toggle={toggleEditModal} index={taskObj.Name} taskObj={taskList[index]} taskList={taskList} setTaskList={setTaskList} />}
            {showDeleteModal && <DeleteTask isOpen={isshowDeleteModal} toggle={toggleDeleteModal} index={index} taskObj={taskList[index]} taskList={taskList} setTaskList={setTaskList} />}
        </View>
    );
};

const styles = StyleSheet.create({
cardTop: {
    color: '#f6f7f8',
    fontWeight: '700',
    paddingLeft: '35%',
    paddingTop: '3%',
    paddingBottom: '4%',
  },
  taskHolder: {
    width: '100%',
    height: 'auto',
    padding: 10,
  },
  cardHeader: {
    maxWidth: 80,
    textAlign: 'center',
  },
  taskContainer: {
    margin: 30,
    backgroundColor: '#b7afaf',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  hr: {
    margin: 0,
    opacity: 1,
    width: '100%',
    marginBottom: 10,
    color: 'black',
    height: 2,
    backgroundColor: 'black',
  },
  priority: {
    backgroundColor: '#06a3d7',
    color: '#E9EEF6',
    padding: 2,
    fontWeight: '600',
    borderRadius: 3,
  },
  groups: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gps: {
    flexDirection: 'row',
  },
  grps: {
    padding: '10%',
    paddingTop: '0%',
    paddingLeft: '0%',
  },
  dropbtn: {
    backgroundColor: '#1ea4d0',
    color: 'white',
    padding: 4,
    fontSize: 16,
    borderRadius: 9,
  },
  dropdown: {
    position: 'relative',
    display: 'flex',
  },
  dropdownContent: {
    display: 'none',
    position: 'absolute',
    fontSize: 16,
    backgroundColor: '#f1f1f1',
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 1,
    zIndex: 1,
  },
  dropdownContentA: {
    color: 'black',
    padding: 6,
    display: 'block',
  },
  dropdownContentAHover: {
    backgroundColor: '#ddd',
    cursor: 'pointer',
  },
  dropdownHoverContent: {
    display: 'block',
  },
});

export default TaskCard;
