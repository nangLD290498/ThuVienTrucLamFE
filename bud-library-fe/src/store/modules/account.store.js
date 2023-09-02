import {
    login,
    register,
    logout,
    apiGetProfile,
    apiPostLoginWithFacebook,
    apiPostLoginWithGoogle
} from "@/api/auth.api";

const getUser = () => {
    const user = localStorage.getItem("user");
    if (user) {
        try {
            return JSON.parse(user);
        } catch (e) {
            return null;
        }
    }
    return null;
};
const user = getUser();
const state = user ? { user: user } : { user: null };

const actions = {
    login({ commit }, { email, password }) {
        commit("loginRequest", { email });

        return new Promise((resolve, reject) => {
            login({ email, password })
                .then(response => {
                    commit("loginSuccess", response.data.user);
                    // login thành công nếu có một token jwt trong response
                    if (response.data.user) {
                        // lưu dữ liệu user và token jwt vào local storage để giữ user được log in trong page
                        localStorage.setItem(
                            "user",
                            JSON.stringify(response.data.user)
                        );
                    }
                    resolve(response.data.user);
                })
                .catch(function(error) {
                    if (error.response) {
                        commit("loginFailure", error);
                        reject(error.response.data);
                    }
                });
        });
    },
    loginWithFacebook({ commit }, accessToken) {
        return new Promise((resolve, reject) => {
            apiPostLoginWithFacebook(accessToken)
                .then(response => {
                    commit("loginSuccess", response.data.success.user);
                    // login thành công nếu có một token jwt trong response
                    if (response.data.success.user) {
                        // lưu dữ liệu user và token jwt vào local storage để giữ user được log in trong page
                        localStorage.setItem(
                            "user",
                            JSON.stringify(response.data.success.user)
                        );
                    }
                    resolve(response.data.success.user);
                })
                .catch(function(error) {
                    if (error.response) {
                        commit("loginFailure", error);
                        reject(error.response.data);
                    }
                });
        });
    },
    loginWithGoogle({ commit }, id_token) {
        return new Promise((resolve, reject) => {
            apiPostLoginWithGoogle(id_token)
                .then(response => {
                    commit("loginSuccess", response.data.success.user);
                    // login thành công nếu có một token jwt trong response
                    if (response.data.success.user) {
                        // lưu dữ liệu user và token jwt vào local storage để giữ user được log in trong page
                        localStorage.setItem(
                            "user",
                            JSON.stringify(response.data.success.user)
                        );
                    }
                    resolve(response.data.success.user);
                })
                .catch(function(error) {
                    if (error.response) {
                        commit("loginFailure", error);
                        reject(error.response.data);
                    }
                });
        });
    },
    logout({ commit }) {
        console.log("logout")
        return new Promise((resolve, reject) => {
            logout()
                .then(response => {
                    commit("logout");
                    localStorage.removeItem("user");
                    resolve(response);
                })
                .catch(function(error) {
                    if (error.response) {
                        reject(error.response.data);
                    }
                });
        });
    },
    register({ commit }, user) {
        commit("registerRequest", user);

        return new Promise((resolve, reject) => {
            register(user)
                .then(response => {
                    commit("registerSuccess", response);
                    resolve(response);
                })
                .catch(function(error) {
                    if (error.response) {
                        commit("registerFailure", error);
                        reject(error.response.data);
                    }
                });
        });
    },
    setUserLogin({ commit }, user) {
        commit("loginSuccess", user);
        localStorage.setItem("user", JSON.stringify(user));
    },
    getProfile({ commit }) {
        return new Promise((resolve, reject) => {
            apiGetProfile()
                .then(response => {
                    commit("loginSuccess", response.data.user);
                    localStorage.setItem(
                        "user",
                        JSON.stringify(response.data.user)
                    );
                    resolve(response);
                })
                .catch(function(error) {
                    if (error.response) {
                        reject(error.response.data);
                    }
                });
        });
    }
};

const mutations = {
    loginRequest(state, user) {
        state.user = user;
    },
    loginSuccess(state, user) {
        state.user = user;
    },
    loginFailure(state) {
        state.status = {};
        state.user = null;
    },
    logout(state) {
        state.status = {};
        state.user = null;
    },
    registerRequest(state, user) {
        state.status = { registering: true };
    },
    registerSuccess(state, user) {
        state.status = {};
    },
    registerFailure(state, error) {
        state.status = {};
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
};
