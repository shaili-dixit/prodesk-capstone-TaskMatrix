import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import "./Login.css";

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {

        event.preventDefault();

        login(email);

        navigate("/dashboard");
    };

    return (
        <main className="login-page">

            <section className="login-card">

                <div className="login-brand">

                    <div className="brand-mark">
                        TM
                    </div>

                    <h1>TaskMatrix</h1>

                    <p>
                        Agile Project Management
                    </p>

                </div>

                <div className="login-content">

                    <h2>Welcome Back</h2>

                    <p className="login-subtitle">
                        Sign in to continue to your workspace
                    </p>

                    <form
                        className="login-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="form-group">

                            <label htmlFor="email">
                                Email
                            </label>

                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label htmlFor="password">
                                Password
                            </label>

                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                required
                            />

                        </div>

                        <button
                            type="submit"
                            className="login-button"
                        >
                            Login
                        </button>

                    </form>

                    <p className="signup-text">
                        Don't have an account?

                        <Link to="/register">
                            {" "}Sign Up
                        </Link>
                    </p>

                </div>

            </section>

        </main>
    );
}

export default Login;