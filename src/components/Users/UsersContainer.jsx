import React from "react";
import {connect} from "react-redux";
import UsersOLD from "./UsersOLD";
import {
    follow,
    setCurrentPage,
    setTotalUsersCount,
    setUsers, toggleFollowingProgress,
    toggleIsFetching,
    unfollow,
    getUsersTh, followSuccess, unfollowSuccess
} from "../../redux/users-reducer";
import Users from "./Users";


import axios from "axios";
import Preloader from "../Common/Preloader/Preloader";
import {usersAPI} from "../../API/api";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/users-selectors";

class UsersAPIContainer extends React.Component {


    constructor(props) {
        super(props);
    };

    componentDidMount() {
        if (this.props.users.length === 0) {

            this.props.getUsersTh(this.props.currentPage, this.props.pageSize)
            /*this.props.toggleIsFetching(true);

            usersAPI.getUsers(this.props.currentPage, this.props.pageSize)
                .then(data => {
                    this.props.toggleIsFetching(false);
                    this.props.setUsers(data.items);
                    this.props.setTotalUsersCount(data.totalCount);
                });*/

        }
    }

    onPageChanged = (pageNumber) => {

        /*this.props.setCurrentPage(pageNumber);*/
        this.props.getUsersTh(pageNumber, this.props.pageSize)


        /*this.props.toggleIsFetching(true);


        usersAPI.switchUsers(pageNumber, this.props.pageSize)
            .then(data => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(data.items);


            });*/



    }


    render() {
        return (
            <>
                {this.props.isFetching ?
                    <Preloader />
                    : <Users totalUsersCount={this.props.totalUsersCount}
                             pageSize={this.props.pageSize}
                             currentPage={this.props.currentPage}
                             users={this.props.users}
                             unfollow={this.props.unfollow}
                             follow={this.props.follow}

                             followingInProgress={this.props.followingInProgress}
                             /*toggleFollowingProgress={this.props.toggleFollowingProgress}*/



                            onPageChanged={this.onPageChanged}/>}

            </>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),

    }
}

/*let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(followAC(userId))
        },
        unfollow: (userId) => {
            dispatch(unfollowAC(userId))
        },
        setUsers: (users) => {
            dispatch(setUserAC(users))
        },
        setCurrentPage: (pageNumber) => {
            dispatch(setCurrentPageAC(pageNumber))
        },
        setTotalUsersCount: (totalCount) => {
            dispatch(setTotalUsersCountAC(totalCount))
        },
        toggleIsFetching: (isFetching) => {
            dispatch(toggleIsFetchingAC(isFetching))
        }

    }
}*/

const UsersContainer = connect(mapStateToProps,
    {follow, unfollow, setCurrentPage,
         getUsersTh})(UsersAPIContainer);


export default UsersContainer;