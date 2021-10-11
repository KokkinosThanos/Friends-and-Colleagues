import React, {useState} from 'react';
import { useQuery } from "@apollo/client";

import VIEW_FRIENDS from '../DataProccess/QueryFriends';
import Edit from '../Actions/edit';
import Remove from '../Actions/remove';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons'

import './ViewFriends.css';

const ViewFriends = () => {

    const [editModal, setEditModal] = useState(false);
    const [editID, setEditID] = useState('');
    const [editFname, setEditFname] = useState('');
    const [editLname, setEditLname] = useState('');
    const [editPhone, setEditPhone] = useState([]);
    const [editAge, setEditAge] = useState([]);

    const [removeModal, setRemoveModal] = useState(false);
    const [removeID, setRemoveID] = useState([]);
    const [removeName, setRemoveName] = useState('');

    const { loading, error, data } = useQuery(VIEW_FRIENDS);

    if (loading || error) return (
        <div className="view-friends">
            <h2>Friends</h2>

            <div className="friend-board">
                <div className="friends-list"></div>
            </div>
        </div>
    );


    return(
        <div className="view-friends">
            <h2>My Friends</h2>

            <div className="friend-board">
                <div className="friends-list">

                    {data.friends.map(({ id, firstname, lastname, phone, age }) => (
                            <ul key={id}>
                                <li>{firstname}</li>
                                <li>{lastname}</li>
                                <li>{age}</li>
                                <li>{phone}</li>

                                <div className="friends-actions">
                                    <div className="friend-action"
                                        onClick={ () => { 
                                            setEditModal(true); 
                                            setEditID(id);
                                            setEditFname(firstname);
                                            setEditLname(lastname);
                                            setEditPhone(phone);
                                            setEditAge(age);
                                        } } 
                                    >

                                        <FontAwesomeIcon icon={faEdit} className="icon" />
                                    </div>

                                    <div className="friend-action" 
                                         onClick={ () => { 
                                             setRemoveModal(true); 
                                             setRemoveID(id); 
                                             setRemoveName(firstname + ' ' + lastname) 
                                         } } 
                                    >
                                        <FontAwesomeIcon icon={faTrashAlt} className="icon" />
                                    </div>

                                </div>

                            </ul>
                    ))}
                </div>           
            </div>

            <Edit open={editModal}
                  editID={editID}
                  editFname={editFname}
                  editLname={editLname}
                  editPhone={editPhone}
                  editAge={editAge}
                  onClose={ () => setEditModal(false) }  
            />

            <Remove open={removeModal} 
                    removeID={removeID} 
                    removeName={removeName} 
                    onClose={ () => setRemoveModal(false) }  
            />
            
        </div>
    )
}

export default ViewFriends;