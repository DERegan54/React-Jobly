import React, { useContext, useState, useEffect } from "react";

const JobCard = ({id, title, salary, equity, companyName}) => {

    return (
        <div className="JobCard">
            <h4>{title}</h4>
            <h6>{companyName}</h6>
            <p>Salary: ${salary}</p>
            <p>Equity: {equity}%</p>
        </div>
    )
}

export default JobCard;