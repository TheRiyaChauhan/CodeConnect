import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';

const Chat = () => {

     const { targetUserId } = useParams();
     const [messages, setMessages] = useState([]);
     const [newMessage, setNewMessage] = useState("");
     

    const user = useSelector((store) => store.user);
    const userId = user?._id;

     const fetchChatMessages = async () => {
        const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
          withCredentials: true,
        });

      console.log(chat.data.messages);

      const chatMessages = chat?.data?.messages.map((msg) => {
        const { senderId, text } = msg;
        return {
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          text,
        };
      });
      setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);


     useEffect(() => {
        if (!userId || !targetUserId) return;
        
        const socket = createSocketConnection();

        socket.emit("joinChat", {firstName:user.firstName, userId , targetUserId });

         socket.on("messageReceived", ({ firstName, lastName, text }) => {
          console.log(firstName + " :  " + text);
          setMessages((messages) => [...messages, { firstName, lastName, text }]);
        });

        return () => {
        socket.disconnect();
    };
     },[ userId , targetUserId])


     const sendMessage = () => {
       const socket = createSocketConnection();

      socket.emit("sendMessage", {
        firstName: user.firstName,
        lastName: user.lastName,
        userId,
        targetUserId,
        text: newMessage,
      });
      setNewMessage("");
  };



  return (
      <div className="w-full md:w-3/4 mx-auto rounded-2xl m-5 h-[75vh] flex flex-col shadow-xl border border-pink-200 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      
      {/* Header */}
      <h1 className="p-4 border-b border-pink-200 bg-pink-100 rounded-t-2xl font-semibold text-lg text-gray-700 shadow-sm">
        Chat with {targetUserId}
      </h1>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => {
          return (
            <div key={index} className={
                "chat " +
                (user.firstName === msg.firstName ? "chat-end" : "chat-start")
              }>
              <div className="chat-header text-gray-500 font-medium">
                {`${msg.firstName}  ${msg.lastName}`}
                <time className="text-xs opacity-50 ml-2">2 hours ago</time>
              </div>
              <div
                className={`chat-bubble rounded-2xl shadow-md ${
                  index % 3 === 0
                    ? "bg-pink-200 text-gray-700"
                    : index % 3 === 1
                    ? "bg-green-200 text-gray-700"
                    : "bg-purple-200 text-gray-700"
                }`}
              >
                {msg.text}
              </div>
              <div className="chat-footer opacity-50 text-xs text-gray-500">
                Seen
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Input */}
      <div className="p-4 border-t border-pink-200 bg-white rounded-b-2xl flex items-center gap-2 shadow-inner">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="input flex-1 rounded-full border border-pink-300 focus:border-pink-400 focus:ring-pink-200 bg-pink-50 text-gray-700 placeholder-gray-400"
          placeholder="Type a cute message..."
        />
        <button  onClick={sendMessage}  className="btn rounded-full px-6 bg-pink-300 hover:bg-pink-400 text-white shadow-md">
          Send
        </button>
      </div>
    </div>
  )
}

export default Chat
