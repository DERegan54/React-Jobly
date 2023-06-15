import React, {useState, useEffect, useContext} from "react";
import {useParams, Redirect} from "react-router-dom";
import JoblyApi from '../api';
import JobList from '../jobs/JobList';
import JobCardList from '../jobs/JobCardList';
import JobCard from '../jobs/JobCard';
import UserContext from "../UserContext"

const CompanyDetail = () => {
    const {handle} = useParams()
    const [company, setCompany] = useState([]);

    console.log(handle)
   
    useEffect (() => {
        async function getCompany() {
            let company = await JoblyApi.getCompany(handle);
            setCompany(company)
        };
        getCompany();
    }, [handle]);

    console.log(company)


    // if (!company) <Redirect to="/"></Redirect>

    return (
        <div className="CompanyDetail">
            <h3> {company.name}</h3>
            <p> {company.description} </p>
            {/* <JobCardList jobs={company.jobs} companyJobs={company.jobs} />  */}

            {/* <JobList jobs={company.jobs} />
            */}
      </div>   

    );
}

export default CompanyDetail;