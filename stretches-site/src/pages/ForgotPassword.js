import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import FormRow from "../components/FormRow";
import axios from "axios";
import useLocalState from "../helpers/localState";
import Alert from "../components/Alert";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const { alert, showAlert, loading, setLoading, success, setSuccess, hideAlert } = useLocalState();

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        hideAlert();
        if (!email) {
            showAlert({
                text: "Please provide email",
            });
            setLoading(false);
            return;
        }
        try {
            const { data } = await axios.post("/api/auth/forgot-password", {
                email,
            });
            showAlert({ text: data.msg, type: "success" });
            setSuccess(true);
        } catch (error) {
            showAlert({
                text: "Something went wrong, please try again",
            });
            setSuccess(true);
        }
        setLoading(false);
    };
    return (
        <Wrapper className="page">
            {alert.show && (
                <Alert type={alert.type} className={`alert alert-${alert.type}`}>
                    {alert.text}
                </Alert>
            )}
            {!success && (
                <form className={loading ? "form form-loading" : "form"} onSubmit={handleSubmit}>
                    <h4>Forgot password</h4>
                    {/* single form row */}
                    <FormRow type="email" name="email" value={email} handleChange={handleChange} />
                    {/* end of single form row */}
                    <button type="submit" className="btn btn-block" disabled={loading}>
                        {loading ? "Please Wait..." : "Get Reset Password Link"}
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
    );
};

const Wrapper = styled.main`
    h4,
    p {
        text-align: center;
    }
    p {
        margin: 0;
        margin-top: 1rem;
    }
    .login-link {
        display: inline-block;
        margin-left: 0.25rem;
        text-transform: capitalize;
        color: var(--primary-500);
        cursor: pointer;
    }
`;

export default ForgotPassword;
