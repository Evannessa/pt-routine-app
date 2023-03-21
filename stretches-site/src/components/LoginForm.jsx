import React, { useCallback, useState, useEffect } from "react";

import { requests, urls } from "../helpers/requests";
const { urlBase } = urls;

/**
 * Code originally from this tutorial https://codeshack.io/basic-login-system-nodejs-express-mysql/
 * @returns ReactComponent
 */
function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) return;
        const user = { email, password };

        try {
            const url = `${urlBase}/auth/login`;
            // const url = `/api/v1/auth/login`;
            await fetch(url, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(user),
            });
            setPassword("");
            setEmail("");
        } catch (error) {
            console.log(error);
        }
    };

    const fetchTesting = async () => {
        const url = `${urlBase}/`;
        // const url = `/api/v1`;
        await fetch(url);
    };
    const fetchLogout = async () => {
        const url = `${urlBase}/auth/logout`;
        // const url = `/api/v1/auth/logout`;
        await fetch(url);
    };

    return (
        <>
            <form className="form" onSubmit={handleSubmit}>
                <h4>login form</h4>
                <div className="form-row">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-input email-input"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-row">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        className="form-input password-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-block submit-btn">
                    submit
                </button>
            </form>
            <div className="container">
                <button className="btn testing-btn" onClick={fetchTesting}>
                    Testing
                </button>
                <button className="btn logout-btn" onClick={fetchLogout}>
                    Logout
                </button>
            </div>
        </>
    );
}

export default LoginForm;