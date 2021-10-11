import React from 'react';
import { useMutation } from '@apollo/client';

import useInput from '../../Hooks/use-input';
import CREATE_COLLEAGUES from '../DataProccess/MutateColleagues';
import VIEW_COLLEAGUES from "../DataProccess/QueryColleagues";

import SubmitCard from '../../UI/SubmitCard';
import Header_h2 from '../../UI/Header_h2';
import FormInputs from '../../UI/FormInputs';
import FormSubmit from '../../UI/FormSubmit';

import './AddColleagues.css';

const AddColleagues = () => {

    const lettersRegex = /^[A-Za-z]+$/ ;
    const numberRegex = /^[0-9]*$/ ;
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;

    const isName  = value => value.length > 1 && value.match(lettersRegex);
    const isPhone = value => value.length > 3 && value.match(numberRegex);
    const isEmail = value => value.match(emailRegex);

    const {
        value: firstName,
        isValid: firstNameIsValid,
        hasError: firstNameHasError,
        valueChangeHandler: firstNameHandler,
        inputBlurHandler: firstNameBlurHandler,
        reset: resetFirstName
    } = useInput( isName );

    const {
        value: lastName,
        isValid: lastNameIsValid,
        hasError: lastNameHasError,
        valueChangeHandler: lastNameHandler,
        inputBlurHandler: lastNameBlurHandler,
        reset: resetLastName
    } = useInput( isName );

    const {
        value: phone,
        isValid: phoneIsValid,
        hasError: phoneHasError,
        valueChangeHandler: phoneHandler,
        inputBlurHandler: phoneBlurHandler,
        reset: resetPhone
    } = useInput( isPhone );

    const {
        value: email,
        isValid: emailIsValid,
        hasError: emailHasError,
        valueChangeHandler: emailHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmail
    } = useInput( isEmail );

    let formIsValid = false;
    if(firstNameIsValid && lastNameIsValid && phoneIsValid && emailIsValid) {
        formIsValid = true;
    } 

    // --- FORM SUBMITION ---- //

    const submitHandler = (event) => {
        event.preventDefault(); 

        if(!formIsValid) {
            return
        }
        
        const submitData = {
            firstname: firstName,
            lastname: lastName,
            phone: phone,
            email: email
        }

        newColleague({ variables: { firstName: submitData.firstname, lastName: submitData.lastname, phone: submitData.phone, email: submitData.email } }); 

        resetFirstName();
        resetLastName();
        resetPhone();
        resetEmail();
    }

    const [newColleague, { loading, error }] = useMutation(CREATE_COLLEAGUES ,{

        update: (cache, {data}) => {
            const newColleagueMutation = data?.createColleaugue;

            const existingColleagues = cache.readQuery({
                query: VIEW_COLLEAGUES,
            });

            cache.writeQuery({
                query: VIEW_COLLEAGUES,
                data: {
                    colleagues: [
                        ...existingColleagues?.colleagues,
                        newColleagueMutation
                    ],
                },
            })
        }
    });

    const firstNameErrorClass = firstNameHasError ? 'input-invalid' : ''  ;
    const lastNameErrorClass = lastNameHasError ? 'input-invalid' : '' ;
    const phoneErrorClass = phoneHasError ? 'input-invalid' : '' ;
    const emailErrorClass = emailHasError ? 'input-invalid' : '' ;

    return(
        <SubmitCard>
            <Header_h2 className="colleagues-h2">Add Colleague</Header_h2>
            <form className="colleagues-form" onSubmit={submitHandler} >
                <FormInputs>
                    <div className="colleagues-form-field">
                        <label htmlFor="f-name">First Name</label>
                        <input 
                            className={firstNameErrorClass}
                            type="text" 
                            value={firstName} 
                            onChange={firstNameHandler} 
                            onBlur={firstNameBlurHandler}
                        />
                        <div className="colleague-error">
                            { firstNameHasError && <p> * Please enter a valid Firstname </p> }  
                        </div>
                    </div>

                    <div className="colleagues-form-field">
                        <label htmlFor="l-name">Last Name</label>
                        <input 
                            className={lastNameErrorClass}
                            type="text" 
                            value={lastName} 
                            onChange={lastNameHandler} 
                            onBlur={lastNameBlurHandler}
                        />
                        <div className="colleague-error">
                            { lastNameHasError && <p> * Please enter a valid Lastname </p> }  
                        </div>
                    </div>

                    <div className="colleagues-form-field">
                        <label htmlFor="phone">Phone</label>
                        <input className={phoneErrorClass}
                               type="tel" 
                               value={phone} 
                               onChange={phoneHandler} 
                               onBlur={phoneBlurHandler}
                        />
                        <div className="colleague-error">
                            { phoneHasError && <p> * Please enter a valid phone number </p> }  
                        </div>
                    </div>

                    <div className="colleagues-form-field">
                        <label htmlFor="email">E-mail</label>
                        <input className={emailErrorClass} 
                               type="e-mail" 
                               value={email} 
                               onChange={emailHandler} 
                               onBlur={emailBlurHandler}
                        />
                        <div className="colleague-error">
                            { emailHasError && <p> * Please enter a valid email address </p> }  
                        </div>
                    </div>
                </FormInputs>
                
                <FormSubmit>
                        <button type="submit" className="colleague-submit" disabled={!formIsValid}>Add</button>
                </FormSubmit>

            </form>
        </SubmitCard>
    )
}

export default AddColleagues;