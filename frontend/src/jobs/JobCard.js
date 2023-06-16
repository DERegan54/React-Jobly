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
            <h3>{`${title}`}</h3>
            <p>Company: {`${companyName}`}</p>
            <p>Salary: ${`${salary}`}</p>
            <p>Equity: {`${equity}`}%</p>
            <button 
                className='JobCard-applyButton' 
                onClick={handleApply} 
                disable={applied}>
                {applied ? "Applied!" : "Apply Now!"}
            </button>
        </div>
    );
}

export default JobCard;