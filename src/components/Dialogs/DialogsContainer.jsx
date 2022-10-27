import React from "react";
import classes from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import Profile from "../Profile/Profile";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {
    submitMessageActionCreator,
    updateNewMessageText,
    updateNewMessageTextActionCreator,
} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {compose} from "redux";
import {getUserProfile} from "../../redux/profile-reducer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {withRouter} from "../Profile/ProfileContainer";



/*const DialogsContainer = (props) => {

    /!*let state = props.store.getState();

    let submitMessage = () => {
        /!*let textMessage = newMessageElement.current.value;*!/
        /!*props.submitMessage();*!/
        props.store.dispatch(submitMessageActionCreator());
    }

    let onMessageText = (text) => {

        /!*props.updateNewMessageText(text);*!/
        props.store.dispatch(updateNewMessageTextActionCreator(text));
    }*!/

    return (<StoreContext.Consumer>
            {
                (store) => {
                    let state = store.getState();

                    let submitMessage = () => {
                        /!*let textMessage = newMessageElement.current.value;*!/
                        /!*props.submitMessage();*!/
                        store.dispatch(submitMessageActionCreator());
                    }

                    let onMessageText = (text) => {

                        /!*props.updateNewMessageText(text);*!/
                        store.dispatch(updateNewMessageTextActionCreator(text));
                    }
                    return (
                     <Dialogs submitMessage={submitMessage} updateNewMessageText={onMessageText}
                               dialogs={state.dialogsPage.dialogsData}
                               messages={state.dialogsPage.messagesData}
                               newMessageText={state.dialogsPage.newMessageText} /> )
                }


            }
    </StoreContext.Consumer>
    );
}*/

let mapStateToProps = (state) => {
    return {
        dialogs: state.dialogsPage.dialogsData,
        messages: state.dialogsPage.messagesData,
        newMessageText: state.dialogsPage.newMessageText,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        submitMessage: (newMessageBody) => {
            dispatch(submitMessageActionCreator(newMessageBody));
        },
        /*updateNewMessageText: (text) => {
            dispatch(updateNewMessageTextActionCreator(text));
        }*/
    }
}

/*
const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);


export default DialogsContainer;
*/

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)
(Dialogs)

