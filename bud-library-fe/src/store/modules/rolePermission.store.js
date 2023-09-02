import {
    apiGetList,
    apiGetById,
    apiPost,
    apiUpdate,
    apiDelete
} from "@/api/rolePermission.api";

const getDataFromLS = () => {
    const rolePermissions = localStorage.getItem("rolePermissions");
    if (rolePermissions) {
        try {
            return JSON.parse(rolePermissions);
        } catch (e) {
            return null;
        }
    }
    return null;
};
const rolePermissions = getDataFromLS();
const state = rolePermissions
    ? {
          rolePermissions: rolePermissions,
          pageCount: 0,
          roles: [],
          permissions: []
      }
    : {
          rolePermissions: [],
          pageCount: 0,
          roles: [],
          permissions: []
      };

const actions = {
    loadCache({ commit }) {
        commit("setDatas", getDataFromLS());
    },
    get({ commit }, filter) {
        return new Promise((resolve, reject) => {
            apiGetList(filter)
                .then(response => {
                    commit("setDatas", response.data);
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
    create({}, rolePermission) {
        return new Promise((resolve, reject) => {
            apiPost(rolePermission)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    update({}, rolePermission) {
        return new Promise((resolve, reject) => {
            apiUpdate(rolePermission)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    delete({}, rolePermission) {
        return new Promise((resolve, reject) => {
            apiDelete(rolePermission)
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
    setDatas(state, data) {
        state.rolePermissions = data.rolePermissions;
        state.roles = data.roles;
        state.permissions = data.permissions;
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
