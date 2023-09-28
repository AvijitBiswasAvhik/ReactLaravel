import List from "./component/li";
import React, { useState, useEffect } from "react";
import PageComponent from "../components/PageComponent";
import axiosClient from "../axios";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/dashboard.css";

import {
    UserCircleIcon,
    LanguageIcon,
    PhotoIcon,
} from "@heroicons/react/24/solid";

const Dasboard = () => {
    const [data, setData] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        axiosClient.get(`/dashboard/`).then((response) => {
            setData(response.data);
        });
    }, []);
    const onEdith = (ev, id) => {
        ev.preventDefault();
        navigate(`/surveys/${id}`);
    };
    const onDelete = (ev, id) => {
        ev.preventDefault();
        axiosClient.delete(`/survey/${id}`);
        axiosClient.get(`/dashboard/`).then((response) => {
            setData(response.data);
        });
    };
    console.log(data)
    return (
        <>
            <PageComponent title={"Dashboard"}>
                {data && (
                <div className="main-container">
                    <div className="sub-container">
                        <div className="element element-1">
                            <div className="image-container">
                                <img src={data.latestSurvey.image} alt="" />
                            </div>
                            <div className="content">
                                <h4>Test Survey</h4>
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <td>Create Date</td>
                                            <td className="text-end">{data.latestSurvey.created_at}</td>
                                        </tr>
                                        <tr>
                                            <td>Expire Date</td>
                                            <td className="text-end">{data.latestSurvey.expire_date}</td>
                                        </tr>
                                        <tr>
                                            <td>Status</td>
                                            <td className="text-end">{data.latestSurvey.status ? 'Active' : 'Disable'}</td>
                                        </tr>
                                        <tr>
                                            <td>Total Survey</td>
                                            <td className="text-end">{data.totalSurvey}</td>
                                        </tr>
                                        <tr>
                                            <td>Total Question</td>
                                            <td className="text-end">{data.totalQuestion}</td>
                                        </tr>
                                        <tr>
                                            <td><button onClick={(ev)=>{onEdith(ev,data.latestSurvey.id)}} type="button" className="btn btn-outline-success">Edith</button></td>
                                            <td className="text-end"><button onClick={(ev)=>{onDelete(ev,data.latestSurvey.id)}} type="button" className="btn btn-outline-danger">Delete</button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="element element-2">
                            <div className="count">
                                <h4>Total Survey</h4>
                                <div className="count-item">
                                    {data.totalSurvey}
                                </div>
                            </div>
                            <div className="count">
                                <h4>Total Question</h4>
                                <div className="count-item">
                                    {data.totalQuestion}
                                </div></div>
                        </div>
                        <div className="element element-3">
                            {data.latestQuestions && data.latestQuestions.map((el,index)=>{
                                return (
                                    <div key={index} style={{height: '100px'}}>
                                        <h4>{el.question}</h4>
                                        <p>Answer Made at:{el.created_at}</p>
                                        <hr/>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                </div>
                    )}
            </PageComponent>
        </>
    );
};

export default Dasboard;
