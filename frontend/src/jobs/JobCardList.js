import React from "react";
import JobCard from "./JobCard";

const JobCardList = ({jobs}) => {
    return (
        <div className="JobCardList">
            <h2 className="JobCardList-h3">All Available Roles: </h2>
            {jobs.map(job => (
                <JobCard 
                    key={job.id}
                    id={job.id}
                    title={job.title}
                    salary={job.salary}
                    equity={job.equity}
                    companyName={job.companyName}
                />
            ))}
        </div>
    );
} 

export default JobCardList;