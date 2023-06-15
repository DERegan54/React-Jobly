import React, {useState, useEffect} from "react";
import {Redirect} from 'react-router-dom';
import SearchForm from "../common/SearchForm";
import JoblyApi from "../api";
import JobCardList from "./JobCardList";
import UserContext from '../users/UserContext'; 


const JobList = () => {
    const [jobs, setJobs] = useState([]);
    
    async function search(title) {
        let jobs = await JoblyApi.getJobs(title);
        setJobs(jobs)
    }

    useEffect(function getAllJobs() {
        search(); 
    }, []);

    console.log(jobs)

    if (!jobs) <Redirect to="/"></Redirect>

    return (
        <div className="JobList">
            <h2>All Available Roles</h2>
            <SearchForm  searchTerm={search} />
            {jobs.length
               ? <JobCardList jobs={jobs} />
                : <p>Sorry, no results were found with those search terms.</p>
            }
        </div>
    );
}

export default JobList;