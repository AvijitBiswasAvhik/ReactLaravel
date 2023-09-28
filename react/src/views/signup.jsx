// Simple functional component
import { useState } from "react";
import axiosClient from ".././axios.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider.jsx";

function Signup() {
    const {setCurrentUser, setUserToken} = useStateContext();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    // create function handle events
    const onSubmit = (event) => {
        event.preventDefault();

        axiosClient
            .post("/signup", {
                name: fullName,
                email: email,
                password: password,
                password_confirmation: confirmPassword,
            })
            .then((response) => {
                setCurrentUser(response.data.user);
                setUserToken(response.data.token);
                
            })
            .catch((error) => {
                if (error.response) {
                    const finalsError = Object.values(error.response.data)[1];

                    const finalError = Object.entries(finalsError).reduce(
                        (acc, [key, value]) => {
                            acc[key] = value[0];
                            return acc;
                        },
                        {}
                    );

                    setError(finalError);
                }
                // console.error(error);
            });
    };

    return (
        <>
            <div className="text-center">
                <h3 className="fw-bold">Sign up for free</h3>
                <p>
                    <Link to="/login" className="text-decoration-none">
                        Login with youre account
                    </Link>
                </p>
            </div>
            <form>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Full Name
                    </label>
                    <input
                        type="text"
                        required
                        className="form-control"
                        id="name"
                        placeholder="full name"
                        value={fullName}
                        onChange={(event) => {
                            setFullName(event.target.value);
                        }}
                    />
                    {error["name"] && (
                        <div className="form-text text-danger">
                            {error["name"]}
                        </div>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        required
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="email"
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                    />
                    {error["email"] ? (
                        <div className="form-text text-danger">
                            {error["email"]}
                        </div>
                    ) : (
                        <div id="emailHelp" className="form-text">
                            we never share youre email with anyone
                        </div>
                    )}
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                    >
                        Password
                    </label>
                    <input
                        required
                        type="password"
                        name="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="password"
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                    />
                    {error["password"] && (
                        <div className="form-text text-danger">
                            {error["password"]}
                        </div>
                    )}
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="password-confirmation"
                        className="form-label"
                    >
                        Re-Type Password
                    </label>
                    <input
                        required
                        type="password"
                        name="password_confirmation"
                        className="form-control"
                        id="password-confirmation"
                        placeholder="password confirmation"
                        onChange={(event) => {
                            setConfirmPassword(event.target.value);
                        }}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary w-100"
                    onClick={(event) => {
                        onSubmit(event);
                    }}
                >
                    Signup
                </button>
            </form>
        </>
    );
}

export default Signup;
