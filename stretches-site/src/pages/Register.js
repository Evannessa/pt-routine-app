import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { ThemeContext } from "../App";
import { Link } from "react-router-dom";
import FormRow from "../components/FormRow";
import axios from "axios";
import useLocalState from "../helpers/localState";
import { Wrapper } from "./Login";
import Alert from "../components/Alert";

function Register() {
    const { theme } = React.useContext(ThemeContext);
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
    });

    const { alert, showAlert, loading, setLoading, success, setSuccess, hideAlert } = useLocalState();

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        hideAlert();
        setLoading(true);
        const { name, email, password } = values;
        const registerNewUser = { name, email, password };

        try {
            const { data } = await axios.post(`http://localhost:3000/api/auth/register`, registerNewUser);

            setSuccess(true);
            setValues({ name: "", email: "", password: "" });
            showAlert({ text: data.msg, type: "success" });
        } catch (error) {
            console.log(error);
            const { msg } = error.response.data;
            showAlert({ text: msg || "there was an error" });
        }
        setLoading(false);
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <Wrapper className="page">
                    {alert.show && (
                        <Alert type={alert.type} className={`alert alert-${alert.type}`}>
                            {alert.text}
                        </Alert>
                    )}
                    {!success && (
                        <form className={loading ? "form form-loading" : "form"} onSubmit={onSubmit}>
                            {/* single form row */}
                            <h1>Register</h1>

                            <FormRow type="name" name="name" value={values.name} handleChange={handleChange} />

                            {/* single form row */}
                            <FormRow type="email" name="email" value={values.email} handleChange={handleChange} />
                            {/* end of single form row */}
                            {/* single form row */}
                            <FormRow
                                type="password"
                                name="password"
                                value={values.password}
                                handleChange={handleChange}
                            />
                            {/* end of single form row */}
                            <button type="submit" className="btn btn-block" disabled={loading}>
                                {loading ? "Loading..." : "Register"}
                            </button>
                            <p>
                                Already a have an account?
                                <Link to="/login" className="login-link">
                                    Log In
                                </Link>
                            </p>
                        </form>
                    )}
                </Wrapper>
            </ThemeProvider>
        </>
    );
}

const _Wrapper = styled.section`
    background-color: white;
    p,
    h2,
    h3,
    h4,
    span {
        color: black;
    }

    .alert {
        margin-top: 3rem;
        margin-bottom: -1.5rem;
    }
    h4 {
        text-align: center;
    }
    p {
        margin: 0;
        margin-top: 1rem;
        text-align: center;
    }
    .login-link {
        display: inline-block;
        margin-left: 0.25rem;
        text-transform: capitalize;
        color: var(--primary-500);
        cursor: pointer;
    }
    .btn:disabled {
        cursor: not-allowed;
    }
`;

export default Register;
