import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axios";
import "../assets/css/publicView.css";

export default function SurveyPublicView() {
    const [survey, setSurvey] = useState({});
    const [loading, setLoadiing] = useState(null);
    const { slug } = useParams();
    useEffect(() => {
        setLoadiing(false);
        axiosClient.get(`/survey/get-by-slug/${slug}`).then((response) => {
            console.log(response.data);

            setLoadiing(true);
            setSurvey(response.data.data);
        });
    }, []);
    return (
        <>
            {loading && (
                <div className="container">
                    <div className="row">
                        <div className="col image-container d-flex justify-content-center">
                            <img src={survey.image} alt="" className="image" />
                        </div>
                    </div>
                    <div className="row text-center">
                        <div className="col-x-lg ">
                            <h4>{survey.title}</h4>
                        </div>
                        <div className="col-x-lg">
                            <p>{survey.description}</p>
                        </div>
                        <div className="col-x-lg">
                            <p>expire_date:{survey.expire_date}</p>
                        </div>
                    </div>
                    <div className="row text-center">
                        <div className="col-x-l">
                            <h4>Question</h4>
                        </div>
                        {survey.question &&
                            survey.question.map((el, index) => {
                                return (
                                    <div className="col-x-l" key={index}>
                                        <h6>{el.question}</h6>
                                        <p>{el.description}</p>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            )}
            {!loading && (
                <div className="load-container">
                    <div className="loading">
                        <div className="small"></div>
                    </div>
                </div>
            )}
        </>
    );
}
