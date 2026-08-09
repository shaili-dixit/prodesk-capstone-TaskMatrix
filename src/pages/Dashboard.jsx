import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import { useProjects } from "../context/ProjectContext";
import { useTasks } from "../context/TaskContext";

import "./Dashboard.css";

function Dashboard() {

    const { projects } = useProjects();
    const { tasks, toggleTask } = useTasks();


    // =========================
    // DASHBOARD STATISTICS
    // =========================

    const activeProjects = projects.filter(
        (project) =>
            project.status === "Active" ||
            project.status === "In Progress"
    ).length;

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
        (task) => task.completed
    ).length;

    const pendingTasks = tasks.filter(
        (task) => !task.completed
    ).length;


    // =========================
    // PROJECT DISPLAY
    // =========================

    const recentProjects = projects.slice(0, 3);


    // =========================
    // TASK DISPLAY
    // =========================

    const myTasks = tasks
        .filter((task) => task.assignedTo === "You")
        .slice(0, 3);


    return (
        <div className="dashboard-page">

            {/* =========================
                NAVBAR
            ========================= */}

            <Navbar />


            <div className="dashboard-layout">

                {/* =========================
                    SIDEBAR
                ========================= */}

                <Sidebar />


                {/* =========================
                    MAIN CONTENT
                ========================= */}

                <main className="dashboard-main">


                    {/* =========================
                        HEADER
                    ========================= */}

                    <section className="dashboard-header">

                        <div>

                            <p className="dashboard-label">
                                WORKSPACE
                            </p>

                            <h1>
                                Dashboard
                            </h1>

                            <p className="dashboard-subtitle">
                                Manage your projects, tasks and team
                                activities from one place.
                            </p>

                        </div>


                        <button className="primary-button">
                            + New Project
                        </button>

                    </section>



                    {/* =========================
                        STATISTICS
                    ========================= */}

                    <section className="stats-grid">


                        {/* ACTIVE PROJECTS */}

                        <div className="stat-card">

                            <div className="stat-icon blue">
                                P
                            </div>

                            <div>

                                <p>
                                    Active Projects
                                </p>

                                <h2>
                                    {activeProjects}
                                </h2>

                            </div>

                        </div>



                        {/* TOTAL TASKS */}

                        <div className="stat-card">

                            <div className="stat-icon purple">
                                T
                            </div>

                            <div>

                                <p>
                                    Total Tasks
                                </p>

                                <h2>
                                    {totalTasks}
                                </h2>

                            </div>

                        </div>



                        {/* COMPLETED */}

                        <div className="stat-card">

                            <div className="stat-icon green">
                                ✓
                            </div>

                            <div>

                                <p>
                                    Completed
                                </p>

                                <h2>
                                    {completedTasks}
                                </h2>

                            </div>

                        </div>



                        {/* PENDING */}

                        <div className="stat-card">

                            <div className="stat-icon orange">
                                !
                            </div>

                            <div>

                                <p>
                                    Pending
                                </p>

                                <h2>
                                    {pendingTasks}
                                </h2>

                            </div>

                        </div>

                    </section>



                    {/* =========================
                        DASHBOARD GRID
                    ========================= */}

                    <section className="dashboard-grid">


                        {/* =========================
                            RECENT PROJECTS
                        ========================= */}

                        <div className="dashboard-panel">


                            <div className="panel-header">

                                <div>

                                    <h2>
                                        Recent Projects
                                    </h2>

                                    <p>
                                        Your latest active projects
                                    </p>

                                </div>


                                <button className="view-button">
                                    View All
                                </button>

                            </div>



                            <div className="project-list">


                                {recentProjects.length > 0 ? (

                                    recentProjects.map((project) => (

                                        <div
                                            className="project-row"
                                            key={project.id}
                                        >


                                            {/* PROJECT ICON */}

                                            <div
                                                className={`project-avatar ${
                                                    project.id % 3 === 1
                                                        ? "blue"
                                                        : project.id % 3 === 2
                                                            ? "purple"
                                                            : "green"
                                                }`}
                                            >
                                                {project.name
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>



                                            {/* PROJECT INFO */}

                                            <div className="project-info">

                                                <h3>
                                                    {project.name}
                                                </h3>

                                                <p>
                                                    {project.description}
                                                </p>

                                            </div>



                                            {/* PROJECT STATUS */}

                                            <span
                                                className={`status ${
                                                    project.status === "Active"
                                                        ? "active"
                                                        : "progress"
                                                }`}
                                            >
                                                {project.status}
                                            </span>

                                        </div>

                                    ))

                                ) : (

                                    <div className="empty-state">
                                        No projects available.
                                    </div>

                                )}

                            </div>

                        </div>



                        {/* =========================
                            MY TASKS
                        ========================= */}

                        <div className="dashboard-panel">


                            <div className="panel-header">

                                <div>

                                    <h2>
                                        My Tasks
                                    </h2>

                                    <p>
                                        Tasks assigned to you
                                    </p>

                                </div>


                                <button className="view-button">
                                    View All
                                </button>

                            </div>



                            <div className="task-list">


                                {myTasks.length > 0 ? (

                                    myTasks.map((task) => (

                                        <div
                                            className="task-row"
                                            key={task.id}
                                        >


                                            {/* CHECKBOX */}

                                            <input
                                                type="checkbox"
                                                className="task-checkbox"
                                                checked={task.completed}
                                                onChange={() =>
                                                    toggleTask(task.id)
                                                }
                                            />



                                            {/* TASK INFORMATION */}

                                            <div>

                                                <h3
                                                    className={
                                                        task.completed
                                                            ? "completed-task"
                                                            : ""
                                                    }
                                                >
                                                    {task.title}
                                                </h3>

                                                <p>
                                                    Project #{task.projectId}
                                                </p>

                                            </div>



                                            {/* PRIORITY */}

                                            <span
                                                className={`priority ${
                                                    task.priority === "High"
                                                        ? "high"
                                                        : task.priority === "Medium"
                                                            ? "medium"
                                                            : "low"
                                                }`}
                                            >
                                                {task.priority}
                                            </span>

                                        </div>

                                    ))

                                ) : (

                                    <div className="empty-state">
                                        No tasks assigned to you.
                                    </div>

                                )}

                            </div>

                        </div>

                    </section>

                </main>

            </div>

        </div>
    );
}

export default Dashboard;