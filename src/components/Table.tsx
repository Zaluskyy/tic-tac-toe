import react, { ChangeEvent, useEffect, useState } from 'react';
import '../style/Table.scss';
import CloseIcon from '@mui/icons-material/Close';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

import { motion } from 'framer-motion';
import React from 'react';


export interface TableProps {
    setWhoWon: React.Dispatch<React.SetStateAction<string>>;
    endGame: boolean;
    setEndGame: React.Dispatch<React.SetStateAction<boolean>>;
    restart: number;
    devMode: boolean;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const Table: React.FC<TableProps> = ({setWhoWon, endGame, setEndGame, restart, devMode, setMessage}) => {

    interface Iboards{
        id: number;
        isUsed: boolean;
        icon: JSX.Element
        player: string
    }

    const dropIn = {
        hidden: {
            opacity: 0,
            y: -10,
            
        },
        visible: {
            opacity: 1,
            y: 0,
            rotateY: 180,
            transition:{
                duration: .01,
                type: "spring",
                damping: 25,
            }
        }
    }

    const figure = {
        x: <motion.div variants={dropIn} initial="hidden" animate="visible"  ><CloseIcon className='icon player'/></motion.div>,
        o: <motion.div transition={{delay: 0.92}} variants={dropIn} initial="hidden" animate="visible" ><CircleOutlinedIcon className='icon computer'/></motion.div>,
        none: <span className='icon'/>,
    }

    const board9: Iboards[] = []

    for(let i=0; i<9; i++){
        board9.push({id: i, isUsed: false, icon: figure.none, player: ""})
    }
    
    const [boards, setBoards] = useState<Iboards[]>(board9)
    const [freePlaces, setFreePlaces] = useState<number>(9)
    const [myMove, setMyMove] = useState<number>(0);
    const [winLineCase, setWinLineCase] = useState<number>(2)

    const [whereComputerInput, setWhereComputerInput] = useState<string>('')

    useEffect(()=>{
        setBoards(board9);
        setFreePlaces(9)
        setEndGame(false)
        setWinLineCase(0)
        
    }, [restart])

    const message = (mess: string)=>{
        setMessage(mess)
        
    }

    const win = (whoWon: string)=>{
        setWhoWon(whoWon)
        setEndGame(true)        
    }

    useEffect(()=>{
        let who = "PLAYER"

        const checkIfWin = ()=>{

            if(boards[0].player==who&&boards[1].player==who&&boards[2].player==who){
                win(who)
                !endGame&&setWinLineCase(1)
            }
            else if(boards[3].player==who&&boards[4].player==who&&boards[5].player==who){
                win(who)
                !endGame&&setWinLineCase(2)
            }
            else if(boards[6].player==who&&boards[7].player==who&&boards[8].player==who){
                win(who)
                !endGame&&setWinLineCase(3)
            }
            else if(boards[0].player==who&&boards[3].player==who&&boards[6].player==who){
                win(who)
                !endGame&&setWinLineCase(4)
            }
            else if(boards[1].player==who&&boards[4].player==who&&boards[7].player==who){
                win(who)
                !endGame&&setWinLineCase(5)
            }
            else if(boards[2].player==who&&boards[5].player==who&&boards[8].player==who){
                win(who)
                !endGame&&setWinLineCase(6)
            }
            else if(boards[0].player==who&&boards[4].player==who&&boards[8].player==who){
                win(who)
                !endGame&&setWinLineCase(7)
            }
            else if(boards[2].player==who&&boards[4].player==who&&boards[6].player==who){
                win(who)
                !endGame&&setWinLineCase(8)
            }

            if(who=="PLAYER"){
                who='COMPUTER'
                checkIfWin()
            }
        }
        setTimeout(() => {
            checkIfWin()
        }, 50);
        const goDraw = ()=>{
            if(freePlaces==0){
                win("DRAW")
            }
        }
        setTimeout(() => {
            goDraw()
        }, 60);
        
    }, [boards])

    const handleClick = (id: number, player: boolean = true)=>{
        setBoards(boards.map(board=>{
            if(board.id==id){
                setFreePlaces(prev=>prev-1)
                return{...board, isUsed: true, icon: player?figure.x: figure.o, player: player?"PLAYER":"COMPUTER"}
            }
            else{
                return board
            }
        }))        
    }

    const random = ()=>{
        return Math.floor(Math.random()*9)
    }

    const computerSelection = ()=>{
        
        const getNumber = ()=>{
            if(freePlaces>0){
                let randomNumber: number|string
                if(whereComputerInput==''){
                    randomNumber = random()
                }else{
                    randomNumber = whereComputerInput
                    setWhereComputerInput("")
                }

                boards.forEach(board=>{
                    if(board.id==randomNumber){
                        if(!board.isUsed){
                            handleClick(board.id, false)
                        }
                        else getNumber()
                    }
                })
            }
        }
        getNumber()
    }

    useEffect(()=>{
        if(!endGame){
            setTimeout(() => {
                myMove>0&&computerSelection()
            }, 100);////kurwaaaaa
        }
    }, [myMove])

    const playerMove = (id: number)=>{

        boards.forEach(board=>{
            if(board.id==id){
                if(!board.isUsed){
                    handleClick(id)
                    setMyMove(prev=>prev+1)
                }
                else message("Niewłaściwy ruch stary")
            }
        })
    }

    const show = boards.map((item, i)=>{
        return(
        <div className='panel' key={i} onClick={()=>playerMove(i)}>
            {item.icon}
        </div>
        )
    })

    const handleComputerInputValue = (e: ChangeEvent<HTMLInputElement>)=>{
        setWhereComputerInput(e.target.value)
        console.log(whereComputerInput);
    }

    return ( 
        <div className='table'>
            {show}
            

            {/* developer mode */}
            <button onClick={computerSelection} className={!devMode?"vanish":""} ></button>
            <input type="number" value={whereComputerInput} onChange={handleComputerInputValue} min={0} max={8} className={!devMode?"vanish":""} />
            <div className={`winLine case${winLineCase} `} />
        </div>
     );
}
 
export default Table;