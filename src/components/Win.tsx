import React, { useEffect, useState } from "react";
import '../style/Win.scss';

export interface WinProps {
    whoWon: string; //computer
    setRestart: React.Dispatch<React.SetStateAction<number>>;
}

const Win: React.FC<WinProps> = ({whoWon, setRestart}) => {

    const [won, setWon] = useState('DRAW')

    useEffect(()=>{
        setWon(whoWon)
    }, [])


    const win = (
        <>
            <h1>Gratulacje</h1>
            <p>Udało ci się kurwa wygrać, zajebiście stary dobrze w hóóóóó∆j</p>
        </>
    )

    const lose = (
        <>
            <h1>Zjebałeś</h1>
            <p>Hójowo ci poszło stary kurwa japierdole tak zjebać jak pizda jebana kurwa, załosne w hój naprawde kurwa</p>
        </>
    )
    const draw = (
        <>
            <h1>Remis</h1>
            <p>I ty i computer, obaj tacy sami kurwa zjebany jesteście xD, pizdy i tyle xD</p>
        </>
    )

    const getElement = ()=>{
        // console.log(won)
        if(won=="PLAYER")return win
        if(won=="COMPUTER")return lose
        else return draw
    }

    const handleRestart = ()=>{
        setRestart(prev=>prev+1)
    }


    return ( 
        <div className='win'>
            {getElement()}
            
            <button onClick={handleRestart}>Zagraj jeszcze raz stary</button>
        </div>
     );
}
 
export default Win;