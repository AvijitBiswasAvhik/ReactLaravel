import { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from ".././axios.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";
// Simple functional component
function Login() {
    const {setCurrentUser, setUserToken} = useStateContext();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');
    localStorage.getItem('TOKEN')
    const onSubmit = (event) => {
        event.preventDefault();
        axiosClient
            .post("/login", {
                email: email,
                password: password,
            })
            .then((response) => {  
                
                setUserToken(response.data.token)
            })
            .catch((error) => {
                if (error.response) {
                    let finalsError = Object.values(
                        error.response.data
                    )[1];
                    let finalError = Object.entries(finalsError).reduce(
                        (acc, [key, value]) => {

                            acc[key] = value[0];
                            return acc;
                        },[]
                    );
                    setError(finalError)                    
                }
            });
    };

    return (
        <>
            {" "}
            <div className="text-center">
                <h3 className="fw-bold">Login to your account</h3>
                <p>
                    Or{" "}
                    <span className="text-primary">
                        {" "}
                        <Link to="/signup" className="text-decoration-none">
                            Create a new account
                        </Link>
                    </span>
                </p>
            </div>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                        aria-describedby="emailHelp"
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
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                    />
                    {error["password"] && (
                        <div className="form-text text-danger">
                            {error["password"]}{" "}
                        </div>
                    )}
                </div>
                <div
                    className="mb-3"
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <div className="chek">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="exampleCheck1"
                        />
                        <label
                            className="form-check-label"
                            htmlFor="exampleCheck1"
                        >
                            Remember me
                        </label>
                    </div>
                    <div className="forgot">
                        <a href="" className="text-decoration-none">
                            <h6>Forgot your password?</h6>
                        </a>
                    </div>
                </div>
                <button
                    type="submit"
                    className="btn btn-primary w-100"
                    onClick={(event) => {
                        onSubmit(event);
                    }}
                >
                    Submit
                </button>
            </form>
        </>
    );
}

export default Login;
