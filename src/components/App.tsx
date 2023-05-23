import React, { useState } from 'react';
import '../style/App.scss';
import Table from './Table';
import Win from './Win';


const App: React.FC = () => {

  const [whoWon, setWhoWon] = useState('DRAW')
  const [endGame, setEndGame] = useState(false)

  return ( 
    <div className='App'>
      <Table setWhoWon={setWhoWon} setEndGame={setEndGame}/>
      {/* TUTAJ BĘDĄ WIADOMOŚCI STARY KURWA JAPIERODLE KURWA */}
      {/* <Message/> */}
      {endGame&&<Win whoWon={whoWon}/>}
    </div>
   );
}
 
export default App;