import React, { useEffect, useState } from "react";
import '../style/Win.scss';

import CloseIcon from '@mui/icons-material/Close';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

import { motion } from "framer-motion";

export interface WinProps {
    whoWon: string;
    setRestart: React.Dispatch<React.SetStateAction<number>>;
}

const Win: React.FC<WinProps> = ({whoWon, setRestart}) => {

    const appear = {
        hidden:{
            opacity: 0,
        },
        visible:{
            opacity: 1,
        }
    }
    const rotate = {
        hidden:{
            scale: 0
        },
        visible:{
            // scale: [1, 0.5, 1.2],
            scale: 1,
            rotateZ: 180,
            rotateY: 360,
            rotateX: 360,
            transition:{
                duration: 0.8,
                // delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01]
              }
        }
    }

    const [won, setWon] = useState<string>('DRAW')

    useEffect(()=>{
        setWon(whoWon)
    }, [])

    // const win = (
    //     <>
    //         <h1>Gratulacje</h1>
    //         <p>Udało ci się kurwa wygrać, zajebiście stary dobrze w hóóóóó∆j</p>
    //     </>
    // )
    // const lose = (
    //     <>
    //         <h1>Zjebałeś</h1>
    //         <p>Hójowo ci poszło stary kurwa japierdole tak zjebać jak pizda jebana kurwa, załosne w hój naprawde kurwa</p>
    //     </>
    // )
    // const draw = (
    //     <>
    //         <h1>Remis</h1>
    //         <p>I ty i computer, obaj tacy sami kurwa zjebany jesteście xD, pizdy i tyle xD</p>
    //     </>
    // )

    // const getElement = ()=>{
    //     if(won=="PLAYER")return win
    //     if(won=="COMPUTER")return lose
    //     else return draw
    // }

    const getFigure = ()=>{
        if(won=="PLAYER") return <CloseIcon className='wonFigure'/>
        else if(won=="COMPUTER") return <CircleOutlinedIcon className='wonFigure'/>
        else return <div className="both"><CloseIcon className='wonFigure'/><CircleOutlinedIcon className='wonFigure'/></div>
    }

    const handleRestart = ()=>{
        setRestart(prev=>prev+1)
    }

    return ( 
        <motion.div className='win' onClick={handleRestart} variants={appear} initial="hidden" animate="visible">
            <div className="zero7">
                
                {/* {getElement()} */}
                
                {/* <button onClick={handleRestart}>Zagraj jeszcze raz</button> */}
            </div>

            <motion.div className="wonFigureContainer"
            variants={rotate} initial="hidden" animate="visible"
            >
            {getFigure()}
            </motion.div>
        </motion.div>
     );
}

export default Win;