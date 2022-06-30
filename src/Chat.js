import { Avatar, IconButton } from '@material-ui/core';
import MoreVert from '@material-ui/icons/MoreVert';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import AttachFile from '@material-ui/icons/AttachFile';
import React, { useEffect, useState } from 'react';
import './Chat.css';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-router-dom';
import  {db}  from './firebase';
import { useStateValue } from './StateProvider';

const Chat = () => {

    const [seed, setseed] = useState("");
    const [input, setinput] = useState("");
    const { roomId } = useParams();
    const [roomName, setroomName] = useState("");
    const [messages, setmessages] = useState([]);

    const [{ user }] = useStateValue();
    console.log("--->",user);

    useEffect(() => {
        if(roomId)
        {
            db.collection("rooms").doc(roomId).onSnapshot((snapshot) => 
            (
                setroomName(snapshot.data().name)
            ))

            db.collection("rooms")
                .doc(roomId)
                .collection("messages")
                .orderBy('timestamp', 'asc')
                .onSnapshot((snapshot) => 
                (
                    setmessages(snapshot.docs.map((doc) => doc.data()))  
                )
            )
        }
    }, [roomId])

    useEffect(() => {
        setseed(Math.floor(Math.random() * 5000));
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection("rooms").doc(roomId).collection("messages").add({
            message: input,
            name: user.displayName,
            timestamp: new Date(),
        });

        setinput("");
    };

    return (
        <div className='chat'>
            <div className='chat_header'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

                <div className='chat_headerInfo'>
                    <h3>{roomName}</h3>
                    <p>Last seen{" "}
                        {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}
                    </p>
                </div>

                <div className='chat_headerRight'>
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className='chat_body'>
                {messages.map((message) => (
                    <p className={`chat_message ${message.name === user.displayName && "chat_receiver"}`}>
                    <span className='chat_name'>
                        {message.name}
                    </span>
                    {message.message}
                    <span className='chat_timestamp'>
                        {new Date(message.timestamp?.toDate()).toUTCString()}
                    </span>
                </p>
                ))}
            </div>

            <div className='chat_footer'>
                <InsertEmoticonIcon />
                <form>
                    <input 
                        type="text" 
                        placeholder='Type a message'
                        value={input}
                        onChange={(e) => setinput(e.target.value)}
                    />
                    <button type='sumbit' onClick={sendMessage}>Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    );
}

export default Chat;