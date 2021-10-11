import React from "react";
import ReactDOM from "react-dom";
import { useMutation, gql } from '@apollo/client';
import VIEW_FRIENDS from '../DataProccess/QueryFriends';
import "./remove.css";

const Remove = (props) => {
  const deleteHandler = () => {
    deleteFriend({ variables: {id: props.removeID} }); 
  }

  const DELETE_FRIEND = gql`
    mutation($id: ID!){
        deleteFriend(id:$id){
            id
        }
    }
  `;

    const [deleteFriend, { data, loading, error }] = useMutation(DELETE_FRIEND, {
      refetchQueries: [{query: VIEW_FRIENDS}]
    });
    
    if (!props.open) return null;

  return ReactDOM.createPortal(
    <div className="remove-modal-fiends">
      <div className="remove-modal-fiends-text">
        <p>  Are you sure you want to delete <b> {props.removeName} ? </b>  </p>
      </div>
      <div className="remove-modal-fiends-options">
        <button className="remove-modal-fiends-onDelete" onClick={ () => { deleteHandler(); props.onClose(); }}> Delete </button>
        <button onClick={ () => {props.onClose();} } > Cancel </button>
      </div>
    </div>,
    document.getElementById("delete-root")
  );
};

export default Remove;
