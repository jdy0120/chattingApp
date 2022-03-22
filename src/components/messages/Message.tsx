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
          <a>{Date.now()}</a>
        </div>
        <p>{props.message.message}</p>
      </li>
    </>
  );
};

export default Message;
