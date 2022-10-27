import React from 'react';
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";



/*const MyPostsContainer = (props) => {
    /!*let postsData = [
        {userId: 1, message: 'Hi, how are you?', like: 15},
        {userId: 2, message: 'First-post', like: 22},
    ]*!/
    /!*let postsDataFromProfile = props.postsDataToMyPosts;*!/


    /!*let postsElements = postsDataFromProfile.map((elOfPosts) => {
        return (
            <Post message={elOfPosts.message} like={elOfPosts.like} />
        )
    })*!/


    /!*let state = props.store.getState();*!/


    /!*let addPost = () => {
        /!*Здесь addPost просто совпали названия у let addPost и props.addPost, props.addPost тянется из store.js*!/
        /!*props.addPost();*!/
        props.store.dispatch(addPostActionCreator());
       /!* newPostElement.current.value = '';*!/
    }*!/

    /!*let onPostChange = (text) => {
        /!*let action = {type: 'UPDATE-NEW-POST-TEXT', newText: text};
        props.dispatch(action);*!/
        props.store.dispatch(updateNewPostTextActionCreator(text));
    }*!/


    return (
        <StoreContext.Consumer>
            {
                (store) => {
                    let state = store.getState();
                    let addPost = () => {
                        store.dispatch(addPostActionCreator());
                    }
                    let onPostChange = (text) => {
                        store.dispatch(updateNewPostTextActionCreator(text));
                    }

                    return (
                        <MyPosts addPost={addPost}
                                 updateNewPostText={onPostChange}
                                 posts={state.profilePage.postsData}
                                 newPostText={state.profilePage.newPostText} />
                    )
                }
            }
        </StoreContext.Consumer>



        /!*<MyPosts addPost={addPost} updateNewPostText={onPostChange}
                      posts={state.profilePage.postsData}
                      newPostText={state.profilePage.newPostText} /> *!/
    );
}*/
let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.postsData,
        /*newPostText: state.profilePage.newPostText,*/
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addPost: (postText) => {
            dispatch(addPostActionCreator(postText));
        },
        /*updateNewPostText: (text) => {
            dispatch(updateNewPostTextActionCreator(text));
        },*/
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;