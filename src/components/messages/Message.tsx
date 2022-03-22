import Moment from "react-moment";
import React from "react";

const Message = (props: {
  message: { message: string; username: string };
  username: string;
}) => {
  const messageReceived = props.message.username !== props.username;

  return (
    <>
      <li>
        <div>
          <span>{props.message.username}</span>
          <Moment format="MM/DD/YYYY h:m">{Date.now()}</Moment>
        </div>
        <p>{props.message.message}</p>
      </li>
    </>
  );
};

export default Message;
