import React from 'react';
import Header from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {getAuthUserData, logout} from "../../redux/auth-reducer";
import {authAPI} from "../../API/api";




class HeaderContainer extends React.Component {

	/*componentDidMount() {

		this.props.getAuthUserData();
		/!*authAPI.getAuth()
			.then(data => {

				if (data.resultCode === 0) {
					let {id, email, login} = data.data;
					this.props.setAuthUserData(id, email, login);
					/!*this.props.setAuthUserData(response.data.data.id, response.data.data.email, response.data.data.login);*!/


				}

			});*!/
	}*/

	render() {
		return <Header {...this.props} />
	}
}

const mapStateToProps = (state) => {
	return {
		isAuth: state.auth.isAuth,
		login: state.auth.login,
	}

}


export default connect(mapStateToProps, {getAuthUserData, logout})(HeaderContainer);