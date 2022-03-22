import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import ConnectedUsers from "./components/connectedUsers/ConnectedUsers";
import EnterUsername from "./components/EnterUsername";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:3001";

const socket = io(ENDPOINT);

function App() {
  const [connectedUsers, setConnectedUsers] = useState(
    [] as { id: string; username: string }[]
  );
  const [username, setUsername] = useState("");
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState(
    [] as { message: string; username: string }[]
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (socket.connected) {
      socket.on("username-submitted-successfully", () => {
        setConnected(true);
      });

      socket.on("username-taken", () => {
        toast.error("Username is taken");
      });

      socket.on(
        "get-connected-users",
        (connectedUsers: { id: string; username: string }[]) => {
          setConnectedUsers(
            connectedUsers.filter((user) => user.username !== username)
          );
        }
      );

      socket.on(
        "receive-message",
        (message: { message: string; username: string }) => {
          setMessages((prev) => [...prev, message]);
        }
      );
    }

    return () => {
      socket.disconnect();
    };
  }, [username]);

  const handleConnection = () => {
    if (socket) {
      socket.emit("handle-connection", username);
    }
  };

  const handleSendMessage = () => {
    if (socket.connected) {
      setMessages((prev) => [...prev, { message, username }]);
      socket.emit("message", { message, username });
      setMessage("");
    }
  };

  return (
    <div>
      {!connected && (
        <EnterUsername
          handleConnection={handleConnection}
          username={username}
          setUsername={setUsername}
        />
      )}
    </div>
  );
}

export default App;
