import React from "react";
import classes from "./../Dialogs.module.css"
import {NavLink} from "react-router-dom";


const setActive = ({isActive}) => isActive ? classes.activeLink : '';

const DialogItem = (props) => {

    let pathToDialog = '/dialogs/' + props.userId;


    return (
        <div className={classes.dialog + " " + classes.active}>
            <div className={classes.avatar}></div>
            <NavLink to={pathToDialog} className={setActive}>{props.userName}</NavLink>
        </div>
    )
}


export default DialogItem;

