import React, {useState, useEffect} from 'react'
import './NewChat.css'

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default ({chatList, user, show, setShow}) => {

  const [list, setList] = useState([
    {id: 2, avatar: 'https://static.toiimg.com/photo/76729750.cms', name: 'Fulano da Silva'},
    {id: 3, avatar: 'https://static.toiimg.com/photo/76729750.cms', name: 'Fulano da Silva'},
    {id: 4, avatar: 'https://static.toiimg.com/photo/76729750.cms', name: 'Fulano da Silva'},
  ])



  const handleClose = () => {
    setShow(false)
  }
  return (
    <div className="newChat" style={{left: show?0:-415}}>
      <div className="newChat--head">
        <div className="newChat--backbutton" onClick={handleClose}>
          <ArrowBackIcon style={{color: '#fff'}} />
        </div>
        <div className="newChat--headtitle">Nova Conversa</div>
      </div>
      <div className="newChat--list">
        {list.map((item, key)=>(
          <div className="newChat--item" key={key}>
            <img className="newChat--itemavatar" src={item.avatar} alt="" />
            <div className="newChat--itemname">{item.name}</div>
          </div>
        ))}
      </div>

    </div>
  )
  }