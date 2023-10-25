import axios from 'axios';
import config from '../config';
import { showRequireLoginModal, redirectToForbiddenPage } from '../mixins'

const httpClient = axios.create({
    baseURL: config.VUE_APP_BASE_URL,
    // timeout: 5000
});

// Get access-token of login-user.
export const getAuthToken = () => {
    let user = localStorage.getItem('user')

    if (user) {
        console.log('Bearer ' + user)
        return 'Bearer ' + user;
    } else {
        return {};
    }
}

// Setup for REQUEST-RESPONSE-interceptors
export const setupInterceptorLoader = (_this) => {
    _this.isLoading = false;

    // setup REQUEST-interceptors.
    httpClient.interceptors.request.use((config) => {
        _this.isLoading = true;

        config.headers['Authorization'] = getAuthToken();
        return config;
    }, (error) => {
        _this.isLoading = false;

        return Promise.reject(error);
    });

    // setup RESPONSE-interceptors.
    httpClient.interceptors.response.use((response) => {
        _this.isLoading = false;

        return response;
    }, (error) => {
        _this.isLoading = false;

        const status = error.response.status;
        if (status === 401) {
            showRequireLoginModal();
        } else if (status === 403) {
            redirectToForbiddenPage();
        }

        return Promise.reject(error);
    });
}

export default httpClient;
