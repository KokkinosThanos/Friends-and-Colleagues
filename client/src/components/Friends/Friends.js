import React from "react";

import AddFriends from "./Presentation/AddFriends";
import ViewFriends from "./Presentation/ViewFriends";

import "./Friends.css";

const Friends = () => {
  return (
    <div className="friends-field">
      <AddFriends />
      <ViewFriends />
    </div>
  );
};

export default Friends;
