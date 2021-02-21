import React, {useState, useEffect} from 'react'
import './NewChat.css'
import Api from '../Api.js'

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default ({chatList, user, show, setShow}) => {

  const [list, setList] = useState([])

  useEffect(()=>{
    const getList = async () => {
      if(user !== null){
        let results = await Api.getContactList(user.id)
        setList(results)
      }
    }
    getList()
  }, [user])



  const handleClose = () => {
    setShow(false)
  }

  const addNewChat = async (user2) => {
    await Api.addNewChat(user, user2)
    handleClose();
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
          <div className="newChat--item" key={key} onClick={()=>addNewChat(item)}>
            <img className="newChat--itemavatar" src={item.avatar} alt="" />
            <div className="newChat--itemname">{item.name}</div>
          </div>
        ))}
      </div>

    </div>
  )
  }