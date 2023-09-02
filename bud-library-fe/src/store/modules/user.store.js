import {
    apiGetList,
    apiGetById,
    apiPost,
    apiUpdate,
    apiDelete
} from "@/api/user.api";

const getDataFromLS = () => {
    const users = localStorage.getItem("users");
    if (users) {
        try {
            return JSON.parse(users);
        } catch (e) {
            return null;
        }
    }
    return null;
};
const users = getDataFromLS();
const state = users
    ? {
          users: users,
          pageCount: 0
      }
    : {
          users: [],
          pageCount: 0
      };

const actions = {
    get({ commit }, filter) {
        return new Promise((resolve, reject) => {
            apiGetList(filter)
                .then(response => {
                    commit("setDatas", response.data.data);
                    commit("setPageCount", response.data.last_page);
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    findById({}, id) {
        return new Promise((resolve, reject) => {
            apiGetById(id)
                .then(response => resolve(response))
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    create({}, user) {
        return new Promise((resolve, reject) => {
            apiPost(user)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    update({}, user) {
        return new Promise((resolve, reject) => {
            apiUpdate(user)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    delete({}, user) {
        return new Promise((resolve, reject) => {
            apiDelete(user)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    }
};

const mutations = {
    setDatas(state, users) {
        state.users = users;
    },
    setPageCount(state, pageCount) {
        state.pageCount = pageCount;
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
};
