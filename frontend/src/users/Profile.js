import React, {useContext} from 'react';
import Header from '../common/Header';
import UserContext from './UserContext'
import ProfileForm from './ProfileForm';


const Profile = () => {
    const {currentUser} = useContext(UserContext);
    
    return  (
        <div className='Profile'>
            <Header />
            <h2>{currentUser.username}'s Profile:</h2>
            <p><b>Username</b>: {currentUser.username}</p>
            <p><b>First Name</b>: {currentUser.firstName}</p>
            <p><b>LastName</b>: {currentUser.lastName}</p>
            <p><b>Email</b>: {currentUser.email}</p>
            <br></br>
            <ProfileForm />
        </div>
    )
}

export default Profile;


