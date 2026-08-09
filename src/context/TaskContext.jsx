import { createContext, useContext, useState } from "react";

const TaskContext = createContext();

export function TaskProvider({ children }) {

    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: "Complete dashboard UI",
            projectId: 1,
            priority: "High",
            completed: false,
            assignedTo: "You",
        },
        {
            id: 2,
            title: "Review project requirements",
            projectId: 2,
            priority: "Medium",
            completed: false,
            assignedTo: "You",
        },
        {
            id: 3,
            title: "Prepare analytics report",
            projectId: 3,
            priority: "Low",
            completed: true,
            assignedTo: "You",
        },
        {
            id: 4,
            title: "Create responsive layout",
            projectId: 1,
            priority: "Medium",
            completed: false,
            assignedTo: "You",
        },
    ]);

    const addTask = (task) => {
        const newTask = {
            ...task,
            id: Date.now(),
        };

        setTasks((currentTasks) => [
            ...currentTasks,
            newTask,
        ]);
    };

    const deleteTask = (taskId) => {
        setTasks((currentTasks) =>
            currentTasks.filter(
                (task) => task.id !== taskId
            )
        );
    };

    const toggleTask = (taskId) => {
        setTasks((currentTasks) =>
            currentTasks.map((task) =>
                task.id === taskId
                    ? {
                        ...task,
                        completed: !task.completed,
                    }
                    : task
            )
        );
    };

    return (
        <TaskContext.Provider
            value={{
                tasks,
                addTask,
                deleteTask,
                toggleTask,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
}

export function useTasks() {
    return useContext(TaskContext);
}