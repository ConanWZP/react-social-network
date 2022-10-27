import React from "react";
import styles from "./Users.module.css";
import userPhoto from "../../assets/images/user.jpg";
import {NavLink} from "react-router-dom";
import axios from "axios";
import {usersAPI} from "../../API/api";
import {Paginator} from "../Common/Paginator/Paginator";
import {User} from "./User";


let Users = (props) => {

    /*let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i=1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let curP = props.currentPage;
    let curPF = ((curP - 5) < 0) ?  0  : curP - 5 ;
    let curPL = curP + 5;
    let slicedPages = pages.slice( curPF, curPL);
    console.log(slicedPages.length)
    console.log(curPF);*/


    return (
        <div className={styles.wrapper}>
            <Paginator totalUsersCount={props.totalUsersCount}
                       onPageChanged={props.onPageChanged}
                       currentPage={props.currentPage}
                       pageSize={props.pageSize} />
            {/*<div>
                {  slicedPages.map((page) => {
                    return (
                        <button onClick={() => {props.onPageChanged(page)}} className={props.currentPage === page ? styles.selectedPage : ""}>{page}</button>
                    )
                })}
            </div>*/}

            {
                props.users.map((user) =>
                    <User user={user} followingInProgress={props.followingInProgress}
                          unfollow={props.unfollow} follow={props.follow}

                    />
                    /*<div className={styles.block}>
                        <div className={styles.leftSide}>
                            <div>
                                <NavLink to={'/profile/' + user.id}>
                                    <img src={user.photos.small != null ? user.photos.small : userPhoto}
                                         className={styles.userPhoto}/>
                                </NavLink>
                            </div>
                            <div>
                                {user.followed ?
                                    <button disabled={props.followingInProgress.some(id => id === user.id)}
                                        className={styles.btn} onClick={() => {


                                        props.unfollow(user.id)
                                        /!*props.toggleFollowingProgress(true, user.id)
                                        usersAPI.unFollowAPI(user.id)
                                            .then(data => {
                                                if (data.resultCode === 0) {
                                                    props.unfollowSuccess(user.id)
                                                }
                                                props.toggleFollowingProgress(false, user.id)

                                            });*!/


                                    }}>Unfollow(отпишимся при нажатии)</button>

                                    : <button disabled={props.followingInProgress.some(id => id === user.id)}
                                        className={styles.btn} onClick={() => {

                                        props.follow(user.id);
                                        /!*props.toggleFollowingProgress(true, user.id)
                                        usersAPI.followAPI(user.id)
                                            .then(data => {
                                                if (data.resultCode === 0) {
                                                    props.followSuccess(user.id)
                                                }
                                                props.toggleFollowingProgress(false, user.id)

                                            });*!/

                                    }}>Follow</button>}
                            </div>
                        </div>
                        <div className={styles.blockInfo}>
                            <div className={styles.about}>
                                <div>{user.name}</div>
                                <div>{user.status}</div>
                            </div>
                            <div className={styles.place}>
                                <div>{'user.location.country'}</div>
                                <div>{'user.location.city'}</div>
                            </div>
                        </div>
                    </div>*/
                )
            }
        </div>
    )
}

export default Users