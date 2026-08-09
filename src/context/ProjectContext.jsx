import { createContext, useContext, useState } from "react";

const ProjectContext = createContext();

export function ProjectProvider({ children }) {

    const [projects, setProjects] = useState([
        {
            id: 1,
            name: "Website Redesign",
            description: "Redesign and development of the company website.",
            status: "Active",
            progress: 65,
            members: 4,
        },
        {
            id: 2,
            name: "Mobile Application",
            description: "Development of the TaskMatrix mobile application.",
            status: "In Progress",
            progress: 40,
            members: 6,
        },
        {
            id: 3,
            name: "Analytics Dashboard",
            description: "Business analytics and reporting dashboard.",
            status: "Active",
            progress: 80,
            members: 3,
        },
    ]);

    const addProject = (project) => {
        const newProject = {
            ...project,
            id: Date.now(),
        };

        setProjects((currentProjects) => [
            ...currentProjects,
            newProject,
        ]);
    };

    const deleteProject = (projectId) => {
        setProjects((currentProjects) =>
            currentProjects.filter(
                (project) => project.id !== projectId
            )
        );
    };

    const updateProject = (projectId, updatedData) => {
        setProjects((currentProjects) =>
            currentProjects.map((project) =>
                project.id === projectId
                    ? { ...project, ...updatedData }
                    : project
            )
        );
    };

    return (
        <ProjectContext.Provider
            value={{
                projects,
                addProject,
                deleteProject,
                updateProject,
            }}
        >
            {children}
        </ProjectContext.Provider>
    );
}

export function useProjects() {
    return useContext(ProjectContext);
}