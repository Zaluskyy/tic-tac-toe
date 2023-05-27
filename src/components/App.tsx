import React, { useEffect, useState } from 'react';
import '../style/App.scss';
import Table from './Table';
import Win from './Win';
import Message from './Message';
import { AnimatePresence } from 'framer-motion';


const App: React.FC = () => {

  interface AppProps{
    whoWon: string;
    endGame: boolean;
    restart: number;
    message: number;
  }

  const [whoWon, setWhoWon] = useState<string>('DRAW')
  const [endGame, setEndGame] = useState<boolean>(false)
  const [restart, setRestart] = useState<number>(0)
  const [message, setMessage] = useState<string>('')

  const [devMode, setDevMode] = useState<boolean>(false)

  const handleKeyReset = (e: KeyboardEvent)=>{
    

    if(e.key==' '||e.key=='q'){
      setRestart(prev=>prev+1)

    }
  }


  useEffect(()=>{
    document.body.addEventListener('keydown', handleKeyReset)
  }, [])

  return ( 
    <div className='App' 
    // onClick={()=>setMessage("Jebać kurwy policyjne stary")}
    >
      <Table setWhoWon={setWhoWon} endGame={endGame} setEndGame={setEndGame} restart={restart} devMode={devMode} setMessage={setMessage} />
      <AnimatePresence>
        {message!==''&&<Message message={message} setMessage={setMessage}/>}
      </AnimatePresence>
      {endGame&&<Win whoWon={whoWon} setRestart={setRestart}/>}
      <span className={devMode?'restart':'vanish'} onClick={()=>setRestart(prev=>prev+1)}>Restart</span>
      <div className='devMode'>
        <span>Off</span>
        <div className={devMode?'devModeSwitch on':'devModeSwitch'} onClick={()=>setDevMode(prev=>!prev)} >
          <div className={devMode?'devOn ball':'ball'}></div>
        </div>
        <span>On</span>
      </div>
    </div>
   );
}
 
export default App;