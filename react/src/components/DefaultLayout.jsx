import React, { useState, useEffect } from "react";
import { Outlet, Navigate, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios";
import "../assets/css/defaultlayout.css";

function DefaultLayoutComponent() {
    const [show, setShow] = useState(false);
    const {
        userToken,
        currentUser,
        setCurrentUser,
        setUserToken,
        notification,
        setNotification,
    } = useStateContext();

    useEffect(() => {
        if (userToken != null) {
            axiosClient.get("/user").then((response) => {
                setCurrentUser(response.data);
            });
        }
    }, []);

    if (userToken == null) {
        return <Navigate to="/login" />;
    }

    const toggleProfile = () => {
        setShow(!show);
    };

    const signOut = () => {
        axiosClient.post("/logout").then((response) => {
            if (response.data.message) {
                setCurrentUser({});
                setUserToken(null);
            }
        });
    };

    // show notification with animation
    setTimeout(() => {
        if(notification.show === true){
            setNotification({...notification, show: false});
        }
    },4000)
    return (
        <>
            <nav
                className="navbar navbar-expand-lg"
                style={{ backgroundColor: "#d4d4d4" }}
            >
                <div className="container-fluid">
                    <p className="profile-img" onClick={toggleProfile}>
                        <img
                            src="/public/IMG_20221021_082201.jpg"
                            style={{
                                height: "35px",
                                width: "35px",
                                objectFit: "cover",
                                borderRadius: "50%",
                            }}
                            alt="Profile"
                        />
                        {currentUser.name}
                    </p>
                    {show && (
                        <div className="sing-out" onClick={signOut}>
                            <span>Sign Out</span>
                        </div>
                    )}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to={"/"}>
                                    <img
                                        src="/public/dashboard.png"
                                        alt=""
                                        style={{ width: "25px" }}
                                    />
                                    Dashboard
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="surveys/">
                                    <img
                                        src="/public/survey.png"
                                        alt=""
                                        style={{ width: "25px" }}
                                    />
                                    Surveys
                                </NavLink>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                            />
                            <button
                                className="btn btn-outline-success"
                                type="submit"
                            >
                                Search
                            </button>
                        </form>
                    </div>
                </div>
            </nav>
            <Outlet />
            {notification.show && (
                <div className="notification" id="notification">
                    {notification.message}
                </div>
            )}
        </>
    );
}

export default DefaultLayoutComponent;
