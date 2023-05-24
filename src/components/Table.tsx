import react, { useEffect, useState } from 'react';
import '../style/Table.scss';
import CloseIcon from '@mui/icons-material/Close';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import HeightIcon from '@mui/icons-material/Height';


export interface TableProps {
    whoWon: string;
    setWhoWon: React.Dispatch<React.SetStateAction<string>>;
    endGame: boolean;
    setEndGame: React.Dispatch<React.SetStateAction<boolean>>;
    restart: number;
}

const Table: React.FC<TableProps> = ({whoWon, setWhoWon, endGame, setEndGame, restart}) => {

    const figure = {
        x: <CloseIcon className='icon'/>,
        o: <CircleOutlinedIcon className='icon'/>,
        none: <span className='icon'/>,
    }

    interface Iboards{
        id: number;
        isUsed: boolean;
        icon: any;
        player: string
    }

    const board9: Iboards[] = []

    for(let i=0; i<9; i++){
        board9.push({id: i, isUsed: false, icon: figure.none, player: ""})
    }
    
    const [boards, setBoards] = useState(board9)//add type
    const [freePlaces, setFreePlaces] = useState<number>(9)
    const [myMove, setMyMove] = useState<number>(0);

    const [whereComputerInput, setWhereComputerInput] = useState('')

    
    useEffect(()=>{
        setBoards(board9);
        setFreePlaces(9)
        setEndGame(false)
        
    }, [restart])

    // useEffect(()=>{ //check draw

    //     // setTimeout(() => {
    //     if(endGame==false){

    //         let end = true
    //         boards.forEach(board=>{
    //             if(board.isUsed == false) end = false
    //         })
    //         // if(end && whoWon== "DRAW") {
    //         if(end) {
    //             setEndGame(true)
    //             setWhoWon("DRAW")
    //             console.log("jan kurwa trzeci");
                
    //         }
    //     }
    //         // console.log(whoWon);
            
    //     // }, 1000);
        
    // }, [boards])

        

    const message = (mess: string = "kurwa chuj jebać")=>{
        console.log(mess)
        
    }

    const win = (whoWon: string)=>{
        // if(whoWon=="PLAYER") setPlayerWon(true)
        // else setPlayerWon(false)
        // console.log(whoWon);
        setWhoWon(whoWon)
        setEndGame(true)
        // console.log(whoWon);
        
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
                console.log("koniec kurwa draw")
                win("DRAW")
            }
        }
        setTimeout(() => {
            goDraw()
        }, 60);
        
    }, [boards])

    const checkGameOver = (player: boolean)=>{
        // console.log(boards[0])
        // console.log(boards[1])
        const WHO = player?"PLAYER":"COMPUTER"
        if(boards[0].player==WHO&&boards[1].player==WHO&&boards[2].player==WHO){
            console.log("wygrałeś kurwa");
            
        }
    }

    
    // useEffect(()=>{
    //     // checkIfWin()
    //     if(freePlaces<1) win("DRAW")
    //     //problem bo jeest albo win albo draw ale jest zle kurwa
    // }, [freePlaces])

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

    const handleComputerInputValue = (e: any)=>{
        // console.log(e.target.value)
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