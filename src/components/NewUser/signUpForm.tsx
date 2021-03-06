import React from 'react'
import { SnackbarContent, IconButton, Input, InputAdornment, FormControl, InputLabel } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import Slide from '@material-ui/core/Slide'
import CloseIcon from '@material-ui/icons/Close'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import './signUpForm.css'

interface ISignUpFormState {
    [key: string]: any
    formSubmitMessageClassName: string
    formSubmitMessageText: string
    showFormSubmitMessage: boolean
    formIsValid: boolean
    name: IInput
    email: IInput
    password: IInput
}

interface IInput {
    value: string
    minLength: number
    isValid: boolean
    errorMessage: string
    show: boolean
}

const initialState = {
    formSubmitMessageClassName: "",
    formSubmitMessageText: "",
    showFormSubmitMessage: false,
    formIsValid: false,
    name: {
        value: "",
        minLength: 3,
        isValid: false,
        errorMessage: "",
        show: true
    },
    email: {
        value: "",
        minLength: 6,
        isValid: false,
        errorMessage: "",
        show: true
    },
    password: {
        value: "",
        minLength: 8,
        isValid: false,
        errorMessage: "",
        show: false
    }
}

const FORM_SUBMIT_MESSAGE_SUCCESS_CLASS_NAME: string = "success"
const FORM_SUBMIT_MESSAGE_ERROR_CLASS_NAME: string = "error"

Object.freeze(initialState)

export default class SignUpForm extends React.Component {
    state: ISignUpFormState = {
        ...initialState
    }

    handleClickShowPassword = () => {
        this.setState((prevState: ISignUpFormState) => ({
            ...prevState,
            password: {
                ...prevState.password,
                show: !prevState.password.show
            }
        }))
    }

    getFormValidity = () => {
        const {name, email, password} = this.state
        const nameIsValid = getInputValidity(name)
        const emailIsValid = getInputValidity(email)
        const passwordIsValid = getInputValidity(password)
        
        if (nameIsValid && emailIsValid && passwordIsValid) {
            return true
        } else {
            return false
        }
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        let input = event.currentTarget
        let prevStateInputData: Object = this.state[input.name]

        this.setState({
            [input.name]: {
                ...prevStateInputData,
                value: input.value
            }
        }, () => {
            // check form validity and set it to state only if the validity has changed
            let formIsValid = this.getFormValidity()
            let prevFormValidity = this.state.formIsValid
            if (formIsValid !== prevFormValidity) {
                this.setState({
                    formIsValid
                })
            }
        })
    }

    handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        const {name, email, password, formIsValid} = this.state
        
        if (formIsValid) {
            // form is valid, submit it 
            let submittedFormSuccessMessage = "Your have successfully signed up!"
            // set to initial state
            this.setState({
                ...initialState,
                showFormSubmitMessage: true,
                formSubmitMessageText: submittedFormSuccessMessage,
                formSubmitMessageClassName: FORM_SUBMIT_MESSAGE_SUCCESS_CLASS_NAME
            })
        } else {
            let submittedFormErrorMessage = "Oops... Please check the errors!"
            // display the error messages
            this.setState({
                formIsValid: false,
                showFormSubmitMessage: true,
                formSubmitMessageText: submittedFormErrorMessage,
                formSubmitMessageClassName: FORM_SUBMIT_MESSAGE_ERROR_CLASS_NAME,
                name: {
                    ...name,
                    isValid: getInputValidity(name),
                    errorMessage: getErrorMessageIfAny(name, "Name")
                },
                email: {
                    ...email,
                    isValid: getInputValidity(email),
                    errorMessage: getErrorMessageIfAny(email, "Email")
                },
                password: {
                    ...password,
                    isValid: getInputValidity(password),
                    errorMessage: getErrorMessageIfAny(password, "Password")
                }
            })
        }
        
        setTimeout(() => {
            this.setState({
                showFormSubmitMessage: false
            })
        }, 4000)
    }

    handleFormSubmitMessageClose = (event: React.SyntheticEvent) => {
        event.preventDefault()
        this.setState({
            showFormSubmitMessage: false,
            formSubmitMessageText: ""
        })
    }

    render() {
        let {name, email, password, formIsValid} = this.state

        return (
            <form onSubmit={this.handleSubmit} id="sign-up-form">
                <div className="input-field"> 
                    <TextField 
                        label="Name"
                        required
                        placeholder="First name"
                        value={name.value} 
                        name="name" 
                        onChange={this.handleChange}
                    />
                    {(!formIsValid && name.errorMessage) && <span className="error-message">{name.errorMessage}</span>}
                </div>

                <FormControl className="input-field">
                    <InputLabel htmlFor="adornment-email">Email *</InputLabel>
                    <Input 
                        id="adornment-email"
                        required
                        placeholder="for@example.com"
                        value={email.value} 
                        name="email" 
                        type="email"
                        onChange={this.handleChange}
                    />
                    {(!formIsValid && email.errorMessage) && <span className="error-message">{email.errorMessage}</span>}
                </FormControl>

                <FormControl className="input-field">
                    <InputLabel htmlFor="adornment-password">Password *</InputLabel>
                    <Input 
                        required
                        id="adornment-password"
                        value={password.value} 
                        name="password" 
                        placeholder="New password"
                        onChange={this.handleChange}
                        type={password.show ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton aria-label="Toggle password visibility" onClick={this.handleClickShowPassword}>
                                    {password.show ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    {(!formIsValid && password.errorMessage) && <span className="error-message">{password.errorMessage}</span>}
                </FormControl>
                
                <Button
                    variant="outlined" 
                    color="secondary" 
                    disabled={!formIsValid}
                    type="submit"
                >
                    Submit
                </Button>

                <Snackbar
                    open={this.state.showFormSubmitMessage}
                    TransitionComponent={(props) => (<Slide {...props} direction="up" />)}
                >
                    <SnackbarContent
                        className={this.state.formSubmitMessageClassName}
                        aria-describedby="client-snackbar"
                        message={
                            <span id="client-snackbar">
                                {this.state.formSubmitMessageText}
                            </span>
                        }
                        action={[
                            <IconButton 
                                key="close" 
                                aria-label="Close" 
                                color="inherit" 
                                onClick={this.handleFormSubmitMessageClose}
                            >
                                <CloseIcon />
                            </IconButton>,
                        ]}
                    />
                </Snackbar>
            </form>
        )
    }
}

/**
 * @param {IInput} input
 * @returns {boolean} isValid
 */
let getInputValidity = (input: IInput): boolean => {
    let value = input.value
    let minLength = input.minLength
    
    if (value && value !== "" && value.length >= minLength) {
        return true
    } else {
        return false
    }
}


/**
 * @param {IInput} input
 * @param {string} inputName
 * @returns {string} errorMessage
 */
let getErrorMessageIfAny = (input: IInput, inputName: string): string => {
    let value: any = input.value
    let minLength: number = input.minLength
    let errorMessage: string = ""
    
    if (!value || value === "") {
        errorMessage = `${inputName} cannot be empty!`
    } else if (value.length < minLength) {
        errorMessage = `${inputName} has to have at least ${minLength} characters!`
    }

    return errorMessage
}
