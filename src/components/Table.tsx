import react, { useEffect, useState } from 'react';
import '../style/Table.scss';
import CloseIcon from '@mui/icons-material/Close';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

const Table = () => {

    const figure = {
        x: <CloseIcon className='icon'/>,
        o: <CircleOutlinedIcon className='icon'/>,
        none: <span className='icon'/>,
    }

    const board9 = []

    for(let i=0; i<9; i++){
        board9.push({id: i, isUsed: false, icon: figure.none})
    }
    
    const [boards, setBoards] = useState(board9)
    const [freePlaces, setFreePlaces] = useState(9)
    const [myMove, setMyMove] = useState(0);

    
    
    // console.log(boards)

    const message = ()=>{
        alert("kurwa penis japierodle")
    }

    const checkGameOver = (player: boolean)=>{
        console.log(boards[0])
        console.log(boards[1].icon)
        
    }

    const handleClick = (id: number, player: boolean = true)=>{
        setBoards(boards.map(board=>{
            if(board.id==id){
                setFreePlaces(prev=>prev-1)
                return{...board, isUsed: true, icon: player?figure.x: figure.o}
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