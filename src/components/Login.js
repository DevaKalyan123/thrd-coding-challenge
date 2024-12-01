import React, { useState } from "react";
import "./Login.css";

const Login = ({ onLogin, users }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility

    const handleLogin = () => {
        const user = users.find(
            (u) => u.Username === username && u.Password === password
        );

        if (user) {
            onLogin(user);
        } else {
            setError("Invalid credentials. Please try again.");
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="login-page">
            <div className="circle circle-1"></div>
            <div className="circle circle-2"></div>
            <div className="circle circle-3"></div>
            <div className="login-container">
                <h2 className="login-title">Login</h2>
                <form className="login-form" onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="login-input"
                    />
                    <div className="password-container">
                        <input
                            type={passwordVisible ? "text" : "password"} // Toggle between text and password input
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="login-input password-input"
                        />
                        <span
                            className="eye-icon"
                            onClick={togglePasswordVisibility}
                        >
                            {passwordVisible ? "🙈" : "👁️"} {/* Toggle icon */}
                        </span>
                    </div>
                    <button onClick={handleLogin} className="login-button">
                        Login
                    </button>
                    {error && <p className="error-message">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Login;
