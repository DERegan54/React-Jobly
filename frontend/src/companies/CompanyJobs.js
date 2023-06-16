import React, {useState, useEffect, useContext} from "react";
import {useParams, Redirect} from "react-router-dom";
import JoblyApi from '../api';
import UserContext from "../users/UserContext";


const CompanyJobs = ({id}) => {
    const {handle} = useParams()
    const [company, setCompany] = useState([]);
    const [jobs, setJobs] = useState([]);
    const {hasAppliedToJob, applyToJob} = useContext(UserContext);
    const [applied, setApplied] = useState([]);
    
  
    useEffect(() => {
        async function getData() {
            let company = await JoblyApi.getCompany(handle);
            setCompany(company);
            setJobs(company.jobs)
        }
        getData();
    }, []);    

    useEffect(() => {
        setApplied(hasAppliedToJob(id));
    }, [id, hasAppliedToJob]);


    async function handleApply(evt) {
        if(hasAppliedToJob(id)) return;
        applyToJob(id)
        setApplied(true); 
    }
    
    if (!company) <Redirect to="/"></Redirect>

    return (
        <div className="CompanyJobs">
            <h3>Positions for Hire at {company.name}:</h3>
            <br></br>
            <div className="CompanyJobs-jobList">
                {jobs.map(j => (
                    <div className="CompanyJobs-job">
                        <p><b>Role: {`${j.title}`}</b></p>  
                        <p>Salary: ${`${j.salary}`}</p>  
                        <p>Equity: {`${j.equity}`}%</p> 
                        <button 
                            className='CompanyDetail-applyButton' 
                            onClick={handleApply} 
                            disable={applied}>
                            {hasAppliedToJob ? "Applied!" : "Apply Now!"}
                        </button>
                        <br></br> 
                        <br></br>
                    </div>
                ))}
            </div>
        </div>           

    );
}

export default CompanyJobs;