import React, { useContext, useState, useEffect } from "react";
import UserContext from "../users/UserContext";
import JoblyApi from "../api";

const JobCard = ({id, title, salary, equity, companyName}) => {
    const {hasAppliedToJob, applyToJob} = useContext(UserContext);
    const [applied, setApplied] = useState();

    useEffect(() => {
        setApplied(hasAppliedToJob(id));
    }, [id, hasAppliedToJob]);


    async function handleApply(evt) {
        if(hasAppliedToJob(id)) return;
        applyToJob(id)
        setApplied(true); 
    }
    
    return (
        <div className="JobCard">
            <h5>{title}</h5>
            <h6>{companyName}</h6>
            <p>Salary: ${salary}</p>
            <p>Equity: {equity}%</p>
            <button 
                className='JobCard-applyButton' 
                onClick={handleApply} 
                disable={applied}
            >
                {applied ? "Applied!" : "Apply Now!"}
            </button>
        </div>
    );
}

export default JobCard;