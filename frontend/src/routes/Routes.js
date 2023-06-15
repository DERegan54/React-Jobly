import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom';
import Home from '../home/Home';
import SignupForm from '../auth/SignupForm';
import LoginForm from '../auth/LoginForm';
import CompanyList from '../companies/CompanyList';
import CompanyDetail from '../companies/CompanyDetail';
import JobList from '../jobs/JobList';

const Routes = ({login, signup}) => {

    return (
        <div className='Routes'>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                
                <Route exact path="/signup">
                    <SignupForm signup={signup} />
                </Route>

                <Route exact path="/login">
                    <LoginForm login={login} />
                </Route>

                <Route exact path="/profile">

                </Route>
                
                <Route exact path="/companies">
                    <CompanyList />
                </Route>

                <Route exact path="/companies/:handle">
                    <CompanyDetail />
                </Route>

                <Route exact path="/jobs">
                    <JobList />
                </Route>

                <Redirect to="/"></Redirect>
            </Switch>
        </div>

    )
}

export default Routes;