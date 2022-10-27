import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Element} from "../../Common/FormsControls/FormsControls";


const Textarea = Element('textarea')

window.props = [];

const MyPosts = React.memo((props) => {


    /*console.log('render post')
    console.log(props)*/
    /*let postsData = [
        {userId: 1, message: 'Hi, how are you?', like: 15},
        {userId: 2, message: 'First-post', like: 22},
    ]*/
    /*let postsDataFromProfile = props.postsDataToMyPosts;*/


    /*let postsElements = postsDataFromProfile.map((elOfPosts) => {
        return (
            <Post message={elOfPosts.message} like={elOfPosts.like} />
        )
    })*/

    let postsElements = props.posts.map((elOfPosts) => {
        return (
            <Post message={elOfPosts.message} like={elOfPosts.like}/>
        )
    })

    /*let newPostElement = React.createRef();

    let onAddPost = () => {
        /!*Здесь addPost просто совпали названия у let addPost и props.addPost, props.addPost тянется из store.js*!/
        props.addPost();
        /!*props.dispatch(addPostActionCreator());*!/
       /!* newPostElement.current.value = '';*!/
    }

    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.updateNewPostText(text);

        /!*let action = {type: 'UPDATE-NEW-POST-TEXT', newText: text};
        props.dispatch(action);*!/
        /!*props.dispatch(updateNewPostTextActionCreator(text));*!/
    }*/


    const addNewPost = (values) => {
        debugger
        props.addPost(values.postText)
    }


    return (
        <div className={classes.postsBlock}>
            <h2>My posts</h2>
            <div>
                New Posts
                <SubmitPostReduxForm onSubmit={addNewPost}/>
            </div>
            <div>
                {/*{postsElements}*/}
                {postsElements}
                {/*<Post message={postsData[0].message} like={postsData[0].like + ' ' + 'лайков'}/>
                <Post message={postsData[1].message} like={postsData[1].like + ' ' + 'лайков'}/>*/}
            </div>
        </div>
    );
});


const SubmitPostForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'postText'} component={Textarea} placeholder={'Текст поста'}
                validate = {[required, maxLengthCreator(10)]}/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>

    );
}

const SubmitPostReduxForm = reduxForm({

    form: 'createPost'
})(SubmitPostForm)




export default MyPosts;