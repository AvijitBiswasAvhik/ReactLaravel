import React, { useEffect, useState } from "react";
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useStateContext } from "../contexts/ContextProvider";

export default function QuestionEditor({
    id,
    question,
    description,
    index,
    type,
    addQuestion,
    deleteQuestion,
    onQuestionChange,
}) {
    const [model, setModel] = useState({
        id: id,
        question: question,
        description: description,
        type: type,
        data: {name:'avijit', age: 25}
    });
    // update main survey data
    useEffect(() => {
        onQuestionChange({...model},index)
    },[model]);
    const { questionTypes } = useStateContext();

    return (
        <div
            className="container"
            style={{
                backgroundColor: "grey",
                padding: "5px",
                marginTop: "10px",
                borderRadius: "5px",
            }}
        >
            <div className="row d-flex justify-content-between question-editor">
                <div className="col-7 ">
                    <h5 className="question">
                        {index + 1} {question}
                    </h5>
                </div>
                <div className=" col-5 add-delete-btn d-flex justify-content-end">
                    <button
                        className="add-button-2"
                        onClick={(event) => {
                            addQuestion(event);
                        }}
                    >
                        <PlusCircleIcon className="add-icon-2" />
                        Add
                    </button>
                    <button
                        className="delete-button"
                        onClick={(event) => {
                            deleteQuestion(event, id);
                        }}
                    >
                        <TrashIcon className="trash-icon" />
                        Delete
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col-8">
                    <label htmlFor="question">Question</label>
                    <input
                        type="text"
                        className="form-control"
                        id="question"
                        value={model.question}
                        onChange={(event) => {
                            setModel({
                                ...model,
                                question: event.target.value,
                            });
                        }}
                    />
                </div>
                <div className="col-4">
                    <label htmlFor="type">Question Type</label>
                    <select
                        className="form-select"
                        value={model.type}
                        onChange={(event) => {
                            setModel({ ...model, type: event.target.value });
                        }}

                    >
                        {questionTypes.map((type, index) => {
                            return (
                                <option value={type} key={type} id={type}>
                                    {type}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label htmlFor="description1">Description</label>
                    <textarea
                        type="text"
                        id="description1"
                        value={model.description}
                        onChange={(event) => {
                            setModel({
                                ...model,
                                description: event.target.value,
                            });
                        }}
                        className="form-control"
                    />
                </div>
            </div>                                       
        </div>
    );
}
