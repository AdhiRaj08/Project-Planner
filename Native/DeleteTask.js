import React from 'react';
import { View, Text, Button, Modal } from 'react-native';

const DeleteTask = ({ isOpen, toggle, taskObj, index, taskList, setTaskList }) => {
    
    const onDelete = () => {
        const updatedTaskList = [...taskList];
        updatedTaskList.splice(index, 1);
        setTaskList(updatedTaskList);
        toggle();
    };

    return (
    <>
        <Modal visible={isOpen} onRequestClose={toggle}>
            <View>
                <Text>Delete Task</Text>
                <View>
                    <Text>Are You Sure to delete this Task {index}?</Text>
                </View>
                <View>
                    <Button title="Delete" onPress={onDelete} />
                    <Button title="Cancel" onPress={toggle} />
                </View>
            </View>
        </Modal>
         <Modal isOpen={!isOpen} onRequestClose={toggle}>
            <View>
                <Text>Delete Task</Text>
                <View>
                    <Text>Completed Task {taskObj.Name} cannot be deleted!!</Text>
                </View>
               </View>
        </Modal>
      </>
    );
};

export default DeleteTask;
