import React, {useState, useEffect} from 'react'
import './App.css'
import Api from './Api'

import Login from './components/Login'
import ChatListItem from './components/ChatListItem';
import ChatIntro from './components/ChatIntro';
import ChatWindow from './components/ChatWindow';
import NewChat from './components/NewChat'

import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';

export default () => {

  const [chatList, setChatList] = useState([])
  const [activeChat, setactiveChat] = useState({})
  const [user, setUser] = useState({id: 'QV60ERlw9yQhzSGDU3VRI8Egv9V2', name: 'Renato Ruis', avatar: 'https://lh3.googleusercontent.com/a-/AOh14Gj5Z88BF6Z_-pgSxh5pFdPRqT4z54Piq65Co-9nqS0=s96-c'})

  const [showNewChat, setshowNewChat] = useState(false)

  const handleNewChat = () => {
    setshowNewChat(true)
  }

  const handleLoginData = async (u) => {
    let newUser = {
      id: u.uid,
      name: u.displayName,
      avatar: u.photoURL
    }
    console.log(u)
    await Api.addUser(newUser)
    setUser(newUser)
  }

  if(user === null){
    return (<Login onReceive={handleLoginData} />)
  }

  return (

    <div className="app-window">
      <div className="sidebar">
        <NewChat
        chatList={chatList}
        user={user}
        show={showNewChat}
        setShow={setshowNewChat}
        />
          <header>
            <img className="header--avatar" src={user.avatar} alt="" />
            <div className="header--buttons">
              <div className="header--btn">
                <DonutLargeIcon style={{color: '#919191'}} />
              </div>
              <div className="header--btn"
                onClick={handleNewChat}
              >
                <ChatIcon style={{color: '#919191'}} />
              </div>
              <div className="header--btn">
                <MoreVertIcon style={{color: '#919191'}} />
              </div>
            </div>
          </header>
          <div className="search">
            <div className="search--input">
              <SearchIcon fontSize="small" style={{color: '#919191'}} />
              <input type="search" placeholder="Procurar ou começar uma nova conversa" />
            </div>
          </div>
          <div className="chatlist">
            {chatList.map((item, key)=>(
              <ChatListItem
                key={key}
                data={item}
                active={activeChat.chatId === chatList[key].chatId}
                onClick={()=>setactiveChat(chatList[key])}
              />
            ))}
          </div>
      </div>
      <div className="contentarea">
        {activeChat.chatId !== undefined &&
          <ChatWindow
          user={user}/>
        }

        {activeChat.chatId == undefined &&
          <ChatIntro />
        }

      </div>
    </div>

  )
}