import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useProjects } from "../context/ProjectContext";
import "./Projects.css";

function Projects() {
    const { projects } = useProjects();

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

                        <button className="primary-button">
                            + New Project
                        </button>

                    </section>


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
                                        className={`project-status ${
                                            project.status === "Active"
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