import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BoltSlashIcon } from "@heroicons/react/24/solid";
import { useStateContext } from "../contexts/ContextProvider";

export default function GuestLayout() {
    const { userToken, currentUser } = useStateContext();
   // const navigate = useNavigate();
    if (userToken) {
        return <Navigate to="/" />
    }

    return (
        <>
            <div className="container mt-5 p-2">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="text-center">
                            <BoltSlashIcon className="h-25 w-25 text-primary" />
                        </div>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
}
