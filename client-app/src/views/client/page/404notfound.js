import React from "react";
import "../style/404notfound.css";
import { NavLink } from "react-router-dom";

const PageNotFound = () => {
    return (
        <div className="cont-404">
            <img src="/data/banner/404.svg" alt="svg" />
            <NavLink to={"/"}><button >Back to Home</button></NavLink>
        </div>
    );
};

export default PageNotFound;