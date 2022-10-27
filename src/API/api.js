import axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    data: '',
    headers: {
        "API-KEY" : "683aa7c1-ffe3-45e5-bd9a-f2c1d86ca661"
    }
})



export const usersAPI = {
    getUsers (currentPage, pageSize) {
        return  instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            })
    },
    /*switchUsers (pageNumber, pageSize) {
        return  instance.get(`users?page=${pageNumber}&count=${pageSize}`)
            .then(response => {
                return response.data;
            })
    },*/





    unFollowAPI (idOfUser) {
        return instance.delete(`follow/${idOfUser}`)
            .then(response => {
                return response.data;
            })
    },

    followAPI (idOfUser) {
        return instance.post(`follow/${idOfUser}`)
            .then(response => {
                return response.data;
            })
    },

    getProfileAPI (idOfUser) {
        console.log('Obsolete method. Please profileAPI object');
        return profileAPI.getProfileAPI(idOfUser);
    }

}


export const profileAPI = {

    getProfileAPI (idOfUser) {
        return instance.get(`profile/${idOfUser}`)
            .then(response => {
                return response.data;
            })
    },
    getStatus(idOfUser) {
        return instance.get(`profile/status/` + idOfUser)
    },
    updateStatus(status) {
        return instance.put(`profile/status`, { status: status })
    },

    savePhoto(photoFile) {
        let formData = new FormData();
        formData.append('image', photoFile)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },

    saveProfile(profile) {
        return instance.put(`profile`, profile)
    }

}



export const authAPI = {
    getAuth () {
        return instance.get(`auth/me`)
            .then(response => {
                return response.data;
            })
    },
    login (email, password, rememberMe = false, captcha=null) {
        return instance.post(`auth/login`, { email, password, rememberMe, captcha })
            .then(response => {
                return response.data;
            })
    },
    logout () {
        return instance.delete(`auth/login`)
            .then(response => {
                return response.data;
            })
    },
}


export const securityAPI = {
    getCaptchaUrl () {
        return instance.get(`security/get-captcha-url`)
    },
}



/*
export const getUsers = (currentPage, pageSize) => {
    return  axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}`, {
        withCredentials: true
    })
}
*/
