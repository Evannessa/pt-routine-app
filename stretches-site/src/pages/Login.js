import React, { useState } from "react";
import styled, { css, ThemeProvider } from "styled-components";
import { ThemeContext } from "../App";
import { Link, useNavigate } from "react-router-dom";
import FormRow from "../components/FormRow";
import { useGlobalContext } from "../context";
import useLocalState from "../helpers/localState";

import axios from "axios";
import { device } from "../components/styled-components/devices";

function Login() {
    const { theme } = React.useContext(ThemeContext);
    const { saveUser } = useGlobalContext();
    const history = useNavigate();
    const [values, setValues] = useState({
        email: "",
        password: "",
    });
    const { alert, showAlert, loading, setLoading, hideAlert } = useLocalState();

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        hideAlert();
        setLoading(true);
        const { email, password } = values;
        const loginUser = { email, password };
        try {
            const { data } = await axios.post(`http://localhost:3000/api/auth/login`, loginUser);
            setValues({ name: "", email: "", password: "" });
            showAlert({
                text: `Welcome, ${data.user.name}. Redirecting to dashboard...`,
                type: "success",
            });
            setLoading(false);
            saveUser(data.user);
            history("/dashboard");
            // return redirect('/dashboard')
            // history.push('/dashboard');
        } catch (error) {
            showAlert({ text: error.response?.data.msg });
            setLoading(false);
        }
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <Wrapper className="page">
                    {alert.show && <div className={`alert alert-${alert.type}`}>{alert.text}</div>}
                    <form className={loading ? "form form-loading" : "form"} onSubmit={onSubmit}>
                        <h1>Login</h1>
                        {/* single form row */}

                        <FormRow
                            type="email"
                            name="email"
                            value={values.email}
                            handleChange={handleChange}
                            theme={theme}
                        />
                        {/* end of single form row */}
                        {/* single form row */}
                        <FormRow
                            type="password"
                            name="password"
                            value={values.password}
                            handleChange={handleChange}
                            theme={theme}
                        />
                        {/* end of single form row */}
                        <button type="submit" className="btn btn-block" disabled={loading}>
                            {loading ? "Loading..." : "Login"}
                        </button>
                        <p>
                            Don't have an account?
                            <Link to="/register" className="register-link">
                                Register
                            </Link>
                        </p>
                        <p>
                            Forgot your password?{" "}
                            <Link to="/forgot-password" className="reset-link">
                                Reset Password
                            </Link>
                        </p>
                    </form>
                </Wrapper>
            </ThemeProvider>
        </>
    );
}

export const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    background-color: white;
    @media ${device.tablet} {
        width: clamp(200px, 50vw, 300px);
    }
    margin-right: auto;
    margin-left: auto;
    margin-bottom: auto;
    margin-top: auto;
    border-radius: 10px;
    padding: clamp(2rem, 2rem + 1vw, 3rem);
    form {
        display: flex;
        flex-direction: column;
        > * + * {
            margin-top: 2rem;
        }
    }
    .alert {
        margin-top: 3rem;
    }
    h1 {
        color: ${(props) => props.theme.color1};
        text-align: center;
        font-size: large;
    }
    h4 {
        text-align: center;
    }
    p {
        margin: 0;
        text-align: center;
        font-size: small;
        color: hsla(0, 0, 0, 100%);
    }
    p,
    h2,
    h3,
    h4,
    span {
        color: hsl(251, 15%, 21%);
    }
    .btn {
        margin-top: 3.5rem;
        margin-bottom: 1.5rem;
        ${(props) =>
            css`
                --color-1: ${props.theme.color1};
                --color-2: ${props.theme.color2};
                background: linear-gradient(-45deg, var(--color-1), var(--color-2));
            `}
        transform: scale(1);
        transition: transform 200ms ease-in;
        &:hover {
            transform: scale(1.05);
        }
        color: white;
        width: 100%;
    }
    .register-link,
    .reset-link {
        display: inline-block;
        margin-left: 0.25rem;
        text-transform: capitalize;
        color: ${(props) => props.theme.color2};
        cursor: pointer;
    }
    .reset-link {
        margin-top: 0.25rem;
    }
    .btn:disabled {
        cursor: not-allowed;
    }
`;

export default Login;
