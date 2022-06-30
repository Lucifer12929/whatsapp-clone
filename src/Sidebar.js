import React, { useEffect, useState } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from "@material-ui/icons/MoreVert";
import './Sidebar.css';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import SidebarChat from './SidebarChat';
import {db} from './firebase';
import { useStateValue } from './StateProvider';

const Sidebar = () => {
    const [rooms, setrooms] = useState([]);
    const [{ user }] = useStateValue();

    useEffect(() => { 
        const unsubscribe = db.collection("rooms").onSnapshot((snap) => 
            setrooms(
                snap.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
         )

        return () => {
            unsubscribe();
        }
    }, [])
        
    console.log(rooms);

    return (
        <div className='sidebar'>
            <div className='sidebar_header'>
                <Avatar src={user?.photoURL}/>
                <div className='sidebar_headerright'>
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className='sidebar_search'>
                <div className='sidebar_searchContainer'>
                    <SearchOutlined />
                    <input placeholder='Search or start new chat' type='text' />
                </div>
            </div>
            
            <div className='sidebar_chats'>
                <SidebarChat  addNewChat />
                {
                    rooms.map((room) => (
                        <SidebarChat id={room.id} key={room.id} name= {room.data.name} />
                    ))
                }
            </div>
        </div>
    );
}

export default Sidebar;
