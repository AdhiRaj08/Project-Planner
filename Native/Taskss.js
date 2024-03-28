import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import TaskCard from './TaskCard';

// Places the Tasks into right status cards as per their status
const Taskss = ({ taskList, setTaskList }) => {
    
    // Function to filter the tasks according to status
    const filterTasksByStatus = (status) => {
        return taskList ? taskList.filter(task => task.Status === status) : [];
    };    

    return (
        <ScrollView contentContainerStyle={styles.taskContainer}>
              <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scrollViewContent}
            >
            <View style={styles.cardWrapper}>
                <View style={[styles.cardTop, {backgroundColor: "#5D93E1"}]}><Text>Pending</Text></View>
                <View style={styles.cardContent}>
                    {filterTasksByStatus('Pending').map((task, index) => (
                        <TaskCard key={index} taskObj={task} index={index} taskList={taskList} setTaskList={setTaskList}/>
                    ))}
                </View>
            </View>

            <View style={styles.cardWrapper}>
                <View style={[styles.cardTop, {backgroundColor: "#F9D288"}]}><Text>Progress</Text></View>
                <View style={styles.cardContent}>
                    {filterTasksByStatus('Progress').map((task, index) => (
                        <TaskCard key={index} taskObj={task} index={index} taskList={taskList} setTaskList={setTaskList}/>
                    ))}
                </View>
            </View>

            <View style={styles.cardWrapper}>
                <View style={[styles.cardTop, {backgroundColor: "#5DC250"}]}><Text>Completed</Text></View>
                <View style={styles.cardContent}>
                    {filterTasksByStatus('Completed').map((task, index) => (
                        <TaskCard key={index} taskObj={task} index={index} taskList={taskList} setTaskList={setTaskList}/>
                    ))}
                </View>
            </View>

            <View style={styles.cardWrapper}>
                <View style={[styles.cardTop, {backgroundColor: "#F48687"}]}><Text>Deployed</Text></View>
                <View style={styles.cardContent}>
                    {filterTasksByStatus('Deployed').map((task, index) => (
                        <TaskCard key={index} taskObj={task} index={index} taskList={taskList} setTaskList={setTaskList}/>
                    ))}
                </View>
            </View>

            <View style={styles.cardWrapper}>
                <View style={[styles.cardTop, {backgroundColor: "#B964F7"}]}><Text>Deffered</Text></View>
                <View style={styles.cardContent}>
                    {filterTasksByStatus('Deffered').map((task, index) => (
                        <TaskCard key={index} taskObj={task} index={index} taskList={taskList} setTaskList={setTaskList}/>
                    ))}
                </View>
            </View>
            </ScrollView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    taskContainer: {
        flexGrow: 1,
        paddingVertical: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
    },
    cardWrapper: {
        marginBottom: 10,
        paddingBottom: 20,
    },
    cardTop: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 10,
        paddingLeft: '35%',
        textAlign: 'center',
        marginHorizontal: 5,
        width: 200,
    },
    cardContent: {
        minHeight: 3000,
        width: 200,
        color: '#B964F7',
        backgroundColor: '#EFEFEF',
        paddingBottom: 20,
        marginHorizontal: 5,
        height: '10%',
    },
    scrollViewContent: {
    alignItems: 'center',
    padding: 20,
  },
});

export default Taskss;
