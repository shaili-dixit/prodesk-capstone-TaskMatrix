import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useProjects } from "../context/ProjectContext";
import "./Projects.css";

function Projects() {
    const { projects, addProject } = useProjects();

    const [showForm, setShowForm] = useState(false);

    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("Active");
    const [members, setMembers] = useState(1);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!projectName.trim() || !description.trim()) {
            return;
        }

        addProject({
            name: projectName.trim(),
            description: description.trim(),
            status,
            progress: 0,
            members: Number(members),
        });

        setProjectName("");
        setDescription("");
        setStatus("Active");
        setMembers(1);
        setShowForm(false);
    };

    return (
        <div className="projects-page">

            <Navbar />

            <div className="projects-layout">

                <Sidebar />

                <main className="projects-main">

                    <section className="projects-header">

                        <div>
                            <p className="projects-label">
                                WORKSPACE
                            </p>

                            <h1>Projects</h1>

                            <p>
                                Manage and track all your projects
                                from one place.
                            </p>
                        </div>

                        <button
                            className="primary-button"
                            onClick={() => setShowForm(!showForm)}
                        >
                            {showForm
                                ? "Cancel"
                                : "+ New Project"}
                        </button>

                    </section>


                    {/* CREATE PROJECT FORM */}

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


                                <button
                                    type="submit"
                                    className="save-project-button"
                                >
                                    Create Project
                                </button>

                            </form>

                        </section>
                    )}


                    {/* PROJECT TOOLBAR */}

                    <section className="projects-toolbar">

                        <div className="search-box">

                            <span>⌕</span>

                            <input
                                type="text"
                                placeholder="Search projects..."
                            />

                        </div>


                        <select className="project-filter">

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


                    {/* PROJECT GRID */}

                    <section className="projects-grid">

                        {projects.map((project) => (

                            <article
                                className="project-card"
                                key={project.id}
                            >

                                <div className="project-card-top">

                                    <div className="project-card-icon">
                                        {project.name
                                            .charAt(0)
                                            .toUpperCase()}
                                    </div>

                                    <span
                                        className={`project-status ${project.status === "Active"
                                                ? "active"
                                                : "progress"
                                            }`}
                                    >
                                        {project.status}
                                    </span>

                                </div>


                                <h2>
                                    {project.name}
                                </h2>

                                <p className="project-description">
                                    {project.description}
                                </p>


                                <div className="project-progress">

                                    <div className="progress-header">

                                        <span>
                                            Progress
                                        </span>

                                        <strong>
                                            {project.progress}%
                                        </strong>

                                    </div>

                                    <div className="progress-bar">

                                        <div
                                            className="progress-fill"
                                            style={{
                                                width: `${project.progress}%`
                                            }}
                                        />

                                    </div>

                                </div>


                                <div className="project-card-footer">

                                    <span>
                                        👥 {project.members} members
                                    </span>

                                    <Link
                                        to={`/projects/${project.id}`}
                                        className="project-link"
                                    >
                                        View Project →
                                    </Link>
                                </div>

                            </article>

                        ))}

                    </section>

                </main>

            </div>

        </div>
    );
}

export default Projects;