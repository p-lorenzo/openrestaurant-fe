import React from "react";

export default function Dashboard() {

    return (
        <a href={process.env.REACT_APP_API_URL + "/api/qr-code"} download>
            <img src={process.env.REACT_APP_API_URL + "/api/qr-code"} alt="qr-code" />
        </a>
    );
};