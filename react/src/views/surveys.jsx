import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import PageComponent from "../components/PageComponent";
import SurveyListComponent from "../components/SurveyListComponent";
import BButton from "../components/core/BButton";
import "../assets/css/card.css";
import axiosClient from "../axios";
import "../assets/css/surveys.css";

import {
    PencilIcon,
    ArrowTopRightOnSquareIcon,
    TrashIcon,
    PlusCircleIcon,
} from "@heroicons/react/24/outline";

const Surveys = () => {
    const [post, setPost] = useState([]);
    const location = useLocation();
    const { surveys, setSurveys, setNotification, notification } =
        useStateContext();
    let [links, setLinks] = useState("/survey");
    let [link, setLink] = useState("");

    //create method for delete survey
    const deleteSurvey = (ev, id) => {
        ev.preventDefault();
        if (window.confirm("Are you sure you want to delete")) {
            axiosClient.delete(`/survey/${id}`).then((response) => {});
            console.log("s");
            setNotification({
                message: "item deleted",
                show: true,
            });
        }

        axiosClient.get("/survey").then((response) => {
            setPost(response.data.data);
            setLinks({ ...response.data.links });
        });
    };

    // get post dynamically from serve
    useEffect(() => {
        axiosClient.get("/survey").then((response) => {
            setPost(response.data.data);
            setLinks({ ...response.data.links });
        });
    }, []);
    useEffect(() => {
        if (link != "") {
            axiosClient.get(link).then((response) => {
                setPost(response.data.data);
                setLinks({ ...response.data.links });
            });
        }
    }, [link]);

    const activeLink = () => {
        console.log(location.pathname);
    };
    // create a event on button component
    const onClickEvent = () => {
        console.log("deleted");
    };
    // css bject stle icon
    let iconStyle = {
        height: "20px",
        width: "20px",
    };

    return (
        <PageComponent
            title="Here the survey report"
            content="Hello, world"
            button={
                <BButton color="white" circle href="/surveys/create">
                    <PlusCircleIcon style={iconStyle} />
                    Create New
                </BButton>
            }
        >
            <div className="card-custom">
                {post.map((survey) => (
                    <SurveyListComponent survey={survey} key={survey.id}>
                        <div className="d-flex justify-content-between">
                            <BButton
                                color="white"
                                href={`/surveys/${survey.id}`}
                            >
                                <PencilIcon style={iconStyle}></PencilIcon>
                                Edith
                            </BButton>
                            <div className="link-delete d-flex justify-content-end">
                                <BButton
                                    to={`view/surveys/${survey.slug}`}
                                    circle
                                >
                                    <ArrowTopRightOnSquareIcon
                                        style={iconStyle}
                                    />
                                </BButton>
                                <BButton
                                    circle
                                    color="red"
                                    onClickEvent={(ev) =>
                                        deleteSurvey(ev, survey.id)
                                    }
                                >
                                    <TrashIcon style={iconStyle} />
                                </BButton>
                            </div>
                        </div>
                    </SurveyListComponent>
                ))}
            </div>
            <div
                className="pagination"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "50px",
                    marginTop: "25px",
                    marginBottom: "25px",
                }}
            >
                <button
                    className="pagination-button"
                    onClick={() => {
                        links.prev != null ? setLink(links.prev) : setLink("");
                    }}
                >
                    Prev
                </button>
                <button
                    className="pagination-button"
                    onClick={() => {
                        links.next != null ? setLink(links.next) : setLink("");
                    }}
                >
                    Next
                </button>
            </div>
        </PageComponent>
    );
};

export default Surveys;
