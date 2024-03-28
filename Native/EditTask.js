import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// Component for changing the status on buttons
const TaskBtn = ({ taskObj }) => {
  const [currentStatus, setCurrentStatus] = useState(taskObj.Status);

  return (
    <TouchableOpacity 
        style={styles.button}
    >
        <Text style={styles.buttonText}>{taskObj.Status}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 12,
    },
});

export default TaskBtn;


import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler'; // If you use react-native-gesture-handler for touchable components


const EditTask = ({ isOpen, index, toggle, taskObj, taskList, setTaskList }) => {
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

    return (
        <Modal visible={isOpen} onRequestClose={toggle}>
            <View>
                <Text>Update Task</Text>
                <View>
                    <Text>Title: </Text>
                    <TextInput
                        value={formValues.Name}
                        editable={false}
                        style={{ backgroundColor: '#f0f0f0', marginBottom: 10 }}
                    />
                </View>

                <View>
                    <Text>Description: </Text>
                    <TextInput
                        multiline={true}
                        value={formValues.Des}
                        editable={false}
                        style={{ backgroundColor: '#f0f0f0', marginBottom: -7 }}
                    />
                </View>

                <View>
                    <Text>Assignee: </Text>
                    <TextInput
                        value={formValues.Assignee}
                        editable={false}
                        style={{ backgroundColor: '#f0f0f0' }}
                    />
                </View>

                <View>
                    <Text>Team: </Text>
                    <TextInput
                        value={formValues.Team}
                        editable={false}
                        style={{ backgroundColor: '#f0f0f0' }}
                    />
                </View>

                <View>
                    <Text>Priority: </Text>
                    <Text>Title: </Text>
                    <TextInput
                        value={formValues.Priority}
                        editable={false}
                        style={{ backgroundColor: '#f0f0f0', marginBottom: 10 }}
                    />
                </View>

                <View>
                    <Text>Status: </Text>
                    <Picker
                        selectedValue={formValues.Status}
                        onValueChange={(value) => setFormValues({ ...formValues, Status: value })}
                    >
                        <Picker.Item label="Assigned" value="Assigned" />
                        <Picker.Item label="Completed" value="Completed" />
                        <Picker.Item label="Deployed" value="Deployed" />
                        <Picker.Item label="Pending" value="Pending" />
                        <Picker.Item label="Deffered" value="Deffered" />
                    </Picker>
                </View>

                <Button title="Update" onPress={handleUpdate} />
                <Button title="Cancel" onPress={toggle} />
            </View>
        </Modal>
    );
};

export default EditTask;
