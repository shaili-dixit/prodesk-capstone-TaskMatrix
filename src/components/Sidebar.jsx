import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {

    return (
        <aside className="sidebar">

            <nav className="sidebar-nav">

                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        `sidebar-link ${isActive ? "active" : ""}`
                    }
                >
                    <span>▦</span>
                    Dashboard
                </NavLink>


                <NavLink
                    to="/projects"
                    className={({ isActive }) =>
                        `sidebar-link ${isActive ? "active" : ""}`
                    }
                >
                    <span>▣</span>
                    Projects
                </NavLink>


                <NavLink
                    to="/projects"
                    className="sidebar-link"
                >
                    <span>✓</span>
                    Tasks
                </NavLink>


                <NavLink
                    to="/dashboard"
                    className="sidebar-link"
                >
                    <span>♙</span>
                    Team
                </NavLink>


                <NavLink
                    to="/dashboard"
                    className="sidebar-link"
                >
                    <span>⚙</span>
                    Settings
                </NavLink>

            </nav>

        </aside>
    );
}

export default Sidebar;