import React from "react";

const SurveyListComponent = ({ survey, children }) => {
    return (
        <div className="card" style={{ width: "300px" }}>
            <img
                src={survey.image}
                alt=""
                className="card-img-top w-100"
            />

            <div className="card-body">
                <h5 className="card-title">{survey.title}</h5>
                <p className="card-text">{survey.description}</p>
                {children}
            </div>
        </div>

    );
};

export default SurveyListComponent;
