import React from "react";
import classes from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import Profile from "../Profile/Profile";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Field, reduxForm} from "redux-form";

import {maxLengthCreator, required} from "../../utils/validators/validators";
import {Element} from "../Common/FormsControls/FormsControls";


const Textarea = Element('textarea')

const Dialogs = (props) => {


    /*let dialogsElements = props.state.dialogsData.map((elOfDialog) => {
        return (
            <DialogItem userName={elOfDialog.userName} userId={elOfDialog.userId} />
        )
    });

    let messagesElements = props.state.messagesData.map((elOfMessage) => {
        return (
            <Message message={elOfMessage.message} />
        )
    })*/

    let dialogsElements = props.dialogs.map((elOfDialog) => {
        return (
            <DialogItem userName={elOfDialog.userName} userId={elOfDialog.userId}/>
        )
    });

    let messagesElements = props.messages.map((elOfMessage) => {
        return (
            <Message message={elOfMessage.message}/>
        )
    })


    /*let newMessageElement = React.createRef();

    let onSubmitMessage = () => {
        /!*let textMessage = newMessageElement.current.value;*!/
        props.submitMessage();
        /!*props.dispatch(submitMessageActionCreator());*!/
    }

    let onMessageText = () => {
        let text = newMessageElement.current.value;
        props.updateNewMessageText(text);
        /!*props.dispatch(updateNewMessageTextActionCreator(text));*!/
    }
    */

    const addNewMessage = (values) => {
        console.log(values.newMessageBody);
        props.submitMessage(values.newMessageBody);
    }

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogItems}>
                {dialogsElements} {/*ВОТ ТАКОЕ НА 25 УРОКЕ*/}
                {/*<DialogItem userName={diaglogsData[0].userName} userId={diaglogsData[0].userId}/>
                <DialogItem userName={diaglogsData[1].userName} userId={diaglogsData[1].userId}/> ВОТ ТАКОЕ НА 24 УРОКЕ
                <DialogItem userName="Bogdan" userId='3'/>
                <DialogItem userName="Vital" userId='4'/> ВОТ ТАКОЕ БЫЛО НА 23 УРОКЕ
                <DialogItem userName="Viktor" userId='5'/>
                <DialogItem userName="Sasha" userId='6'/>*/}

            </div>

            <div className={classes.messages}>
                {messagesElements}
                {/*<Message message={messagesData[0].message}/>
                <Message message={messagesData[1].message}/>
                <Message message='Jo'/>
                <Message message='Textik'/>
                <Message message='Mes'/>*/}
                <SubmitMessageReduxForm onSubmit={addNewMessage} />

            </div>

        </div>

    )
}

const SubmitMessageForm = (props) => {
    return (
        <form className={classes.sendingMessage} onSubmit={props.handleSubmit}>
            <Field name={'newMessageBody'} component={Textarea}
                   validate = {[required, maxLengthCreator(50)]} placeholder={'Enter your message'} />
            <button>Отправить</button>
        </form>

    )
}



const SubmitMessageReduxForm = reduxForm({

    form: 'submitMessage'
})(SubmitMessageForm)



export default Dialogs;


