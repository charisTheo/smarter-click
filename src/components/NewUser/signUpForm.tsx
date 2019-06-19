import React from 'react'
import TextField from '@material-ui/core/TextField';

import './signUpForm.css'

const initialState = {
    formIsValid: true,
    name: {
        value: "",
        minLength: 8,
        isValid: false,
        errorMessages: []
    },
    email: {
        value: "",
        minLength: 6,
        isValid: false,
        errorMessages: []
    },
    password: {
        value: "",
        minLength: 8,
        isValid: false,
        errorMessages: []
    }
}

Object.freeze(initialState)

export default class SignUpForm extends React.Component {
    state = {
        ...initialState
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        let input = event.currentTarget;
        this.setState({
            [input.name]: {
                value: input.value
            }
        })
    }

    handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const {name, email, password} = this.state;
        const nameValidity = getInputValidity(name);
        const emailValidity = getInputValidity(email);
        const passwordValidity = getInputValidity(password);
        
        if (nameValidity.isValid && emailValidity.isValid && passwordValidity.isValid) {
            // all inputs are valid, submit the form
            // set to initial state
            this.setState({
                formIsValid: true,
                ...initialState
            })
        } else {
            // display error messages
            this.setState(prevState => ({
                formIsValid: false,
                name: {
                    ...prevState,
                    ...nameValidity
                },
                email: {
                    ...prevState,
                    ...emailValidity
                },
                password: {
                    ...prevState,
                    ...passwordValidity
                }
            }))
        }    
    }

    renderErrorMessages = (errorMessages: Array<String>) => {
        return errorMessages.map((errorMessage, index) => (
            <span key={"error-message-" + index} className="error-message">{errorMessage}</span>
        ))
    }

    render() {
        let {name, email, password, formIsValid} = this.state

        return (
            <form onSubmit={this.handleSubmit} id="sign-up-form">
                <div className="input-field"> 
                    <TextField 
                        label="Name"
                        required
                        value={name.value} 
                        name="name" 
                        onChange={this.handleChange}
                    />
                    {(!formIsValid && name.errorMessages.length) && this.renderErrorMessages(name.errorMessages)}
                </div>

                <div className="input-field"> 
                    <TextField 
                        label="Email"
                        required
                        value={email.value} 
                        name="email" 
                        onChange={this.handleChange}
                    />
                    {(!formIsValid && email.errorMessages.length) && this.renderErrorMessages(email.errorMessages)}
                </div>

                <div className="input-field"> 
                    <TextField 
                        label="Password"
                        required
                        value={password.value} 
                        name="password" 
                        onChange={this.handleChange}
                    />
                    {(!formIsValid && password.errorMessages.length) && this.renderErrorMessages(password.errorMessages)}
                </div>

                <input type="submit" value="Submit" />
            </form>
        )
    }
}

/**
 * @param {object} input
 * @param {String} input.value
 * @param {Number} input.minLength
 * @param {Boolean} answer.isValid
 * @param {Boolean} answer.errorMessage
 * @returns {Object} answer
 */
function getInputValidity(input: any) {
    let value = input.value
    let minLength = input.minLength
    let isValid: Boolean = false
    let errorMessages: Array<String> = []
    
    if (value && value !== "" && value.length >= minLength) {
        isValid = true
    } else if (!value || value === "") {
        errorMessages.push("This field cannot be empty!")
    } else if (value.length < minLength) {
        errorMessages.push(`This field has to have at least ${minLength} characters!`)
    }
    
    let answer = {
        isValid,
        errorMessages
    }
    return answer
}