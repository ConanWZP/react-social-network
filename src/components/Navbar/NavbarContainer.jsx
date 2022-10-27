import React from 'react';
import classes from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import DialogItem from "../Dialogs/DialogItem/DialogItem";
import FriendItem from "./FriendItem/FriendItem";
import Navbar from "./Navbar";
import {submitMessageActionCreator, updateNewMessageTextActionCreator} from "../../redux/dialogs-reducer";
import {connect} from "react-redux";
import Dialogs from "../Dialogs/Dialogs";

console.log(classes);


const setActive = ({isActive}) => isActive ? classes.activeLink : '';
// Аналогичная запись:
let d;
const sB = function ({isActive}) {
    if (isActive) {
        d = classes.activeLink;
        console.log({isActive});
        console.log(isActive);
    } else d = '';
    return d;
}






/*const NavbarContainer = (props) => {


    return (
        <StoreContext.Consumer>
            {
                (store) => {
                    let state = store.getState();
                    return (
                        <Navbar friendsList={state.sideBar.friendListData} />
                    )
                }
            }

        </StoreContext.Consumer>

    );
}*/


let mapStateToProps = (state) => {
    return {
        friendsList: state.sideBar.friendListData,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {

    }
}

const NavbarContainer = connect(mapStateToProps, mapDispatchToProps)(Navbar);

export default NavbarContainer;