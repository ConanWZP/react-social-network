import React from 'react';
/*import MyPosts from './MyPosts/MyPosts';*/
import styles from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus'
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

import userPhoto from "../../../assets/images/user.jpg";
import Preloader from "../../Common/Preloader/Preloader";
import {useState} from "react";
import ProfileDataForm, {ProfileDataReduxForm} from "./ProfileDataForm";




const ProfileInfo = (props) => {
    console.log(props.profile)


    /*if (!props.profile) {
        return <Preloader />
    }*/

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0]);
        }
    }


    let [editMode, setEditMode] = useState(false);

    const onSubmit = (formData) => {
        props.saveProfile(formData).then(
            () => {
                setEditMode(false)
            }
        );
        //setEditMode(false);
    }

    return (
        <div>
            <div className={styles.back}>
                <img
                    src="https://avatars.mds.yandex.net/i?id=76321bb169d320288bb9eefeb54566a7-5876563-images-thumbs&n=13"
                    alt=""/>
            </div>
            <div className={styles.descriptionBlock}>
                <div className={styles.avatar}>
                    <img src={props.profile.photos.large || userPhoto}/>
                    {props.isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
                    <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
                </div>


                {editMode ?
                    <ProfileDataReduxForm initialValues={props.profile} onSubmit={onSubmit} profile={props.profile} /> :
                    <ProfileData profile={props.profile} goToEditMode={() => {setEditMode(true)}} isOwner={props.isOwner} />}
                {/*<ProfileData profile={props.profile} />*/}

            </div>
        </div>
    );
}





const ProfileData = (props) => {
    return (
        <div className={styles.description}>
            <div>{props.isOwner ? <button onClick={props.goToEditMode}>Edit</button> : ''}</div>
            <span className={styles.nameOfUser}>{props.profile.fullName}</span>
            <span className={styles.aboutMe}>Обо мне: {props.profile.aboutMe}</span>
            <span><b>Мои социальные сети:</b></span>
            <ul className={styles.contacts}>
                {/*<li className={styles.facebook}><b>FaceBook</b>: {props.profile.contacts.facebook !== null ? props.profile.contacts.facebook : 'Отсутствует'}</li>
                        <li className={styles.website}><b>WebSite</b>: {props.profile.contacts.website !== null ? props.profile.contacts.website : 'Отсутствует'}</li>
                        <li className={styles.vk}><b>VK</b>: {props.profile.contacts.vk !== null ? props.profile.contacts.vk : 'Отсутствует'}</li>
                        <li className={styles.twitter}><b>Twitter</b>: {props.profile.contacts.twitter !== null ? props.profile.contacts.twitter : 'Отсутствует'}</li>
                        <li className={styles.instagram}><b>Instagram</b>: {props.profile.contacts.instagram !== null ? props.profile.contacts.instagram : 'Отсутствует'}</li>
                        <li className={styles.youtube}><b>YouTube</b>: {props.profile.contacts.youtube !== null ? props.profile.contacts.youtube : 'Отсутствует'}</li>
                        <li className={styles.github}><b>GitHub</b>: {props.profile.contacts.github !== null ? props.profile.contacts.github : 'Отсутствует'}</li>
                        <li className={styles.mainLink}><b>mainLink</b>: {props.profile.contacts.mainLink !== null ? props.profile.contacts.mainLink : 'Отсутствует'}</li>*/}

                {Object.keys(props.profile.contacts).map(key => {
                    return <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]} />
                })}
            </ul>

            <span><b>Looking for a job:</b> {props.profile.lookingForAJob ? 'Ищу работу' : 'Не ищу работу'}</span>
            <span><b>My professional skills:</b> {props.profile.lookingForAJob ? props.profile.lookingForAJobDescription : 'Не ищу'}</span>

        </div>
    )
}


const Contact = ({contactTitle, contactValue}) => {
    return <div><b>{contactTitle}</b>: {contactValue ? contactValue : 'Отсутствует'}</div>
}



export default ProfileInfo;