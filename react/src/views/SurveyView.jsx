import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import PageComponent from "../components/PageComponent";
import BButton from "../components/core/BButton";
import { PencilIcon, TrashIcon, UserIcon } from "@heroicons/react/24/outline";
import "../assets/css/form.css";
import axiosClient from "../axios";
import SurveyQuestion from "../components/SurveyQuestion";
import { useStateContext } from "../contexts/ContextProvider";

export default function SurveyView() {
    const [survey, setSurvey] = useState({
        title: "",
        slug: "Avhik how are you",
        status: false,
        description: "",
        image: null,
        image_url: "",
        expire_date: "",
        question: [],
    });
    const [data, setData] = useState({});
    const [error, setError] = useState("");
    const { id } = useParams();
    const { setNotification } = useStateContext();
    let navigate = useNavigate();
    // handle updating the survey
    useEffect(() => {
        if (id) {
            axiosClient.get(`/survey/${id}`).then((response) => {
                setSurvey({
                    ...response.data.data,
                    image_url: response.data.data.image,
                });
            });
        }
    }, []);
    // make a function for event handling
    const onImageChange = (event) => {
        event.preventDefault();
        let file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (en) => {
            setSurvey({ ...survey, image: file, image_url: reader.result });
            event.target.value = "";
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const payload = { ...survey };
        if (payload.image) {
            payload.image = payload.image_url;
        }
        delete payload.image_url;
        // upadating
        
        let res = null;
        if (id) {
            res = axiosClient.put(`/survey/${id}`, payload);
        } else {

            res = axiosClient.post(`/survey/`, payload);
        }

        res.then((response) => {
            console.log(response.data)
            navigate("/surveys");
            if(id){
                setNotification({
                    message: "1 item updated successfully",
                    show: true,
                });
            }else{
                setNotification({
                    message: "1 item created successfully",
                    show: true,
                });
            }
        }).catch((error) => {
            if (error.response.data["errors"]) {
                let arr = error.response.data["errors"];
                for (let key in arr) {
                    arr[key] = arr[key][0];
                }
                setError(arr);
            }
        });
        ////////////////////////
    };

    function onSurveyUpdated(survey) {
        
        setSurvey({ ...survey });
        // console.log(survey)
    }
    // make input field border red
    function makeRed() {
        let input = document.querySelectorAll("input");
        input.forEach((element) => {
            //for(let key in error){

            if (error[element.name]) {
                element.classList.add("is-invalid");
                let sibling = element.parentNode.querySelector(".form-text");
                if (sibling != null) {
                    sibling.classList.remove("text-muted");
                    sibling.classList.add("text-danger");
                }
            } else {
                element.classList.remove("is-invalid");
                let sibling = element.parentNode.querySelector(".form-text");
                if (sibling != null) {
                    sibling.classList.remove("text-danger");
                    sibling.classList.add("text-muted");
                }
            }

            // }
        });
    }
    if (error != null) {
        makeRed();
    }
   
    // add question on survey form  surveyquestio
    return (
        <>
            <PageComponent title={id ? "Upadate Survey" : "Create New Survey"} 
            button={id &&
            (<div className="" style={{gap:'20px'}}>
                <a href={`/survey/public/${survey.slug}`}>
                <button className="btn btn-primary mx-2">
                    Public Link
                </button>
                </a>
                <button className="btn btn-danger">
                    Delete Survey
                </button>
            </div>)}
            >
                <form action="" encType="multipart/form-data">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group custom-field">
                                    <label htmlFor="image">Photo</label>
                                    <div className="main-image-container">
                                        <div className="default-image-container">
                                            {survey.image_url && (
                                                <img
                                                    src={survey.image_url}
                                                    className="default-image"
                                                    alt="Survey"
                                                />
                                            )}
                                            {!survey.image_url && (
                                                <UserIcon className="default-image" />
                                            )}
                                        </div>
                                        <div className="input-button">
                                            <input
                                                type="file"
                                                id="image"
                                                name="image"
                                                onChange={(event) => {
                                                    onImageChange(event);
                                                }}
                                            />
                                            Change
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group p-2 custom-field">
                                    <label htmlFor="title">Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="title"
                                        id="title" // Added id attribute
                                        value={survey.title}
                                        placeholder="title"
                                        onChange={(event) => {
                                            setSurvey({
                                                ...survey,
                                                title: event.target.value,
                                            });
                                        }}
                                    />

                                    <small className="form-text text-muted text-danger">
                                        {error.title && error.title}
                                        {!survey.title &&
                                            "Type your title here"}
                                    </small>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group p-2 custom-field">
                                    <label htmlFor="description">
                                        Description
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="description"
                                        id="description" // Added id attribute
                                        value={survey.description}
                                        placeholder="description"
                                        onChange={(event) => {
                                            setSurvey({
                                                ...survey,
                                                description: event.target.value,
                                            });
                                        }}
                                    />

                                    <small className="form-text text-muted">
                                        {error.description && error.description}
                                        {!survey.description &&
                                            "Type your description here"}
                                    </small>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group p-2 custom-field">
                                    <label htmlFor="expire_date">
                                        Expire Date
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="expire_date"
                                        id="expire_date" // Added id attribute
                                        value={survey.expire_date}
                                        onChange={(event) => {
                                            setSurvey({
                                                ...survey,
                                                expire_date: event.target.value,
                                            });
                                        }}
                                    />
                                    <small className="form-text text-muted">
                                        {error.expire_date && error.expire_date}
                                        {!survey.expire_date &&
                                            "Type your expire date here"}
                                    </small>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group custom-field">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="status"
                                        id="status" // Added id attribute
                                        value={survey.status}
                                        checked={survey.status}
                                        onChange={(event) => {
                                            setSurvey({
                                                ...survey,
                                                status: !survey.status,
                                            });
                                        }}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="status"
                                    >
                                        Check me out
                                    </label>
                                </div>
                            </div>
                        </div>
                        {/* survey componet is useage down below */}

                        <div className="row">
                            <SurveyQuestion
                                survey={survey}
                                data={survey.data}
                                onSurveyUpdated={onSurveyUpdated}
                            />
                        </div>
                        <div className="col-md-6">
                            <div className="form-group p-2 custom-field">
                                <button
                                    className="submit-btn"
                                    onClick={(event) => {
                                        onSubmit(event);
                                    }}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </PageComponent>
        </>
    );
}
