import styles from "./ProfileInfo.module.css";
import React from "react";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Element} from "../../Common/FormsControls/FormsControls";
import handleSubmit from "redux-form/lib/handleSubmit";
import s from './../../Common/FormsControls/FormsControls.module.css'

const Input = Element('input');
const Textarea = Element('textarea');

const ProfileDataForm = (props) => {
    return (
        <form className={styles.description} onSubmit={props.handleSubmit}>
            <div><button>Save</button></div>
            { props.error && <div className={s.formConclusionError}>
                {props.error}
            </div>
            }
            <span className={styles.nameOfUser}><b>Full name:</b>
                <Field placeholder={'Full name'} name={'fullName'} component={Input} />
            </span>
            <span className={styles.aboutMe}>Обо мне: <Field placeholder={'AboutMe'} name={'aboutMe'} component={Textarea} />
            </span>
            <span><b>Мои социальные сети:</b></span>
            <ul className={styles.contacts}>
                {Object.keys(props.profile.contacts).map(key => {
                    return <div>{key}:<Field placeholder={key} name={'contacts.' + key} component={Input} /></div>
                })}
            </ul>

            <span><b>Looking for a job:</b>
                <Field placeholder={''} name={'lookingForAJob'} component={Input} type={'checkbox'} />
            </span>
            <span><b>My professional skills:</b>
                <Field placeholder={'My professional skills'} name={'lookingForAJobDescription'} component={Textarea} />
            </span>

        </form>
    )
}

export const ProfileDataReduxForm = reduxForm({

    form: 'edit-profile',
    enableReinitialize : true,
    destroyOnUnmount: false
})(ProfileDataForm)


export default ProfileDataForm