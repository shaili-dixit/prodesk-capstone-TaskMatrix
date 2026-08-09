# TaskMatrix

## Project Overview

TaskMatrix is an Agile project management platform designed to help teams organize projects, manage tasks, track progress, and collaborate through a centralized workspace.

The application provides a structured workspace where users can authenticate, view project information, create and manage projects, and manage tasks associated with individual projects.

---

## Tech Stack

### Frontend

- React
- React Router DOM
- React Context API
- React Hooks
- CSS
- Vite

### State Management

- React Context API
- React Hooks

### Development & Design Tools

- Git
- GitHub
- VS Code
- Figma
- Draw.io

---

## Core Features

### P0 — Mandatory

The following features form the core functional MVP of TaskMatrix:

- Mock user authentication
- Protected application routes
- Project dashboard
- Project creation
- Project listing
- Dynamic project details
- Task creation
- Task completion
- Task deletion
- Global project state management
- Global task state management
- Responsive frontend layout

### P1 — Priority

The following features are planned as future enhancements:

- Team management
- Task search and filtering
- Detailed task management
- Project analytics
- Due-date management

### P2 — Stretch

The following features are considered future optimization and expansion areas:

- Notifications
- Activity history
- Role-based access control
- Real-time updates
- Dark mode
- Advanced analytics

---

## Application Architecture

TaskMatrix follows a component-based React architecture with centralized state management using React Context API.

The application is organized into:

- Components
- Pages
- Context
- Routes
- Services

### High-Level Architecture

```text
                        TaskMatrix
                            |
                -------------------------
                |                       |
            React App              React Router
                |                       |
        -----------------       ------------------
        |       |       |       |        |       |
       Auth   Project  Task   Login   Dashboard  Projects
     Context Context Context                    |
                                                |
                                         Project Details

```

### Project Structure

```

src/
│
├── components/
│   ├── Navbar.jsx
│   ├── ProjectCard.jsx
│   ├── Sidebar.jsx
│   └── TaskCard.jsx
│
├── context/
│   ├── AuthContext.jsx
│   ├── ProjectContext.jsx
│   └── TaskContext.jsx
│
├── pages/
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   ├── Login.css
│   ├── NotFound.jsx
│   ├── ProjectDetails.jsx
│   ├── Projects.jsx
│   └── Dashboard.css
│
├── routes/
│   └── ProtectedRoute.jsx
│
├── services/
│   └── api.js
│
├── App.jsx
├── App.css
└── main.jsx

```

### Routing Architecture

TaskMatrix uses react-router-dom for client-side navigation.

```
| Route                  | Description                  | Access    |
| ---------------------- | ---------------------------- | --------- |
| `/login`               | Authentication screen        | Public    |
| `/dashboard`           | Main workspace dashboard     | Protected |
| `/projects`            | Project listing and creation | Protected |
| `/projects/:projectId` | Dynamic project details      | Protected |

```
### Route Flow

```

/login
   |
   | Successful Login
   ↓
/dashboard
   |
   ├── /projects
   │       |
   │       └── /projects/:projectId
   |
   └── Other protected workspace routes

```

### UI/UX Design

The TaskMatrix interface was designed in Figma before implementation.
The wireframes cover the following core views:

-Authentication Screen
-Main Dashboard
-Project Details View

### Figma Design

Public Figma File:
https://www.figma.com/design/gwtIKDMzVDS2JLTByDc71i/TaskMatrix-%E2%80%94-Agile-Project-Management?node-id=1-111&t=pmfyZZ5kdlu16I4Y-1


### System Architecture Diagrams
#### Entity Relationship Diagram

The ERD defines the planned MongoDB data model and relationships between the major entities of the TaskMatrix system.

#### Frontend State Tree

The State Tree defines the planned global frontend state structure and the responsibilities of the different application state domains.

### Mock API Endpoints

The following REST endpoints define the planned API architecture for the TaskMatrix application.

These endpoints represent the intended backend contract and are included as part of the system architecture documentation.

### Authentication

```
| Method | Endpoint             | Purpose                 |
| ------ | -------------------- | ----------------------- |
| POST   | `/api/auth/login`    | Authenticate a user     |
| POST   | `/api/auth/register` | Register a new user     |
| POST   | `/api/auth/logout`   | Logout the current user |

```

### Projects

```

| Method | Endpoint            | Purpose                     |
| ------ | ------------------- | --------------------------- |
| GET    | `/api/projects`     | Retrieve all projects       |
| GET    | `/api/projects/:id` | Retrieve a specific project |
| POST   | `/api/projects`     | Create a new project        |
| PUT    | `/api/projects/:id` | Update an existing project  |
| DELETE | `/api/projects/:id` | Delete a project            |

```

### Tasks

```

| Method | Endpoint                         | Purpose                      |
| ------ | -------------------------------- | ---------------------------- |
| GET    | `/api/projects/:projectId/tasks` | Retrieve tasks for a project |
| POST   | `/api/projects/:projectId/tasks` | Create a task                |
| PUT    | `/api/tasks/:id`                 | Update a task                |
| DELETE | `/api/tasks/:id`                 | Delete a task                |
 
```
### Application Views

#### Authentication

The authentication screen provides a user login interface and establishes the application's authentication state.

#### Dashboard

The dashboard provides an overview of:

-Active projects
-Total tasks
-Completed tasks
-Pending tasks
-Recent projects
-User tasks

#### Projects

The Projects view allows users to:

-View available projects
-Create new projects
-View project progress
-View team member count
-Navigate to project details

#### Project Details

The Project Details view provides:

-Project information
-Project progress
-Team member information
-Project task count
-Completed task count
-Task creation
-Task completion
-Task deletion
-State Management Flow
-Authentication

### Project Status
#### Frontend MVP — Implemented

Current implementation includes:

-Authentication flow
-Protected routes
-Dashboard
-Project management
-Dynamic project details
-Task management
-Global project state
-Global task state
-Responsive UI
-React Router based navigation
-Design & Architecture — Completed
-Product Requirements Documentation
-Figma wireframes
-Entity Relationship Diagram
-Frontend State Tree Diagram
-Mock API endpoint documentation

### Future Development

Backend services, database integration, production authentication, and additional enterprise features can be implemented in future development phases.

### Repository

### GitHub Repository:
https://github.com/shaili-dixit/prodesk-capstone-TaskMatrix.git

#### Author

Shaili Dixit
B.Tech — Computer Science & Engineering