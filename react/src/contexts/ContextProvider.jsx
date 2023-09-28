import React, { createContext, useState, useContext, useEffect } from "react";
import data from "../assets/jsonfile/data.json";
import axiosClient from "../axios";

const StateContext = createContext({
    currentUser: {},
    setCurrentUser: () => {},
    userToken: null,
    setUserToken: () => {},
    questionTypes: [],
    notification: {
        messsage: null,
        show: false,
    },
    setNotification: () => {},
});
// create dummy data for creating a app

let tmpData = data;

export const ContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});
    const [userToken, _setUserToken] = useState(localStorage.getItem("TOKEN"));
    const [surveys, _setSurveys] = useState(tmpData);
    const [questionTypes] = useState([
        "text",
        "select",
        "radio",
        "checkbox",
        "textarea",
    ]);
    const [notification, _setNotification] = useState({
        messsage: null,
        show: false,
    });
    const setNotification = (val)=>{
        _setNotification(val);
    }
    const setUserToken = (token) => {
        if (token) {
            localStorage.setItem("TOKEN", token);
        } else {
            localStorage.removeItem("TOKEN");
        }
        _setUserToken(token);
    };
    return (
        <StateContext.Provider
            value={{
                currentUser,
                setCurrentUser,
                userToken,
                setUserToken,
                surveys,
                questionTypes,
                notification,
                setNotification,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
