import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import Preloader from "../Common/Preloader/Preloader";
import {Navigate} from "react-router-dom";

const Profile = (props) => {
	/*let postsDataFromApp = props.postsDataToProfile;*/

	if (!props.profile) {
		return <Preloader />
	}

	/*if (!props.profile) {
		console.log(3)
		return <div>Loading...</div>
	}*/

	/*if (!props.profile) {
		return <Navigate to={'/login'} />
	}*/


	return (

		<div>
			<ProfileInfo profile={props.profile} status={props.status}
						 updateStatus={props.updateUserStatus} isOwner={props.isOwner}
						 savePhoto={props.savePhoto}
						 saveProfile={props.saveProfile}/>
			{/*<MyPosts posts={props.state.postsData}
					 newPostText={props.state.newPostText}
					 dispatch={props.dispatch}/>*/}
			<MyPostsContainer />
		</div>
	);
}

export default Profile;