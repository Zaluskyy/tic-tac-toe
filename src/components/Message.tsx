import React, { useEffect } from "react";
import '../style/Message.scss';
import { motion, AnimatePresence } from "framer-motion";
import { kill } from "process";

export interface MessageProps {
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const Message: React.FC<MessageProps> = ({message, setMessage}) => {

    useEffect(()=>{
        const turnOffMessageComponent = setTimeout(() => {
            setMessage('')
        }, 2000);
        return () => {
            clearTimeout(turnOffMessageComponent)
        }
    })

    const appear = {
        hidden: {
            scale: 0,
            opacity: 0,
            right: -100,
        },
        visible: {
            scale: 1,
            opacity: 1,
            right: 50,
        },
        exit: {
            scale: 0,
            opacity: 0,
            right: -100,
        }
    }
    


    return ( 
        <motion.div
        variants={appear}
        initial="hidden"
        animate="visible" 
        exit="exit"
        

        
        className="message">
            {message}
        </motion.div>
     );
}
 
export default Message;