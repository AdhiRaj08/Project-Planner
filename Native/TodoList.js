import React, { useEffect, useState, createContext, useContext } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Picker } from 'react-native';
import Taskss from './Taskss';
import CreateTask from './CreateTask';

// Create a Context for the task list
const TaskListContext = createContext();

const TodoList = () => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([]);

    // Load task list from AsyncStorage on component mount
    useEffect(() => {
        const loadTasks = async () => {
            try {
                const arr = await AsyncStorage.getItem("taskList");
                if (arr) {
                    const obj = JSON.parse(arr);
                    setTaskList(obj);
                }
            } catch (error) {
                console.error("Error loading tasks from AsyncStorage:", error);
            }
        };

        loadTasks();
    }, []);

    // Save task list to AsyncStorage whenever it changes
    useEffect(() => {
        const saveTasks = async () => {
            try {
                await AsyncStorage.setItem("taskList", JSON.stringify(taskList));
            } catch (error) {
                console.error("Error saving tasks to AsyncStorage:", error);
            }
        };

        saveTasks();
    }, [taskList]);

    const updateListArray = (obj, index) => {
        let tempList = [...taskList];
        tempList[index] = obj;
        setTaskList(tempList);
    }

    const toggle = () => {
        setModal(!modal);
    }

    const saveTask = (taskObj) => {
        let tempList = [...taskList];
        tempList.push(taskObj);
        setTaskList(tempList);
        setModal(false);
    }

    const [tasksList, setTasksList] = useState(taskList);
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
        if(priority2 !== "All"){
            updatedTasks = sortTasks(filteredTasks);
        }
        setTaskList(updatedTasks);
        clearInput();
    };

    const resetTasks = () => {
        setTaskList(tasksList);
        clearInput();
    };
    
    const sortTasks = (tasks) => {
        const priorityValues = {
            'P0': 0,
            'P1': 1,
            'P2': 2
        };

        if(priority2 === "P0"){
            priorityValues[priority2] += 4;
        } else if(priority2 === "P1"){
            priorityValues[priority2] += 4;
        } else {
            priorityValues[priority2] += 4;
        }

        return [...tasks].sort((a, b) => {
            const priorityA = priorityValues[a.Priority];
            const priorityB = priorityValues[b.Priority];

            return priorityB - priorityA;
        });
    }
    
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [priority1, setPriority1] = useState('');
    const [priority2, setPriority2] = useState('');
    const [team, setTeam] = useState('');
    const [assignee, setAssignee] = useState('');

    const handleChange = (name, value) => {
        if (name === "priority1") {
            setPriority1(value);
        } else if (name === "priority2") {
            setPriority2(value);
        } else if (name === "assignee") {
            setAssignee(value);
        }
    };

    const handleDateChangeStart = (date) => {
        setEndDate(date);
    };

    const handleDateChangeEnd = (date) => {
        setStartDate(date);
    };
    

    const clearInput = () => {
        setPriority1('');
        setPriority2('');
        setAssignee('');
        setStartDate(null);
        setEndDate(null);
    };

    return (
        <TaskListContext.Provider value={{ taskList, updateListArray }}>
            <View style={styles.header}>
                <View style={{ marginRight: '50%', fontSize: 50 }}>
                    <Text>Task Board</Text>
                </View>
                <Button style={styles.buttonfiled} title="Add New Task" onPress={() => setModal(true)} />
              </View>
              <View>
                <View style={styles.filtersection}>
                    <Text>Filter By:</Text>
                     <View style={styles.filterFields}>
                    <TextInput 
                        value={assignee} 
                        style={styles.inputField}
                        onChangeText={(value) => handleChange("assignee", value)} 
                        placeholder="Name" 
                    />
                    <TextInput 
                        value={priority1} 
                        style={styles.inputField}
                        onChangeText={(value) => handleChange("priority1", value)} 
                        placeholder="Priority" 
                    />
                    <TextInput 
                        value={startDate} 
                        style={styles.inputField}
                        onChangeText={(value) => handleDateChangeEnd("startDate", value)} 
                        placeholder="Start date" 
                    /><TextInput 
                        value={endDate} 
                        style={styles.inputField}
                        onChangeText={(value) => handleDateChangeStart("endDate", value)} 
                        placeholder="End date" 
                    />
                  </View>
                </View>
                <View style={styles.sortsection}>
                    <Text>Sort By:</Text>
                    <View style={styles.sortFields}>
                    <TextInput 
                        value={priority2} 
                        style={styles.inputField}
                        style={{marginRight: '55%'}}
                        onChangeText={(value) => handleChange("priority2", value)} 
                        placeholder="Priority" 
                    />
                    <Button title="Apply" onPress={filterAndSortTasks} />
                    <Button style={{marginRight: '5%'}} title="Reset" onPress={resetTasks} />
                </View>
                </View>
                <CreateTask toggle={toggle} modal={modal} save={saveTask} />
                <Taskss taskList={taskList} setTaskList={setTaskList} />
            </View>
        </TaskListContext.Provider>
    );
};

// Custom hook to access the TaskListContext
export const useTaskListContext = () => {
    return useContext(TaskListContext);
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingTop: '30%',
    marginBottom: '5%',
    paddingRight: '3%',
    alignItems: 'center',
    fontWeight: '700',
    fontSize: 20,
  },
  cardContainer: {
    height: 500,
    borderWidth: 1,
    width: 300,
    shadowColor: '#A5A5A5',
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 50,
  },
 filterSection: {
    marginLeft: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sortSection: {
    marginLeft: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  filterFields: {
      flexDirection: 'row',
      marginLeft: 10,
  },
  sortFields: {
      flexDirection: 'row',
      marginLeft: 10,
  },
  inputField: {
      marginRight: 30,
  },
});

export default TodoList;
