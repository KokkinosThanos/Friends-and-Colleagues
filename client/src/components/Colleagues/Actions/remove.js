import React from "react";
import ReactDOM from "react-dom";
import { useMutation, gql } from '@apollo/client';
import VIEW_COLLEAGUES from "../DataProccess/QueryColleagues";
import "./remove.css";

const Remove = (props) => {

  const deleteHandler = () => {
    deleteColleague({ variables: {id: props.removeID} }); 
  }
  
  const DELETE_COLLEAGUE = gql`
    mutation($id: ID!){
      deleteColleague(id:$id){
            id
        }  
    }
  `;

    const [deleteColleague, { data, loading, error }] = useMutation(DELETE_COLLEAGUE, {
      refetchQueries: [ {query: VIEW_COLLEAGUES} ]
    });
    
    if (!props.open) return null;

  return ReactDOM.createPortal(
    <div className="remove-modal-colleague">
      <div className="remove-modal-text-colleague">
        <p> Are you sure you want to delete <b> {props.removeName} ? </b> </p>
      </div>
      <div className="remove-modal-options-colleague">
        <button className="onDelete-colleague" onClick={() => { deleteHandler(); props.onClose(); }}> Delete </button>
        <button onClick={ () => {props.onClose();}}> Cancel </button>
      </div>
    </div>,
    document.getElementById("delete-root")
  );
};

export default Remove;
