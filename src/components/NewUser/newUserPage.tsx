import React from 'react'

import SignUpForm from './signUpForm'
import './newUserPage.css'

const NewUserPage: React.FC = () => {
    return (
        <div>
            <h3>New User</h3>
            <SignUpForm />
        </div>
    )
}

export default NewUserPage
