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
  const [endGame, setEndGame] = useState<boolean>(false)
  const [restart, setRestart] = useState<number>(0)

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
      <Table setWhoWon={setWhoWon} setEndGame={setEndGame} restart={restart} />
      {/* TUTAJ BĘDĄ WIADOMOŚCI STARY KURWA JAPIERODLE KURWA */}
      {/* <Message/> */}
      {endGame&&<Win whoWon={whoWon} setRestart={setRestart}/>}
      <span className='restart' onClick={()=>setRestart(prev=>prev+1)}>Restart</span>
    </div>
   );
}
 
export default App;