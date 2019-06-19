import React from 'react'

import SignUpForm from './signUpForm';
import './newUserPage.css'

const NewUserPage: React.FC = () => {
    return (
        <div>
            <h2>New User</h2>            
            <SignUpForm />
        </div>
    )
}

export default NewUserPage
