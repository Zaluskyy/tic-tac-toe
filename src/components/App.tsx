import React, { useEffect, useState } from 'react';
import '../style/App.scss';
import Table from './Table';
import Win from './Win';


const App: React.FC = () => {

  interface AppProps{
    whoWon: string;
    endGame: boolean;
    restart: number;
  }

  const [whoWon, setWhoWon] = useState<string>('DRAW')
  const [endGame, setEndGame] = useState<boolean>(true)
  const [restart, setRestart] = useState<number>(0)

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
    <div className='App'>
      <Table setWhoWon={setWhoWon} endGame={endGame} setEndGame={setEndGame} restart={restart} devMode={devMode} />
      {/* TUTAJ BĘDĄ WIADOMOŚCI STARY KURWA JAPIERODLE KURWA */}
      {/* <Message/> */}
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


//devMode?'restart'