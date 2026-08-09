import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TaskCard from "../components/TaskCard";

import { useProjects } from "../context/ProjectContext";
import { useTasks } from "../context/TaskContext";

import "./ProjectDetails.css";

function ProjectDetails() {

    const { projectId } = useParams();

    const { projects } = useProjects();

    const { tasks, addTask } = useTasks();


    // =========================
    // FIND CURRENT PROJECT
    // =========================

    const project = projects.find(
        (item) => item.id === Number(projectId)
    );


    // =========================
    // FORM STATE
    // =========================

    const [showForm, setShowForm] = useState(false);

    const [taskTitle, setTaskTitle] = useState("");

    const [priority, setPriority] = useState("Medium");


    // =========================
    // PROJECT NOT FOUND
    // =========================

    if (!project) {

        return (
            <div className="details-page">

                <Navbar />

                <div className="details-layout">

                    <Sidebar />

                    <main className="details-main">

                        <div className="not-found-project">

                            <h1>
                                Project Not Found
                            </h1>

                            <p>
                                The project you're looking for
                                doesn't exist.
                            </p>

                            <Link
                                to="/projects"
                                className="back-button"
                            >
                                ← Back to Projects
                            </Link>

                        </div>

                    </main>

                </div>

            </div>
        );
    }


    // =========================
    // PROJECT TASKS
    // =========================

    const projectTasks = tasks.filter(
        (task) => task.projectId === project.id
    );


    // =========================
    // DYNAMIC PROGRESS
    // =========================

    const completedTasks = projectTasks.filter(
        (task) => task.completed
    ).length;


    const pendingTasks = projectTasks.filter(
        (task) => !task.completed
    ).length;


    const projectProgress =
        projectTasks.length === 0
            ? 0
            : Math.round(
                (completedTasks / projectTasks.length) * 100
            );


    // =========================
    // ADD TASK
    // =========================

    const handleAddTask = (event) => {

        event.preventDefault();

        if (!taskTitle.trim()) {
            return;
        }

        addTask({
            title: taskTitle.trim(),
            projectId: project.id,
            priority: priority,
            completed: false,
            assignedTo: "You",
        });

        setTaskTitle("");
        setPriority("Medium");
        setShowForm(false);
    };


    return (
        <div className="details-page">

            <Navbar />

            <div className="details-layout">

                <Sidebar />

                <main className="details-main">


                    {/* =========================
                        BACK BUTTON
                    ========================= */}

                    <Link
                        to="/projects"
                        className="back-link"
                    >
                        ← Back to Projects
                    </Link>


                    {/* =========================
                        PROJECT HEADER
                    ========================= */}

                    <section className="project-details-header">

                        <div className="details-title">

                            <div className="details-icon">
                                {project.name
                                    .charAt(0)
                                    .toUpperCase()}
                            </div>

                            <div>

                                <div className="title-row">

                                    <h1>
                                        {project.name}
                                    </h1>

                                    <span
                                        className={`project-status ${
                                            project.status === "Active"
                                                ? "active"
                                                : "progress"
                                        }`}
                                    >
                                        {project.status}
                                    </span>

                                </div>

                                <p>
                                    {project.description}
                                </p>

                            </div>

                        </div>


                        <button
                            className="primary-button"
                            onClick={() =>
                                setShowForm(!showForm)
                            }
                        >
                            {showForm
                                ? "Cancel"
                                : "+ Add Task"}
                        </button>

                    </section>


                    {/* =========================
                        ADD TASK FORM
                    ========================= */}

                    {showForm && (

                        <section className="add-task-panel">

                            <div className="panel-heading">

                                <div>

                                    <h2>
                                        Add New Task
                                    </h2>

                                    <p>
                                        Create a task for this project.
                                    </p>

                                </div>

                            </div>


                            <form
                                className="task-form"
                                onSubmit={handleAddTask}
                            >

                                <div className="task-form-group">

                                    <label htmlFor="taskTitle">
                                        Task Title
                                    </label>

                                    <input
                                        id="taskTitle"
                                        type="text"
                                        placeholder="Enter task title"
                                        value={taskTitle}
                                        onChange={(event) =>
                                            setTaskTitle(
                                                event.target.value
                                            )
                                        }
                                    />

                                </div>


                                <div className="task-form-group">

                                    <label htmlFor="taskPriority">
                                        Priority
                                    </label>

                                    <select
                                        id="taskPriority"
                                        value={priority}
                                        onChange={(event) =>
                                            setPriority(
                                                event.target.value
                                            )
                                        }
                                    >

                                        <option value="Low">
                                            Low
                                        </option>

                                        <option value="Medium">
                                            Medium
                                        </option>

                                        <option value="High">
                                            High
                                        </option>

                                    </select>

                                </div>


                                <button
                                    type="submit"
                                    className="save-task-button"
                                >
                                    Add Task
                                </button>

                            </form>

                        </section>
                    )}


                    {/* =========================
                        PROJECT STATISTICS
                    ========================= */}

                    <section className="details-stats">


                        {/* PROGRESS */}

                        <div className="details-stat">

                            <span>
                                Progress
                            </span>

                            <strong>
                                {projectProgress}%
                            </strong>

                        </div>


                        {/* MEMBERS */}

                        <div className="details-stat">

                            <span>
                                Team Members
                            </span>

                            <strong>
                                {project.members}
                            </strong>

                        </div>


                        {/* TOTAL TASKS */}

                        <div className="details-stat">

                            <span>
                                Total Tasks
                            </span>

                            <strong>
                                {projectTasks.length}
                            </strong>

                        </div>


                        {/* COMPLETED */}

                        <div className="details-stat">

                            <span>
                                Completed
                            </span>

                            <strong>
                                {completedTasks}
                            </strong>

                        </div>

                    </section>


                    {/* =========================
                        MAIN CONTENT
                    ========================= */}

                    <section className="details-content">


                        {/* =========================
                            PROJECT PROGRESS
                        ========================= */}

                        <div className="details-panel">

                            <div className="panel-heading">

                                <div>

                                    <h2>
                                        Project Progress
                                    </h2>

                                    <p>
                                        Based on completed project tasks
                                    </p>

                                </div>

                                <strong>
                                    {projectProgress}%
                                </strong>

                            </div>


                            <div className="large-progress-bar">

                                <div
                                    className="large-progress-fill"
                                    style={{
                                        width: `${projectProgress}%`
                                    }}
                                />

                            </div>

                        </div>


                        {/* =========================
                            PROJECT TASKS
                        ========================= */}

                        <div className="details-panel">

                            <div className="panel-heading">

                                <div>

                                    <h2>
                                        Project Tasks
                                    </h2>

                                    <p>
                                        Tasks associated with this project
                                    </p>

                                </div>

                                <span className="task-summary">
                                    {completedTasks} / {projectTasks.length}
                                </span>

                            </div>


                            <div className="details-task-list">

                                {projectTasks.length > 0 ? (

                                    projectTasks.map((task) => (

                                        <TaskCard
                                            key={task.id}
                                            task={task}
                                        />

                                    ))

                                ) : (

                                    <div className="empty-state">
                                        No tasks have been added
                                        to this project yet.
                                    </div>

                                )}

                            </div>

                        </div>

                    </section>


                    {/* =========================
                        TASK SUMMARY
                    ========================= */}

                    <section className="details-panel task-overview-panel">

                        <div className="panel-heading">

                            <div>

                                <h2>
                                    Task Overview
                                </h2>

                                <p>
                                    Current project task status
                                </p>

                            </div>

                        </div>


                        <div className="task-overview">

                            <div className="task-overview-item">

                                <span>
                                    Total
                                </span>

                                <strong>
                                    {projectTasks.length}
                                </strong>

                            </div>


                            <div className="task-overview-item">

                                <span>
                                    Completed
                                </span>

                                <strong>
                                    {completedTasks}
                                </strong>

                            </div>


                            <div className="task-overview-item">

                                <span>
                                    Pending
                                </span>

                                <strong>
                                    {pendingTasks}
                                </strong>

                            </div>

                        </div>

                    </section>

                </main>

            </div>

        </div>
    );
}

export default ProjectDetails;