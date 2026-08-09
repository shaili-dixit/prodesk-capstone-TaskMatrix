import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {

    const { user, logout } = useAuth();

    return (
        <header className="navbar">

            <div className="navbar-brand">
                <div className="navbar-logo">
                    TM
                </div>

                <h2>TaskMatrix</h2>
            </div>


            <div className="navbar-right">

                <button
                    className="notification-button"
                    title="Notifications"
                >
                    🔔
                </button>


                <div className="navbar-user">

                    <div className="user-avatar">
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>

                    <div className="user-info">

                        <span className="user-name">
                            {user?.name || "User"}
                        </span>

                        <span className="user-role">
                            Team Member
                        </span>

                    </div>

                </div>


                <button
                    className="logout-button"
                    onClick={logout}
                >
                    Logout
                </button>

            </div>

        </header>
    );
}

export default Navbar;