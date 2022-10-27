import React from "react";
import classes from "./../Dialogs.module.css"



const Message = (props) => {
    return (
        <div className={classes.message}>
            <div className={classes.messageTaken}>{props.message}</div>
            <div className={classes.messageSended}>{props.message}</div>
        </div>
    )
}



export default Message;


