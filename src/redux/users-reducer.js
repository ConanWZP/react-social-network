import {usersAPI} from "../API/api";
import {followChecker, updateObjectInArray} from "../utils/object-helpers";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE-IS-FOLLOWING-PROGRESS';

let initialState = {
    usersData: [
    /*{userId: 1, photoUrl: 'https://nashregion36.ru/wp-content/uploads/2021/02/75121877379_o.jpg',
        followed: false, fullName: 'Dmitry', status: 'I am looking for a Job right now...', location: {country: 'Belarus', city: 'Minsk'}}, <------------------------ user
    {userId: 2, photoUrl: 'https://nashregion36.ru/wp-content/uploads/2021/02/75121877379_o.jpg',
        followed: false, fullName: 'Sasha', status: 'Try to find it...', location: {country: 'Russia', city: 'Moscow'}},
    {userId: 3, photoUrl: 'https://nashregion36.ru/wp-content/uploads/2021/02/75121877379_o.jpg',
        followed: true, fullName: 'Andrew', status: 'Preparing...', location: {country: 'Ukraine', city: 'Kiev'}},*/
    ],


    pageSize: 20,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
}


const usersReducer = (state = initialState, action) => {


    switch (action.type) {
        case FOLLOW :
            return  { ...state,
                //usersData: [...state.usersData]},
                /*usersData: state.usersData.map( (user) => {
                    if (user.id === action.id) {
                        return {...user, followed: true}
                    }
                    return (user)
                }),*/
                usersData: updateObjectInArray(state.usersData, action.id, 'id', {followed: true}),
            }
        case UNFOLLOW:
            return  { ...state,
                //usersData: [...state.usersData]},
                /*usersData: state.usersData.map( (user) => {
                    if (user.id === action.id) {
                        return {...user, followed: false}
                    }
                    return (user)
                }),*/
                usersData: updateObjectInArray(state.usersData, action.id, 'id', {followed: false}),
            }
        /*case SET_USERS:
            return { ...state,
                usersData: [...state.usersData,  ...action.usersData]
            }*/
        case SET_USERS:
            return { ...state,
                usersData: action.usersData
            }
        /*case SET_USERS:
            if(state.usersData.length > 0) {
                return state
            }
            else return { ...state,
                usersData:[ ...state.usersData, ...action.usersData ],

            }*/
        case SET_CURRENT_PAGE:
            return {...state,
                currentPage: action.currentPage}
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)

            }

        default:
            return state
    }
}

export const followSuccess = (id) => {
    return {
        type: FOLLOW,
        id
    }
}

export const unfollowSuccess = (id) => {
    return {
        type: UNFOLLOW,
        id
    }
}

export const setUsers = (usersData) => {
    return {
        type: SET_USERS,
        usersData
    }
}

export const setCurrentPage = (currentPage) => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage
    }
}

export const setTotalUsersCount = (totalUsersCount) => {
    return {
        type: SET_TOTAL_USERS_COUNT,
        totalUsersCount
    }
}

export const toggleIsFetching = (isFetching) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching
    }
}

export const toggleFollowingProgress = (isFetching, userId) => {
    return {
        type: TOGGLE_IS_FOLLOWING_PROGRESS,
        isFetching,
        userId
    }
}

export const getUsersTh = (currentPage, pageSize) => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(currentPage));

        let data = await usersAPI.getUsers(currentPage, pageSize)

                dispatch(toggleIsFetching(false));
                dispatch(setUsers(data.items));
                dispatch(setTotalUsersCount(data.totalCount));

    }

}


const followUnfollowGeneral = async (dispatch, userId, apiMethod, actionCreator) => {
        dispatch(toggleFollowingProgress(true, userId))
        let data = await apiMethod(userId)
        if (data.resultCode === 0) {
            dispatch(actionCreator(userId));
        }
        dispatch(toggleFollowingProgress(false, userId))
}


export const unfollow = (userId) => {
    return async (dispatch) => {
        await followUnfollowGeneral(dispatch, userId, usersAPI.unFollowAPI.bind(usersAPI), unfollowSuccess)
        /*dispatch(toggleFollowingProgress(true, userId))
        let data = await usersAPI.unFollowAPI(userId)
                if (data.resultCode === 0) {
                    dispatch(unfollowSuccess(userId))
                }
                dispatch(toggleFollowingProgress(false, userId))*/


    }
}

export const follow = (userId) => {
    return async (dispatch) => {

        await followUnfollowGeneral(dispatch, userId, usersAPI.followAPI.bind(usersAPI), followSuccess)
        /*dispatch(toggleFollowingProgress(true, userId))
        let data = await usersAPI.followAPI(userId)
                if (data.resultCode === 0) {
                    dispatch(followSuccess(userId))
                }
                dispatch(toggleFollowingProgress(false, userId))*/
    }
}




export default usersReducer;