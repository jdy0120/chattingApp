import React from "react";
import User from "./User";

const ConnectedUsers = (props: {
  connectedUsers: { id: string; username: string }[];
}) => {
  return (
    <>
      <h2>Connected User</h2>
      <ul>
        {props.connectedUsers.map((user) => {
          <User key={user.id} user={user} />;
        })}
      </ul>
    </>
  );
};

export default ConnectedUsers;
