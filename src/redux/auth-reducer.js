import {authAPI, securityAPI} from "../API/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET-USER-DATA';
const GET_CAPTCHA_SUCCESS = 'GET-CAPTCHA-SUCCESS'


let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
}


const authReducer = (state = initialState, action) => {


    switch (action.type) {
        case SET_USER_DATA :
            return {
                ...state,
                ...action.data,
            }
        case GET_CAPTCHA_SUCCESS :
            return {
                ...state,
                captchaUrl: action.captcha
            }

        default:
            return state
    }
}


export const setAuthUserData = (userId, email, login, isAuth) => {
    return {
        type: SET_USER_DATA,
        data: {
            userId,
            email,
            login,
            isAuth
        }
    }
}


export const getAuthUserData = () => {
    return async (dispatch) => {
        let data = await authAPI.getAuth()


        if (data.resultCode === 0) {
            let {id, email, login} = data.data;
            dispatch(setAuthUserData(id, email, login, true));
            /*this.props.setAuthUserData(response.data.data.id, response.data.data.email, response.data.data.login);*/


        }
    }
}


export const login = (email, password, rememberMe, captcha) => {
    return async (dispatch) => {
        let data = await authAPI.login(email, password, rememberMe, captcha)

        if (data.resultCode === 0) {
            dispatch(getAuthUserData())
        } else {
            if (data.resultCode === 10) {
                dispatch(getCaptchaUrl());
            }
            let message = data.messages.length > 0 ? data.messages[0] : "Some error";
            dispatch(stopSubmit("login", {_error: message}));
        }

    }
}

export const logout = () => {
    return async (dispatch) => {
        let data = await authAPI.logout()

        if (data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        }

    }
}

export const getCaptchaSuccess = (captcha) => {
    return {
        type: GET_CAPTCHA_SUCCESS,
        captcha

    }
}

export const getCaptchaUrl = () => {
    return async (dispatch) => {
        const response = await securityAPI.getCaptchaUrl();
        const captchaUrl = response.data.url;


        dispatch(getCaptchaSuccess(captchaUrl));

    }
}


export default authReducer;