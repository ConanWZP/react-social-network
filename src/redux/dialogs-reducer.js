
const SUBMIT_MESSAGE = 'SUBMIT-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'

let initialState = {
    dialogsData: [
        {userId: 1, userName: 'Dmitry'},
        {userId: 2, userName: 'Andrey'},
        {userId: 3, userName: 'Bogdan'},
        {userId: 4, userName: 'Vital'},
        {userId: 5, userName: 'Viktor'},
        {userId: 6, userName: 'Sasha'},
    ],
    messagesData: [
        {userId: 1, message: 'Hi'},
        {userId: 2, message: 'How are you?'},
        {userId: 3, message: 'Jo'},
        {userId: 4, message: 'Textik'},
        {userId: 5, message: 'Mes'},
    ],
    /*newMessageText: '',*/
}

const dialogsReducer = (state = initialState, action) => {


    switch (action.type) {
        case SUBMIT_MESSAGE:
            let newMessage = {
                userId: 8,
                /*message: state.newMessageText,*/
                message: action.newMessageBody
            }
            return {
                ...state,
                /*newMessageText: '',*/
                messagesData: [...state.messagesData, newMessage],
            };

        /*case UPDATE_NEW_MESSAGE_TEXT:
            return {
                ...state,
                newMessageText: action.newMessage,
            }
*/
        default:
            return state;
    }
}


/*if (action.type === SUBMIT_MESSAGE) {
    let newMessage = {
        userId: 8,
        message: state.newMessageText,
    }
    state.messagesData.push(newMessage);
    state.newMessageText = '';
}
else if (action.type === UPDATE_NEW_MESSAGE_TEXT) {
    state.newMessageText = action.newMessage;
}

return state;
}*/

export const submitMessageActionCreator = (newMessageBody) => {
    return {
        type: SUBMIT_MESSAGE,
        newMessageBody
    }
}

/*export const updateNewMessageTextActionCreator = (text) => {
    return {
        type: UPDATE_NEW_MESSAGE_TEXT,
        newMessage: text,
    }
}*/


export default dialogsReducer;