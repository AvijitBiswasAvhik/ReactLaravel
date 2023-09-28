import React from "react";
import { useStateContext } from "../contexts/ContextProvider";

const PageComponent = ({ title, button, content, children }) => {
    const { notification, setNotification } = useStateContext();
    
    return (
        <>
            <header
                style={{
                    height: "80px",
                    boxShadow: "3px 3px 3px grey",
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                }}
            >
                <div className="container  d-flex justify-content-around">
                    <div className="p-3 text-left">{title}</div>
                    {button}
                </div>
            </header>
            <main>
                <div className="main-container">{children}</div>
            </main>
            
        </>

    );

};

export default PageComponent;
