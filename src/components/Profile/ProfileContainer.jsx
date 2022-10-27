import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {
	getUserProfile,
	getUserStatus,
	savePhoto,
	saveProfile,
	setUserProfile,
	updateUserStatus
} from "../../redux/profile-reducer";



import {Navigate, useNavigate, useParams} from "react-router-dom";

import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";




export function withRouter(Children) {
	return (props) => {
		const match = {params: useParams()};
		const navigate = useNavigate();
		return <Children {...props} match={match} navigate={navigate}/>
	}
}


class ProfileContainer extends React.Component {
	/*let postsDataFromApp = props.postsDataToProfile;*/



	refreshProfile () {
		let userId = this.props.match.params.userId;
		console.log(userId)

		if (!userId) {
			userId = this.props.authorizedUserId;
			if (!userId) {
				console.log(2)
				this.props.navigate('/login')
				/*return <Navigate to={'/login'} />*/
			}

		}

		this.props.getUserProfile(userId);
		this.props.getUserStatus(userId);

		/*usersAPI.getProfileAPI(userId)
			.then(data => {

				this.props.setUserProfile(data);

			});*/
	}


	componentDidMount() {
		this.refreshProfile()
	}


	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.match.params.userId !== prevProps.match.params.userId) {
			this.refreshProfile()
		}

	}


	render() {
		console.log(1)
		return (
			<Profile {...this.props} isOwner={!this.props.match.params.userId} savePhoto={this.props.savePhoto}
					 saveProfile={this.props.saveProfile}/>
		);
	}


}

let mapStateToProps = (state) => ({
	profile: state.profilePage.profile,
	status: state.profilePage.status,
	authorizedUserId: state.auth.userId,
})


/*let WithUrlDataContainerComponent = withRouter(ProfileContainer);*/


/*export default connect(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent);*/

export default compose(
	connect(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus, savePhoto, saveProfile}),
	withRouter

)
(ProfileContainer)