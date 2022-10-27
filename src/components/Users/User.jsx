import styles from "./Users.module.css";
import {NavLink} from "react-router-dom";
import userPhoto from "../../assets/images/user.jpg";
import React from "react";

export const User = ({user, ...props}) => {
    return (
        <div className={styles.block}>
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
                            /*props.toggleFollowingProgress(true, user.id)
                            usersAPI.unFollowAPI(user.id)
                                .then(data => {
                                    if (data.resultCode === 0) {
                                        props.unfollowSuccess(user.id)
                                    }
                                    props.toggleFollowingProgress(false, user.id)

                                });*/


                        }}>Unfollow(отпишимся при нажатии)</button>

                        : <button disabled={props.followingInProgress.some(id => id === user.id)}
                                  className={styles.btn} onClick={() => {

                            props.follow(user.id);
                            /*props.toggleFollowingProgress(true, user.id)
                            usersAPI.followAPI(user.id)
                                .then(data => {
                                    if (data.resultCode === 0) {
                                        props.followSuccess(user.id)
                                    }
                                    props.toggleFollowingProgress(false, user.id)

                                });*/

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
        </div>
    )
}