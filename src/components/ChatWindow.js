import React, {useState, useEffect, useRef} from 'react'
import './ChatWindow.css'

import MessageItem from './MessageItem.js'
import EmojiPicker from 'emoji-picker-react'

import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import MicIcon from '@material-ui/icons/Mic';


export default ({user}) => {

  const body = useRef()

  let recognition = null;
  let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

  if(SpeechRecognition !== undefined) {
    recognition = new SpeechRecognition()
  }

  const [emojiOpen, setEmojiOpen] = useState(false);
  const [text, setText] = useState('');
  const [listening, setListening] = useState(false);
  const [list, setList] = useState([
    {author: 1, body: 'Mensagem teste 1'},
    {author: 1, body: 'Mensagem teste 2 Mensagem teste 2 '},
    {author: 2, body: 'Mensagem teste 3 Mensagem teste 3 Mensagem teste 3 '},
    {author: 1, body: 'Mensagem teste 2 Mensagem teste 2 '},
    {author: 2, body: 'Mensagem teste 3 Mensagem teste 3 Mensagem teste 3 '},
    {author: 1, body: 'Mensagem teste 2 Mensagem teste 2 '},
    {author: 2, body: 'Mensagem teste 3 Mensagem teste 3 Mensagem teste 3 '},
    {author: 1, body: 'Mensagem teste 2 Mensagem teste 2 '},
    {author: 2, body: 'Mensagem teste 3 Mensagem teste 3 Mensagem teste 3 '},
    {author: 1, body: 'Mensagem teste 2 Mensagem teste 2 '},
    {author: 2, body: 'Mensagem teste 3 Mensagem teste 3 Mensagem teste 3 '},
    {author: 1, body: 'Mensagem teste 2 Mensagem teste 2 '},
    {author: 2, body: 'Mensagem teste 3 Mensagem teste 3 Mensagem teste 3 '},
    {author: 1, body: 'Mensagem teste 2 Mensagem teste 2 '},
    {author: 2, body: 'Mensagem teste 3 Mensagem teste 3 Mensagem teste 3 '},
    {author: 1, body: 'Mensagem teste 2 Mensagem teste 2 '},
    {author: 2, body: 'Mensagem teste 3 Mensagem teste 3 Mensagem teste 3 '},
    {author: 1, body: 'Mensagem teste 2 Mensagem teste 2 '},
    {author: 2, body: 'Mensagem teste 3 Mensagem teste 3 Mensagem teste 3 '},
    {author: 1, body: 'Mensagem teste 2 Mensagem teste 2 '},
    {author: 2, body: 'Mensagem teste 3 Mensagem teste 3 Mensagem teste 3 '},

  ]);

  useEffect(()=>{
    if(body.current.scrollHeight > body.current.offsetHeight){
      body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight
    }
  }, [list])

  const handleEmojiClick = (e, emojiOject) => {
    setText( text + emojiOject.emoji )
  }

  const handleOpenEmoji = () => {
    setEmojiOpen(true)
  }

  const handleoCloseEmoji = () => {
    setEmojiOpen(false)
  }

  const handleSendClick = () => {

  }

  const handleMicClick = () => {
    if(recognition !== null ){

      recognition.onstart = () => {
        setListening(true)
      }
      recognition.onend = () => {
        setListening(false)
      }
      recognition.onresult = (e) => {
        setText(e.results[0][0].transcript)
      }

      recognition.start()

    }
  }

  return (
    <div className="chatWindow">
      <div className="chatWindow--header">
        <div className="chatWindow-headerinfo">
            <img className="chatWindow--avatar" src="https://static.toiimg.com/photo/76729750.cms" alt="" />
            <div className="chatWindow--name"> Fulano </div>
        </div>
        <div className="chatWindow--headerbuttons">
          <div className="chatWindow--btn">
            <SearchIcon style={{color: '#919191' }} />
            <AttachFileIcon style={{color: '#919191' }}/>
            <MoreVertIcon style={{color: '#919191' }}/>
          </div>
        </div>
      </div>
      <div ref={body} className="chatWindow--body">

        {list.map((item, key)=>(
          <MessageItem
            key={key}
            data={item}
            user={user}
          />
        ))}

      </div>

      <div className="chatWindow-emojiarea"
      style={{height: emojiOpen ? '300px' : '0px'}}>
        <EmojiPicker
          onEmojiClick={handleEmojiClick}
          disableSearchBar
          disableSkinTonePicker
          />
      </div>

      <div className="chatWindow--footer">
          <div className="chatWindow--pre">

              <div
              className="chatWindow--btn"
              onClick={handleoCloseEmoji}
              style={{width: emojiOpen?40:0}}
              >
                <CloseIcon style={{color: '#919191' }} />
              </div>

              <div
              className="chatWindow--btn"
              onClick={handleOpenEmoji}
              >
                <InsertEmoticonIcon style={{color: emojiOpen?'#009688':'#919191' }} />
              </div>


          </div>

          <div className="chatWindow--inputarea">
            <input
              type="text"
              className="chatWindow-input"
              placeholder="Digite uma mensagem..."
              value={text}
              onChange={e=>setText(e.target.value)}
            />
          </div>
          <div className="chatWindow--pos">
            { text === '' &&
                      <div
                      className="chatWindow--btn"
                      onClick={handleMicClick}

                      >
                        <MicIcon style={{color: listening?'#126ece':'#919191' }} />
                  </div>

            }
            { text !== '' &&
                <div
                className="chatWindow--btn"
                onClick={handleSendClick}

                >
                  <SendIcon style={{color: '#919191' }} />
            </div>
            }



          </div>
      </div>
    </div>
  )
  }