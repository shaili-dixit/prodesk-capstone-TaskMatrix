import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useProjects } from "../context/ProjectContext";
import { useTasks } from "../context/TaskContext";
import "./ProjectDetails.css";

function ProjectDetails() {

    const { projectId } = useParams();

    const { projects } = useProjects();

    const { tasks } = useTasks();


    const project = projects.find(
        (item) => item.id === Number(projectId)
    );


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


    const projectTasks = tasks.filter(
        (task) => task.projectId === project.id
    );


    const completedTasks = projectTasks.filter(
        (task) => task.completed
    ).length;


    const pendingTasks = projectTasks.filter(
        (task) => !task.completed
    ).length;


    return (
        <div className="details-page">

            <Navbar />

            <div className="details-layout">

                <Sidebar />

                <main className="details-main">


                    {/* Back */}

                    <Link
                        to="/projects"
                        className="back-link"
                    >
                        ← Back to Projects
                    </Link>


                    {/* Project Header */}

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


                        <button className="primary-button">
                            + Add Task
                        </button>

                    </section>


                    {/* Statistics */}

                    <section className="details-stats">

                        <div className="details-stat">

                            <span>
                                Progress
                            </span>

                            <strong>
                                {project.progress}%
                            </strong>

                        </div>


                        <div className="details-stat">

                            <span>
                                Team Members
                            </span>

                            <strong>
                                {project.members}
                            </strong>

                        </div>


                        <div className="details-stat">

                            <span>
                                Total Tasks
                            </span>

                            <strong>
                                {projectTasks.length}
                            </strong>

                        </div>


                        <div className="details-stat">

                            <span>
                                Completed
                            </span>

                            <strong>
                                {completedTasks}
                            </strong>

                        </div>

                    </section>


                    {/* Content */}

                    <section className="details-content">


                        {/* Progress Panel */}

                        <div className="details-panel">

                            <div className="panel-heading">

                                <div>

                                    <h2>
                                        Project Progress
                                    </h2>

                                    <p>
                                        Current project completion
                                    </p>

                                </div>

                                <strong>
                                    {project.progress}%
                                </strong>

                            </div>


                            <div className="large-progress-bar">

                                <div
                                    className="large-progress-fill"
                                    style={{
                                        width: `${project.progress}%`
                                    }}
                                />

                            </div>

                        </div>


                        {/* Tasks Panel */}

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

                                        <div
                                            className="details-task"
                                            key={task.id}
                                        >

                                            <div className="task-check">
                                                {task.completed
                                                    ? "✓"
                                                    : ""}
                                            </div>


                                            <div className="details-task-info">

                                                <h3>
                                                    {task.title}
                                                </h3>

                                                <p>
                                                    Assigned to: {task.assignedTo}
                                                </p>

                                            </div>


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
                                        No tasks have been added
                                        to this project yet.
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

export default ProjectDetails;