import React from "react";
import {Field, reduxForm} from "redux-form";
import {logDOM} from "@testing-library/react";
import handleSubmit from "redux-form/lib/handleSubmit";

import {maxLengthCreator, required} from "../../utils/validators/validators";
import {Element} from "../Common/FormsControls/FormsControls";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";
import styles from './../Common/FormsControls/FormsControls.module.css'

const Input = Element('input');

const LoginForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>

            <div>
                <Field placeholder={'Email'} name={'email'} component={Input} validate={[required, maxLengthCreator(30)]} />
            </div>
            <div>
                <Field placeholder={'Password'} name={'password'} type={'password'} component={Input} validate={[required, maxLengthCreator(15)]} />
            </div>
            <div>
                <Field type={'checkbox'} name={'rememberMe'} component={Input} /> remember me
            </div>

            { props.captchaUrl && <img src={props.captchaUrl} /> }
            { props.captchaUrl && <Field placeholder={'captcha'} name={'captcha'} component={Input} validate={[required]} /> }

            { props.error && <div className={styles.formConclusionError}>
                {props.error}
            </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}


const LoginReduxForm = reduxForm({

    form: 'login'
})(LoginForm)




const LoginPage = (props) => {
    const onSubmit = (formData) => {
        /*console.log(formData)*/
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return <Navigate to={'/profile'} />
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
        </div>
        )
}

let mapStateToProps = (state) => {
    return {
        captchaUrl: state.auth.captchaUrl,
        isAuth: state.auth.isAuth,
    }
}

export default connect(mapStateToProps, {login})(LoginPage);