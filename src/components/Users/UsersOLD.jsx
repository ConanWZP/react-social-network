import React from "react";
import styles from './Users.module.css';
import axios from "axios";
import userPhoto from '../../../src/assets/images/user.jpg'

let UsersOLD = (props) => {
    let getUsers = () => {


        if (props.users.length === 0) {

            axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {

                props.setUsers(response.data.items);

            });

            /*props.setUsers([
                {userId: 1, photoUrl: 'https://nashregion36.ru/wp-content/uploads/2021/02/75121877379_o.jpg',
                    followed: false, fullName: 'Dmitry', status: 'I am looking for a Job right now...', location: {country: 'Belarus', city: 'Minsk'}},
                {userId: 2, photoUrl: 'https://nashregion36.ru/wp-content/uploads/2021/02/75121877379_o.jpg',
                    followed: false, fullName: 'Sasha', status: 'Try to find it...', location: {country: 'Russia', city: 'Moscow'}},
                {userId: 3, photoUrl: 'https://nashregion36.ru/wp-content/uploads/2021/02/75121877379_o.jpg',
                    followed: true, fullName: 'Andrew', status: 'Preparing...', location: {country: 'Ukraine', city: 'Kiev'}},
            ])*/
        }
    }


    return (
        <div className={styles.wrapper}>
            <button onClick={getUsers}>Get users</button>
            {
                props.users.map((user) =>
                    <div className={styles.block}>
                        <div className={styles.leftSide}>
                            <div>
                                <img src={user.photos.small != null ? user.photos.small : userPhoto}
                                     className={styles.userPhoto}/>
                            </div>
                            <div>
                                {user.followed ?
                                    <button className={styles.btn} onClick={() => {
                                        props.unfollow(user.id)
                                    }}>Follow</button>
                                    : <button className={styles.btn} onClick={() => {
                                        props.follow(user.id)
                                    }}>Unfollow</button>}
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
        </div>
    )
}


export default UsersOLD;