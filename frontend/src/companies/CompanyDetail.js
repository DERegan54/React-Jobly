import React, {useState, useEffect, useContext} from "react";
import {useParams, Redirect} from "react-router-dom";
import JoblyApi from '../api';
import Header from "../common/Header";
import JobCardList from '../jobs/JobCardList';
import UserContext from "../users/UserContext"

const CompanyDetail = () => {
    const {handle} = useParams()
    const [company, setCompany] = useState([]);
    // const [companyJobs, setCompanyJobs] = useState([])

    console.log(handle)
   
    useEffect(function getCompanyAndJobs() {
        async function getCompany() {
            let company = await JoblyApi.getCompany(handle);
            setCompany(company);
        }
        getCompany();
    }, [handle]);

    console.log(company)
    console.log(company.jobs)
    console.log(typeof company.jobs)
    // console.log(company.jobs[0])
    // console.log(company.jobs[0].title)
 
   
    // function getCompanyJobs(company) {
    //      let companyJobs = [];
    //      for (job in company.jobs){
    //          companyJobs.push(job)
    //      }
    //      setCompanyJobs(companyJobs);
    //      console.log(companyJobs)
    // };

    // getCompanyJobs(company)

    if (!company) <Redirect to="/"></Redirect>

    return (
        <div className="CompanyDetail">
            <Header />
            <h2> {company.name}</h2>
            <p><b>Number of employees</b>: {company.numEmployees}</p>
            <p><b>Company Description</b>: {company.description}</p>
            <br></br>
            <h3>Positions for Hire at {company.name}:</h3>
            {/* <p><JobCardList jobs={company.jobs} /></p>       */}
        </div>    

    );
}

export default CompanyDetail;