import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import "./Navbar.css";

function Navbar() {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <nav className="navbar">

            <div className="navbar-brand">
                <NavLink to="/">
                    ClickRush
                </NavLink>
            </div>

            <div className="navbar-links">

                <NavLink to="/">
                    Home
                </NavLink>

                {isAuthenticated && (
                    <>
                        <NavLink to="/games">
                            Play
                        </NavLink>

                        <NavLink to="/leaderboard">
                            Leaderboard
                        </NavLink>

                        <NavLink to="/profile">
                            Profile
                        </NavLink>

                        <button
                            className="navbar-logout"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </>
                )}

                {!isAuthenticated && (
                    <>
                        <NavLink to="/login">
                            Login
                        </NavLink>

                        <NavLink to="/signup">
                            Signup
                        </NavLink>
                    </>
                )}

            </div>

        </nav>
    );
}

export default Navbar;