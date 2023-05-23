import react, { useEffect, useState } from 'react';
import '../style/Table.scss';
import CloseIcon from '@mui/icons-material/Close';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import HeightIcon from '@mui/icons-material/Height';


export interface TableProps {
    setWhoWon: any;
    setEndGame: any;
}

const Table: React.FC<TableProps> = ({setWhoWon, setEndGame}) => {

    const figure = {
        x: <CloseIcon className='icon'/>,
        o: <CircleOutlinedIcon className='icon'/>,
        none: <span className='icon'/>,
    }

    const board9 = []

    for(let i=0; i<9; i++){
        board9.push({id: i, isUsed: false, icon: figure.none, player: ""})
    }
    
    const [boards, setBoards] = useState(board9)
    const [freePlaces, setFreePlaces] = useState(9)
    const [myMove, setMyMove] = useState(0);

    
    
    // console.log(boards)

    const message = (mess: string = "kurwa chuj jebać")=>{
        console.log(mess)
        
    }

    const win = (whoWon: string)=>{
        // if(whoWon=="PLAYER") setPlayerWon(true)
        // else setPlayerWon(false)
        // console.log(whoWon);
        setWhoWon(whoWon)
        setEndGame(true)
        console.log(whoWon);
        
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
        
    }, [boards])

    const checkGameOver = (player: boolean)=>{
        // console.log(boards[0])
        // console.log(boards[1])
        const WHO = player?"PLAYER":"COMPUTER"
        if(boards[0].player==WHO&&boards[1].player==WHO&&boards[2].player==WHO){
            console.log("wygrałeś kurwa");
            
        }
    }

    
    useEffect(()=>{
        if(freePlaces<0) win("DRAW")
        //problem bo jeest albo win albo draw ale jest zle kurwa
    }, [freePlaces])

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
        checkGameOver(player)
        
    }

    const random = ()=>{
        const random =  Math.floor(Math.random()*9)
        // console.log(random)

        return random;
        // return 1; //do zmiany koniecznie xd
    }

    const computerSelection = ()=>{
        
        const getNumber = ()=>{
            if(freePlaces>0){
                let randomNumber: number = random()

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

        // handleClick(id)
        // setMyMove(prev=>prev+1)
        // setTimeout(() => {
        //     computerSelection()
            
        // }, 1000);
    }



    const show = boards.map((item, i)=>{
        return(
        <div key={i} onClick={()=>playerMove(i)}>
            {item.icon}
        </div>
        )
    })

    return ( 
        <div className='table'>
            {show}
            <button onClick={computerSelection}></button>
        </div>
     );
}
 
export default Table;