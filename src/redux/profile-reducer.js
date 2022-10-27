import {profileAPI, usersAPI} from "../API/api";
import {stopSubmit} from "redux-form";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_USER_STATUS = 'SET-USER-STATUS';
const DELETE_POST = 'DELETE-POST';
const SAVE_PHOTO_SUCCESS = 'SAVE-PHOTO-SUCCESS'

let initialState = {
    postsData: [
        {userId: 1, message: 'Hi, how are you?', like: 15},
        {userId: 2, message: 'First-post', like: 22},
        {userId: 3, message: 'Oooo', like: 12},
        {userId: 4, message: 'What', like: 10},
    ],
    /*newPostText: '',*/
    profile: null,
    status: "",
}

const profileReducer = (state = initialState, action) => {


    switch (action.type) {
        case ADD_POST:
            let newPost = {
                userId: 5,
                /*message: state.newPostText,*/
                message: action.postText,
                like: 0,
            };
            return {
                ...state,
                /*newPostText: '',*/
                postsData: [...state.postsData, newPost],
            };

        /*case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText,
            };*/
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile,
            };
        case SET_USER_STATUS:
            return {
                ...state,
                status: action.status,
            }

        case DELETE_POST:
            return {
                ...state,
                postsData: state.postsData.filter((post) => post.userId !== action.postId)
            }
        case SAVE_PHOTO_SUCCESS:
            return  {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }

        default:
            return state
    }


    // if (action.type === ADD_POST) {
    //     let newPost = {
    //         userId: 5,
    //         message: state.newPostText,
    //         like: 0,
    //     };
    //     state.postsData.push(newPost);
    //     state.newPostText = '';
    //
    // }
    // else if (action.type === UPDATE_NEW_POST_TEXT) {
    //     state.newPostText = action.newText;
    // }
    // return state
}

export const addPostActionCreator = (postText) => {
    return {
        type: ADD_POST,
        postText
    }
}

/*export const updateNewPostTextActionCreator = (text) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: text,
    }
}*/

export const setUserProfile = (profile) => {
    return {
        type: SET_USER_PROFILE,
        profile
    }
}

export const getUserProfile = (userId) => {
    return async (dispatch) => {
        let data = await usersAPI.getProfileAPI(userId)


        dispatch(setUserProfile(data));

    }
}

export const setUserStatus = (status) => {
    return {
        type: SET_USER_STATUS,
        status
    }
}

export const getUserStatus = (userId) => {
    return async (dispatch) => {
        let response = await profileAPI.getStatus(userId)


        dispatch(setUserStatus(response.data));


    }
}

export const updateUserStatus = (status) => {
    return async (dispatch) => {
        let response = await profileAPI.updateStatus(status)

        if (response.data.resultCode === 0) {
            dispatch(setUserStatus(status));
        }

    }
}


export const deletePost = (postId) => {
    return {
        type: DELETE_POST,
        postId
    }
}


export const savePhotoSuccess = (photos) => {
    return {
        type: SAVE_PHOTO_SUCCESS,
        photos
    }
}



export const savePhoto = (file) => {
    return async (dispatch) => {
        let response = await profileAPI.savePhoto(file)

        if (response.data.resultCode === 0) {
            dispatch(savePhotoSuccess(response.data.data.photos));
        }

    }
}

export const saveProfile = (profile) => {
    return async (dispatch, getState) => {
        let response = await profileAPI.saveProfile(profile)

        let userId = getState().auth.userId;

        if (response.data.resultCode === 0) {
            dispatch(getUserProfile(userId));
        } else {
            dispatch(stopSubmit('edit-profile',  {_error: response.data.messages[0]}));
            return Promise.reject(response.data.messages[0])
        }

    }
}


export default profileReducer;