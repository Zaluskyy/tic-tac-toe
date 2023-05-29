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
        }, 1000);
        return () => {
            clearTimeout(turnOffMessageComponent)
        }
    })

    const appear = {
        hidden: {
            scale: 0,
            // translateX: "-50%",
            // translateY: "100%",
            translate: "-50%, 100%",
            opacity: 0,
            // left: "100%",
            
            // right: -100,
            bottom: 0,
        },
        visible: {
            scale: 1,
            // translateX: "-50%",

            translate: "-50%",
            opacity: 1,
            bottom: 50,
            // bottom: "50%",
            // left: "50%",
            // right: "auto",
            // right: "50vw",
        },
        exit: {
            scale: 0,
            // translateX: "-50%",
            // translateY: "100%",
            translate: "-50%, 100%",
            opacity: 0,
            // left: "100%",
            // right: "-100%",
            // right: -100,
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