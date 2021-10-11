import React, {useState} from "react";
import { useQuery } from "@apollo/client";

import VIEW_COLLEAGUES from "../DataProccess/QueryColleagues";
import Edit from '../Actions/edit';
import Remove from '../Actions/remove';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons'

import './ViewColleagues.css';

const ViewColleauges = () => {

    const [editModal, setEditModal] = useState(false);
    const [editID, setEditID] = useState('');
    const [editFname, setEditFname] = useState('');
    const [editLname, setEditLname] = useState('');
    const [editPhone, setEditPhone] = useState([]);
    const [editEmail, setEditEmail] = useState([]);

    const [removeModal, setRemoveModal] = useState(false);
    const [removeID, setRemoveID] = useState([]);
    const [removeName, setRemoveName] = useState('');

    const { data, loading, error } = useQuery(VIEW_COLLEAGUES);

    if(loading || error) return (
        <div className="view-colleagues">
            <h2>Colleagues</h2>

            <div className="colleagues-board">
                <div className="colleagues-list"></div>
            </div>
        </div>
    )
    
    return(
        <div className="view-colleagues">
            <h2>My Colleagues</h2>

            <div className="colleagues-board" >
                <div className="colleagues-list">

                    {data.colleagues.map(({ id, firstName, lastName, phone, email }) => (
                            
                            <ul key={id}>
                                <li>{firstName}</li>
                                <li>{lastName}</li>
                                <li>{email}</li>
                                <li>{phone}</li>

                                <div className="colleagues-actions">
                                    <div className="colleague-action"
                                        onClick={ () => { 
                                            setEditModal(true); 
                                            setEditID(id);
                                            setEditFname(firstName);
                                            setEditLname(lastName);
                                            setEditPhone(phone);
                                            setEditEmail(email);
                                        } } 
                                    >
                                        <FontAwesomeIcon icon={faEdit} className="icon" />
                                    </div>

                                    <div className="colleague-action" 
                                         onClick={ () => { setRemoveModal(true); setRemoveID(id); setRemoveName(firstName + ' ' + lastName) } } 
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
                  editEmail={editEmail}
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

export default ViewColleauges;