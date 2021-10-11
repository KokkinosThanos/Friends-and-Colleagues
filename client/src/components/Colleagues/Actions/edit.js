import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import { useMutation, gql } from '@apollo/client';

import "./edit.css";

const Edit = (props) => {

    const [firstName, setFirstName] = useState(props.editFname);
    const [lastName, setLastName] = useState(props.editLname);
    const [phone, setPhone] = useState(props.editPhone);
    const [email, setEmail] = useState(props.editEmail);

    const [defaultFname, setDefaultFname] = useState(props.editFname);
    const [defaultLname, setDefaultLname] = useState(props.editLname);
    const [defaultPhone, setDefaultPhone] = useState(props.editPhone);
    const [defaultEmail, setDefaultEmail] = useState(props.editEmail);

    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');

    useEffect(() => {
        setFirstName(props.editFname);
        setLastName(props.editLname);
        setPhone(props.editPhone);
        setEmail(props.editEmail);
    }, [props])

    const firstNameHandler = (event) => { setFirstName(event.target.value); }
    const lastNameHandler = (event) => { setLastName(event.target.value); }
    const phoneHandler = (event) => { setPhone(event.target.value); }
    const emailHandler = (event) => { setEmail(event.target.value); }

    const lettersRegex = /^[A-Za-z]+$/ ;
    const numberRegex = /^[0-9]*$/ ;
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;

    useEffect(() => {
      if( firstName == '' || firstName.length < 3 || !firstName.match(lettersRegex) )  setFirstNameError("* Please enter a valid First Name")  
      else setFirstNameError('') 
      if( lastName == '' || lastName.length < 3 || !lastName.match(lettersRegex) )  setLastNameError("* Please enter a valid Last Name")  
      else setLastNameError('') 
      if( phone == '' || phone.length < 4 || !phone.match(numberRegex) )  setPhoneError("* Please enter a valid Phone Number")  
      else setPhoneError('') 
      if( email == '' || email.length < 4 || !email.match(emailRegex)  )  setEmailError("* Please enter a valid Email")  
      else setEmailError('') 
    }, [firstName, lastName, phone, email]);

    const submitHandler = (event) => {
        event.preventDefault();

        if(!firstNameError == '' || !lastNameError == '' || !phoneError == '' || !emailError == '') { return }

        const submitData = {
            id: props.editID,
            firstname: firstName,
            lastname: lastName,
            phone: phone,
            email: email
        }

        UpdateColleague({ variables: {id: submitData.id, firstName: submitData.firstname, lastName: submitData.lastname, phone: submitData.phone, email: submitData.email } }); 

        props.onClose();
    }

    const UPDATE_COLLEAGUE = gql`
    mutation ($id:ID!, $firstName: String!, $lastName: String!, $phone: String!, $email: String!) {
      updateColleague ( id:$id, firstName: $firstName, lastName: $lastName, phone: $phone, email: $email )
        {
             id
             firstName
             lastName
             phone
             email
        }
    }
    `;

    const [UpdateColleague, { data, loading, error }] = useMutation(UPDATE_COLLEAGUE);

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    if (!props.open) return null;


  return ReactDOM.createPortal (

    <div className="edit-modal-colleague">
      <h3 className="h3-edit-colleague">Edit Colleague</h3>

      <form className="edit-form-colleague" onSubmit={submitHandler}>

        <div className="edit-form-field-colleague">
          <label for="f-name">First Name</label>
          <input type="text" value={firstName} defaultValue={defaultFname} onChange={firstNameHandler} />
          <div className="edit-friend-error"> {firstNameError} </div>
        </div>

        <div className="edit-form-field-colleague">
          <label for="l-name">Last Name</label>
          <input type="text" value={lastName} defaultValue={defaultLname} onChange={lastNameHandler} />
          <div className="edit-friend-error"> {lastNameError} </div>
        </div>

        <div className="edit-form-field-colleague">
          <label for="phone">Phone</label>
          <input type="tel" value={phone} defaultValue={defaultPhone} onChange={phoneHandler} />
          <div className="edit-friend-error"> {phoneError} </div>
        </div>

        <div className="edit-form-field-colleague">
          <label for="age">Email</label>
          <input type="text" value={email} defaultValue={defaultEmail} onChange={emailHandler} />
          <div className="edit-friend-error"> {emailError} </div>
        </div>

        <div className="edit-colleague-submit-options">
            <button type="submit" className="edit-colleague-submit-button"> Update </button>
            <button onClick={props.onClose} className="edit-colleague-cancel-button"> Cancel </button>

        </div>

      </form>
    </div>,
    document.getElementById("edit-root")
  );
};

export default Edit;
