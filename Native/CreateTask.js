import React, { useState } from 'react';
import { View, Text, Button, Modal, TextInput, TouchableOpacity } from 'react-native';


const CreateTask = ({ modal, toggle, save }) => {
    const [title, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [team, setTeam] = useState('');
    const [assignee, setAssignee] = useState('');
    const [startDate, setstartDate] = useState(new Date());
    const [endDate, setendDate] = useState(null);

    const handleChange = (name, value) => {
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


    const ClearInput = () => {
        setTaskName('');
        setDescription('');
        setPriority('');
        setAssignee('');
        setTeam('');
    };

    const handleSave = () => {
        let taskObj = {
            Name: title,
            Description: description,
            Team: team,
            StartDate: currentDate,
            EndDate: endDate,
            Assignee: assignee,
            Priority: priority,
            Status: "Progress"
        };
        save(taskObj);
        ClearInput();
        toggle();
    };

    return (
        <Modal visible={modal} onRequestClose={toggle}>
            <View>
                <Text>Create Task</Text>
                <View>
                    <Text>Title: </Text>
                    <TextInput 
                        style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 10 }} 
                        value={title} 
                        onChangeText={(value) => handleChange("title", value)} 
                    />
                </View>

                <View>
                    <Text>Description: </Text>
                    <TextInput 
                        style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 10 }} 
                        multiline={true}
                        numberOfLines={3}
                        value={description} 
                        onChangeText={(value) => handleChange("description", value)} 
                    />
                </View>

                <View>
                    <Text>Team: </Text>
                    <TextInput 
                        style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 10 }} 
                        value={team} 
                        onChangeText={(value) => handleChange("team", value)} 
                    />
                </View>

                <View>
                    <Text>Assignees: </Text>
                    <TextInput 
                        style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 10 }} 
                        value={assignee} 
                        onChangeText={(value) => handleChange("assignee", value)} 
                    />
                </View>

                <View>
                    <Text>Priorities: </Text>
                    <TextInput 
                        style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 10 }} 
                        value={priority} 
                        onChangeText={(value) => handleChange("priority", value)} 
                    />
                </View>
                
                <View>
                    <Text>Due Date: </Text>
                    <TextInput 
                        style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 10 }} 
                        value={endDate} 
                        onChangeText={(value) => handleDateChangestart(value)} 
                    />
                </View>
                <Button title="Create" onPress={handleSave} />
                <Button title="Cancel" onPress={toggle} />
            </View>
        </Modal>
    );
};

export default CreateTask;
