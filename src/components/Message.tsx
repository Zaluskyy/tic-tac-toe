import React, { useEffect } from "react";
import '../style/Message.scss';
import { motion } from "framer-motion";

export interface MessageProps {
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const Message: React.FC<MessageProps> = ({message, setMessage}) => {

    useEffect(()=>{
        const turnOffMessageComponent = setTimeout(() => {
            setMessage('')
        }, 1000);
        return () => {
            clearTimeout(turnOffMessageComponent)
        }
    })

    const appear = {
        hidden: {
            scale: 0,
            translate: "-50%, 100%",
            opacity: 0,
            bottom: 0,
        },
        visible: {
            scale: 1,
            translate: "-50%",
            opacity: 1,
            bottom: 50,
        },
        exit: {
            scale: 0,
            translate: "-50%, 100%",
            opacity: 0,
            bottom: 0,
        }
    }

    return ( 
        <motion.div
        variants={appear}
        initial="hidden"
        animate="visible" 
        exit="exit"
        
        onClick={()=>setMessage('')}
        className="message">
            {message}
        </motion.div>
     );
}
 
export default Message;