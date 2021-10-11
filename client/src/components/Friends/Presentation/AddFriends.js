import React from 'react';
import { useMutation } from '@apollo/client';

import useInput from '../../Hooks/use-input';
import CREATE_FRIENDS from '../DataProccess/MutateFriends';
import VIEW_FRIENDS from '../DataProccess/QueryFriends';

import SubmitCard from '../../UI/SubmitCard';
import Header_h2 from '../../UI/Header_h2';
import FormInputs from '../../UI/FormInputs';
import FormSubmit from '../../UI/FormSubmit';

import './AddFriends.css';

const AddFriends = () => {

    const lettersRegex = /^[A-Za-z]+$/ ;
    const numberRegex = /^[0-9]*$/ ;

    const isName  = value => value.length > 1 && value.match(lettersRegex);
    const isPhone = value => value.length > 3 && value.match(numberRegex);
    const isAge = value => value.length > 0 && value.length < 3 && value.match(numberRegex);

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
        value: age,
        isValid: ageIsValid,
        hasError: ageHasError,
        valueChangeHandler: ageHandler,
        inputBlurHandler: ageBlurHandler,
        reset: resetAge
    } = useInput( isAge );

    let formIsValid = false;
    if(firstNameIsValid && lastNameIsValid && phoneIsValid && ageIsValid) {
        formIsValid = true;
    } 

    const submitHandler = (event) => {
        event.preventDefault();

        if(!formIsValid) {
            return
        }

        const submitData = {
            firstname: firstName,
            lastname: lastName,
            phone: phone,
            age: Number(age)
        }

        console.log("submitData: ", submitData)
        console.log(typeof(submitData.age))
    
        newFriend({ variables: { firstName: submitData.firstname, lastName: submitData.lastname, phone: submitData.phone, age: submitData.age } }); 

        resetFirstName();
        resetLastName();
        resetPhone();
        resetAge();
    
    }
    
    const [newFriend, { data, loading, error }] = useMutation(CREATE_FRIENDS, {

        update: (cache, {data}) => {
            const newFriendMutation = data?.addFriend;

            const existingFriends = cache.readQuery({
                query: VIEW_FRIENDS,
            });

            cache.writeQuery({
                query: VIEW_FRIENDS,
                data: {
                    friends: [
                        ...existingFriends?.friends,
                        newFriendMutation
                    ],
                },
            })
        }
    });
   
    const firstNameErrorClass = firstNameHasError ? 'input-invalid' : ''  ;
    const lastNameErrorClass = lastNameHasError ? 'input-invalid' : '' ;
    const phoneErrorClass = phoneHasError ? 'input-invalid' : '' ;
    const ageErrorClass = ageHasError ? 'input-invalid' : '' ;

    return(
        <SubmitCard>
            <Header_h2 className="friends-h2" >Add Friend </Header_h2>

            <form className="friends-form" onSubmit={submitHandler} >

                <FormInputs>      
                    <div className="friends-form-field">
                        <label htmlFor="f-name">First Name</label>
                        <input className={firstNameErrorClass}
                               type="text" 
                               value={firstName} 
                               onChange={firstNameHandler} 
                               onBlur={firstNameBlurHandler}
                        />
                        <div className="friend-error">
                            { firstNameHasError && <p> * Please enter a valid Firstname </p> }
                        </div>
                    </div>

                    <div className="friends-form-field">
                        <label htmlFor="l-name">Last Name</label>
                        <input className={lastNameErrorClass}
                               type="text" 
                               value={lastName} 
                               onChange={lastNameHandler}
                               onBlur={lastNameBlurHandler}
                        />
                        <div className="friend-error">
                            { lastNameHasError && <p> * Please enter a valid Lastname </p> }
                        </div>
                    </div>

                    <div className="friends-form-field">
                        <label htmlFor="phone">Phone</label>
                        <input className={phoneErrorClass}
                               type="tel" 
                               value={phone} 
                               onChange={phoneHandler} 
                               onBlur={phoneBlurHandler}
                        />
                        <div className="friend-error">
                            { phoneHasError && <p> * Please enter a valid phone number </p> }
                        </div>
                    </div>

                    <div className="friends-form-field">
                        <label htmlFor="age">Age</label>
                        <input className={ageErrorClass} 
                               type="number" 
                               value={age} 
                               onChange={ageHandler}
                               onBlur={ageBlurHandler}
                        />
                        <div className="friend-error">
                            { ageHasError && <p> * Please enter a valid Age </p> }
                        </div>
                    </div>
                </FormInputs>    

                <FormSubmit>
                        <button type="submit" className="friend-submit" disabled={!formIsValid}>Add</button>
                </FormSubmit>  
            </form>
        </SubmitCard>
    )
}

export default AddFriends;