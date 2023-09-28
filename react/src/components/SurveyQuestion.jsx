import React, { useState, useEffect } from "react";
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import "../assets/css/SurveyQuestion.css";
import QuestionEditor from "./QuestionEditor";
import { v4 as uuidv4 } from "uuid";

export default function SurveyQuestion({ survey, onSurveyUpdated, data }) {
    const [model, setModel] = useState({ ...survey });
    const addQuestion = (event) => {
        event.preventDefault();
        model.question.splice(0, 0, {
            id: uuidv4(),
            type: "",
            question: "How are you sona",
            description: "tumi amke ar dekh te asbena",
            data: { name: "Alice", age: 25 },
        });
        setModel({
            ...survey,
            question: [...model.question],
        });
    };

    const deleteQuestion = (event, id) => {
        event.preventDefault();
        let question = model.question.filter((element) => {
            return element.id != id;
        });
        console.log(question);
        setModel({
            ...survey,
            question,
        });
    };
    // update when a question is changed
    const onQuestionChange = (question, index) => {
        model.question.splice(index, 1, question);
        
        setModel({...survey,question:model.question})
       
    };

    useEffect(() => {
        onSurveyUpdated({ ...model });
    }, [model]);

    return (
        <div className="container p-3">
            <div className="row">
                <div className="col d-flex justify-content-between">
                    <h4 className="question-title">Question</h4>
                    <button
                        className="add-button"
                        onClick={(event) => {
                            addQuestion(event);
                        }}
                    >
                        <PlusCircleIcon className="add-icon" />
                        Add
                    </button>
                </div>
            </div>
            <div className="row mt-3 question-editor-container">
                {model.question && (
                    survey.question.map((q, index) => {
                        return (
                            <QuestionEditor
                                id={q.id}
                                question={q.question}
                                description={q.description}
                                index={index}
                                key={q.id}
                                type={q.type}
                                addQuestion={addQuestion}
                                deleteQuestion={deleteQuestion}
                                onQuestionChange={onQuestionChange}
                            />
                        );
                    })
                ) }
                
                {!model.question && (<div className="col text-muted">
                    You dont  have any question
                </div>) }
            </div>
        </div>
    );
}
