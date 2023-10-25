import {
    login,
    register,
    logout,
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
    login({ commit }, { username, password }) {
        commit("loginRequest", { username });

        return new Promise((resolve, reject) => {
            login({ username, password })
                .then(response => {
                    commit("loginSuccess", response.data);
                    // login thành công nếu có một token jwt trong response
                    if (response.data) {
                        // lưu dữ liệu user và token jwt vào local storage để giữ user được log in trong page
                        localStorage.setItem(
                            "user",
                            response.data.accessToken
                        );
                        localStorage.setItem(
                            "username",
                            response.data.username
                        );
                    }
                    resolve(response.data);
                })
                .catch(function(error) {
                    if (error.response) {
                        commit("loginFailure", error);
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
