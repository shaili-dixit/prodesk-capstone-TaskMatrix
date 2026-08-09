import { useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import { useProjects } from "../context/ProjectContext";
import { useTasks } from "../context/TaskContext";

import "./Projects.css";


function Projects() {

    const { projects, addProject } = useProjects();

    const { tasks } = useTasks();


    // =========================
    // CREATE PROJECT FORM
    // =========================

    const [showForm, setShowForm] = useState(false);

    const [projectName, setProjectName] = useState("");

    const [description, setDescription] = useState("");

    const [status, setStatus] = useState("Active");

    const [members, setMembers] = useState(1);


    // =========================
    // SEARCH & FILTER
    // =========================

    const [searchTerm, setSearchTerm] = useState("");

    const [filterStatus, setFilterStatus] = useState("all");


    // =========================
    // CREATE PROJECT
    // =========================

    const handleSubmit = (event) => {

        event.preventDefault();

        if (
            !projectName.trim() ||
            !description.trim()
        ) {
            return;
        }

        addProject({

            name: projectName.trim(),

            description: description.trim(),

            status: status,

            progress: 0,

            members: Number(members),

        });

        setProjectName("");

        setDescription("");

        setStatus("Active");

        setMembers(1);

        setShowForm(false);
    };


    // =========================
    // FILTER PROJECTS
    // =========================

    const filteredProjects = projects.filter((project) => {

        const matchesSearch =
            project.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            project.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase());


        const matchesStatus =
            filterStatus === "all" ||
            (
                filterStatus === "active" &&
                project.status === "Active"
            ) ||
            (
                filterStatus === "progress" &&
                project.status === "In Progress"
            );


        return matchesSearch && matchesStatus;

    });


    // =========================
    // CALCULATE PROJECT PROGRESS
    // =========================

    const getProjectProgress = (projectId) => {

        const projectTasks = tasks.filter(
            (task) => task.projectId === projectId
        );


        if (projectTasks.length === 0) {
            return 0;
        }


        const completedTasks = projectTasks.filter(
            (task) => task.completed
        ).length;


        return Math.round(
            (completedTasks / projectTasks.length) * 100
        );

    };


    return (

        <div className="projects-page">


            {/* =========================
                NAVBAR
            ========================= */}

            <Navbar />


            <div className="projects-layout">


                {/* =========================
                    SIDEBAR
                ========================= */}

                <Sidebar />


                <main className="projects-main">


                    {/* =========================
                        PAGE HEADER
                    ========================= */}

                    <section className="projects-header">

                        <div>

                            <p className="projects-label">
                                WORKSPACE
                            </p>

                            <h1>
                                Projects
                            </h1>

                            <p>
                                Manage and track all your projects
                                from one place.
                            </p>

                        </div>


                        <button
                            className="primary-button"
                            onClick={() =>
                                setShowForm(!showForm)
                            }
                        >

                            {showForm
                                ? "Cancel"
                                : "+ New Project"}

                        </button>

                    </section>


                    {/* =========================
                        CREATE PROJECT FORM
                    ========================= */}

                    {showForm && (

                        <section className="create-project-panel">


                            <div className="panel-header">

                                <div>

                                    <h2>
                                        Create New Project
                                    </h2>

                                    <p>
                                        Add a new project to your workspace.
                                    </p>

                                </div>

                            </div>


                            <form
                                className="project-form"
                                onSubmit={handleSubmit}
                            >


                                {/* PROJECT NAME */}

                                <div className="project-form-group">

                                    <label htmlFor="projectName">
                                        Project Name
                                    </label>

                                    <input
                                        id="projectName"
                                        type="text"
                                        placeholder="Enter project name"
                                        value={projectName}
                                        onChange={(event) =>
                                            setProjectName(
                                                event.target.value
                                            )
                                        }
                                        required
                                    />

                                </div>


                                {/* DESCRIPTION */}

                                <div className="project-form-group">

                                    <label htmlFor="projectDescription">
                                        Description
                                    </label>

                                    <textarea
                                        id="projectDescription"
                                        placeholder="Describe your project"
                                        value={description}
                                        onChange={(event) =>
                                            setDescription(
                                                event.target.value
                                            )
                                        }
                                        required
                                    />

                                </div>


                                {/* STATUS + MEMBERS */}

                                <div className="project-form-row">


                                    <div className="project-form-group">

                                        <label htmlFor="projectStatus">
                                            Status
                                        </label>

                                        <select
                                            id="projectStatus"
                                            value={status}
                                            onChange={(event) =>
                                                setStatus(
                                                    event.target.value
                                                )
                                            }
                                        >

                                            <option value="Active">
                                                Active
                                            </option>

                                            <option value="In Progress">
                                                In Progress
                                            </option>

                                        </select>

                                    </div>


                                    <div className="project-form-group">

                                        <label htmlFor="projectMembers">
                                            Team Members
                                        </label>

                                        <input
                                            id="projectMembers"
                                            type="number"
                                            min="1"
                                            value={members}
                                            onChange={(event) =>
                                                setMembers(
                                                    event.target.value
                                                )
                                            }
                                        />

                                    </div>

                                </div>


                                {/* CREATE */}

                                <button
                                    type="submit"
                                    className="save-project-button"
                                >
                                    Create Project
                                </button>


                            </form>

                        </section>

                    )}


                    {/* =========================
                        SEARCH + FILTER
                    ========================= */}

                    <section className="projects-toolbar">


                        <div className="search-box">

                            <span>
                                ⌕
                            </span>

                            <input
                                type="text"
                                placeholder="Search projects..."
                                value={searchTerm}
                                onChange={(event) =>
                                    setSearchTerm(
                                        event.target.value
                                    )
                                }
                            />

                        </div>


                        <select
                            className="project-filter"
                            value={filterStatus}
                            onChange={(event) =>
                                setFilterStatus(
                                    event.target.value
                                )
                            }
                        >

                            <option value="all">
                                All Projects
                            </option>

                            <option value="active">
                                Active
                            </option>

                            <option value="progress">
                                In Progress
                            </option>

                        </select>


                    </section>


                    {/* =========================
                        PROJECT GRID
                    ========================= */}

                    <section className="projects-grid">


                        {filteredProjects.length > 0 ? (

                            filteredProjects.map((project) => {


                                // Calculate LIVE progress

                                const projectProgress =
                                    getProjectProgress(
                                        project.id
                                    );


                                // Calculate task count

                                const projectTasks =
                                    tasks.filter(
                                        (task) =>
                                            task.projectId ===
                                            project.id
                                    );


                                const completedTasks =
                                    projectTasks.filter(
                                        (task) =>
                                            task.completed
                                    ).length;


                                return (

                                    <article
                                        className="project-card"
                                        key={project.id}
                                    >


                                        {/* CARD TOP */}

                                        <div className="project-card-top">


                                            <div className="project-card-icon">

                                                {project.name
                                                    .charAt(0)
                                                    .toUpperCase()}

                                            </div>


                                            <span
                                                className={`project-status ${
                                                    project.status ===
                                                    "Active"
                                                        ? "active"
                                                        : "progress"
                                                }`}
                                            >

                                                {project.status}

                                            </span>


                                        </div>


                                        {/* NAME */}

                                        <h2>
                                            {project.name}
                                        </h2>


                                        {/* DESCRIPTION */}

                                        <p className="project-description">

                                            {project.description}

                                        </p>


                                        {/* PROGRESS */}

                                        <div className="project-progress">


                                            <div className="progress-header">

                                                <span>
                                                    Progress
                                                </span>

                                                <strong>
                                                    {projectProgress}%
                                                </strong>

                                            </div>


                                            <div className="progress-bar">

                                                <div
                                                    className="progress-fill"
                                                    style={{
                                                        width:
                                                            `${projectProgress}%`
                                                    }}
                                                />

                                            </div>


                                            <small
                                                style={{
                                                    display: "block",
                                                    marginTop: "6px",
                                                    color: "#64748b",
                                                    fontSize: "11px"
                                                }}
                                            >
                                                {completedTasks}
                                                {" "}
                                                of
                                                {" "}
                                                {projectTasks.length}
                                                {" "}
                                                tasks completed
                                            </small>


                                        </div>


                                        {/* FOOTER */}

                                        <div className="project-card-footer">


                                            <span>
                                                👥 {project.members}
                                                {" "}
                                                members
                                            </span>


                                            <Link
                                                to={`/projects/${project.id}`}
                                                className="project-link"
                                            >
                                                View Project →
                                            </Link>


                                        </div>


                                    </article>

                                );

                            })

                        ) : (

                            <div
                                className="empty-state"
                                style={{
                                    gridColumn: "1 / -1"
                                }}
                            >

                                <h3>
                                    No Projects Found
                                </h3>

                                <p>
                                    Try changing your search
                                    or filter.
                                </p>

                            </div>

                        )}


                    </section>


                </main>

            </div>

        </div>

    );

}


export default Projects;