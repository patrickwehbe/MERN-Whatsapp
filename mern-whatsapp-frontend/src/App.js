import React, { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./Sidebar.js";
import Chat from "./Chat.js";
import Pusher from "pusher-js";
import axios from "./axios";

function App() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    axios.get("/messages/sync").then((response) => {
      console.log(response.data);
    });
  }, []);

  useEffect(() => {
    var pusher = new Pusher("e5f2ec6decf14306ba9d", {
      cluster: "eu",
    });

    var channel = pusher.subscribe("my-channel");
    channel.bind("my-event", function (data) {
      alert(JSON.stringify(data));
    });
  }, []);

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default App;
