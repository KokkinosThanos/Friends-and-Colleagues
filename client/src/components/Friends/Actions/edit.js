import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import { useMutation, gql } from '@apollo/client';

import "./edit.css";

const Edit = (props) => {

    const [firstName, setFirstName] = useState(props.editFname);
    const [lastName, setLastName] = useState(props.editLname);
    const [phone, setPhone] = useState(props.editPhone);
    const [age, setAge] = useState(props.editAge);

    const [defaultFname, setDefaultFname] = useState(props.editFname);
    const [defaultLname, setDefaultLname] = useState(props.editLname);
    const [defaultPhone, setDefaultPhone] = useState(props.editPhone);
    const [defaultAge, setDefaultAge] = useState(props.editAge);

    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [ageError, setAgeError] = useState('');
    
    useEffect(() => {
        setFirstName(props.editFname);
        setLastName(props.editLname);
        setPhone(props.editPhone);
        setAge(props.editAge);
    }, [props]);

    const firstNameHandler = (event) => { setFirstName(event.target.value); }
    const lastNameHandler = (event) => { setLastName(event.target.value); }
    const phoneHandler = (event) => { setPhone(event.target.value); }
    const ageHandler = (event) => { setAge(event.target.value); }

    const lettersRegex = /^[A-Za-z]+$/g ;
    const numberRegex = /^[0-9]*$/ ;

    useEffect(() => {
      if( firstName == '' || firstName.length < 3 || !firstName.match(lettersRegex) )  setFirstNameError("* Please enter a valid First Name")  
      else setFirstNameError('') 
      if( lastName == '' || lastName.length < 3 || !lastName.match(lettersRegex) )  setLastNameError("* Please enter a valid Last Name")  
      else setLastNameError('') 
      if( phone == '' || phone.length < 4 || !phone.match(numberRegex) )  setPhoneError("* Please enter a valid Phone Number")  
      else setPhoneError('') 
      if( age == '' || age.length > 2  )  setAgeError("* Please enter a valid Age")  
      else setAgeError('') 
    }, [firstName, lastName, phone, age]);


    const submitHandler = (event) => {
        event.preventDefault();

        if(!firstNameError == '' || !lastNameError == '' || !phoneError == '' || !ageError == '') { return }

        const submitData = {
            id: props.editID,
            firstname: firstName,
            lastname: lastName,
            phone: phone,
            age: Number(age)
        }

        UpdateFriend({variables: {id: submitData.id, firstname: submitData.firstname, lastname: submitData.lastname, phone: submitData.phone, age: submitData.age } }); 

        props.onClose();
    }

    const UPDATE_FRIEND = gql`
    mutation ($id:ID!, $firstname: String!, $lastname: String!, $phone: String!, $age: Float!) {
      updateFriend ( id: $id, firstname: $firstname, lastname: $lastname, phone: $phone, age: $age )
        {
             id
             firstname
             lastname
             phone
             age
        }
    }
    `;

    const [UpdateFriend, { data, loading, error }] = useMutation(UPDATE_FRIEND);

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    if (!props.open) return null;


  return ReactDOM.createPortal (

    <div className="edit-modal-friend">
      <h3 className="h3-edit-friend">Edit Friend</h3>

      <form className="edit-form-friend" onSubmit={submitHandler}>

        <div className="edit-form-field-friend">
          <label htmlFor="f-name">First Name</label>
          <input type="text" value={firstName} defaultValue={defaultFname} onChange={firstNameHandler} />
          <div className="edit-friend-error"> {firstNameError} </div>
        </div>

        <div className="edit-form-field-friend">
          <label htmlFor="l-name">Last Name</label>
          <input type="text" value={lastName} defaultValue={defaultLname} onChange={lastNameHandler} />
          <div className="edit-friend-error"> {lastNameError} </div>
        </div>

        <div className="edit-form-field-friend">
          <label htmlFor="phone">Phone</label>
          <input type="tel" value={phone} defaultValue={defaultPhone} onChange={phoneHandler} />
          <div className="edit-friend-error"> {phoneError} </div>
        </div>

        <div className="edit-form-field-friend">
          <label htmlFor="age">Age</label>
          <input type="number" value={age} defaultValue={defaultAge} onChange={ageHandler} />
          <div className="edit-friend-error"> {ageError} </div>
        </div>

        <div className="edit-friend-submit-options">
            <button type="submit" className="edit-friend-submit-button"> Update  </button>
            <button onClick={props.onClose} className="edit-friend-cancel-button"> Cancel </button>
        </div>

      </form>
    </div>,
    document.getElementById("edit-root")
  );
};

export default Edit;
