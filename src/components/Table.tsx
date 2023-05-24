import react, { ChangeEvent, useEffect, useState } from 'react';
import '../style/Table.scss';
import CloseIcon from '@mui/icons-material/Close';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import HeightIcon from '@mui/icons-material/Height';


export interface TableProps {
    setWhoWon: React.Dispatch<React.SetStateAction<string>>;
    setEndGame: React.Dispatch<React.SetStateAction<boolean>>;
    restart: number;
}

const Table: React.FC<TableProps> = ({setWhoWon, setEndGame, restart}) => {

    interface Iboards{
        id: number;
        isUsed: boolean;
        icon: JSX.Element
        player: string
    }

    const figure = {
        x: <CloseIcon className='icon'/>,
        o: <CircleOutlinedIcon className='icon'/>,
        none: <span className='icon'/>,
    }

    const board9: Iboards[] = []

    for(let i=0; i<9; i++){
        board9.push({id: i, isUsed: false, icon: figure.none, player: ""})
    }
    
    const [boards, setBoards] = useState<Iboards[]>(board9)
    const [freePlaces, setFreePlaces] = useState<number>(9)
    const [myMove, setMyMove] = useState<number>(0);

    const [whereComputerInput, setWhereComputerInput] = useState<string>('')

    useEffect(()=>{
        setBoards(board9);
        setFreePlaces(9)
        setEndGame(false)
        
    }, [restart])

    const message = (mess: string = "kurwa chuj jebać")=>{
        console.log(mess)
        
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
            }
            else if(boards[3].player==who&&boards[4].player==who&&boards[5].player==who){
                win(who)
            }
            else if(boards[6].player==who&&boards[7].player==who&&boards[8].player==who){
                win(who)
            }
            else if(boards[0].player==who&&boards[3].player==who&&boards[6].player==who){
                win(who)
            }
            else if(boards[1].player==who&&boards[4].player==who&&boards[7].player==who){
                win(who)
            }
            else if(boards[2].player==who&&boards[5].player==who&&boards[8].player==who){
                win(who)
            }
            else if(boards[0].player==who&&boards[4].player==who&&boards[8].player==who){
                win(who)
            }
            else if(boards[2].player==who&&boards[4].player==who&&boards[6].player==who){
                win(who)
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
        setTimeout(() => {
            myMove>0&&computerSelection()
        }, 50);
    }, [myMove])

    const playerMove = (id: number)=>{

        boards.forEach(board=>{
            if(board.id==id){
                if(!board.isUsed){
                    handleClick(id)
                    setMyMove(prev=>prev+1)
                }
                else message()
            }
        })
    }

    const show = boards.map((item, i)=>{
        return(
        <div key={i} onClick={()=>playerMove(i)}>
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
            <button onClick={computerSelection}></button>
            <input type="number" value={whereComputerInput} onChange={handleComputerInputValue} min={0} max={8} />
        </div>
     );
}
 
export default Table;