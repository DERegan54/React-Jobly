import React, { useContext, useState, useEffect } from "react";

const JobCard = ({id, title, salary, equity, companyName}) => {

    return (
        <div className="JobCard">
            <h5>{title}</h5>
            <h6>{companyName}</h6>
            <p>Salary: ${salary}</p>
            <p>Equity: {equity}%</p>
            <br></br>
        </div>
    )
}

export default JobCard;