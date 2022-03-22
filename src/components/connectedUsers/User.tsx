import React from "react";

const User = (props: { user: { id: string; username: string } }) => {
  return (
    <li>
      <span>{props.user.username}</span>
    </li>
  );
};

export default User;
