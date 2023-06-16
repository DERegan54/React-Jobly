import React, {useState, useEffect} from "react";
import {useParams, Redirect} from "react-router-dom";
import JoblyApi from '../api';
import Header from "../common/Header";
import CompanyJobs from "./CompanyJobs";


const CompanyDetail = () => {
    const {handle} = useParams()
    const [company, setCompany] = useState([]);
   
    useEffect(() => {
        async function getCompany() {
            let company = await JoblyApi.getCompany(handle);
            setCompany(company);
        }
        getCompany();
    }, [handle]);    

    if (!company) <Redirect to="/"></Redirect>

    return (
        <div className="CompanyDetail">
            <Header />
            <h2>{company.name} </h2>
            <p><b>Number of employees</b>: {company.numEmployees}</p>
            <p><b>Company Description</b>: {company.description}</p>
            <br></br>
            <CompanyJobs />
        </div>           

    );
}

export default CompanyDetail;