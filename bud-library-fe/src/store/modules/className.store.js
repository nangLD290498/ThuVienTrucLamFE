import {
    apiGetList,
    apiGetById,
    apiPost,
    apiUpdate,
    apiDelete
} from "@/api/className.api";

const getDataFromLS = () => {
    const classNames = localStorage.getItem("classNames");
    if (classNames) {
        try {
            return JSON.parse(classNames);
        } catch (e) {
            return null;
        }
    }
    return null;
};
const classNames = getDataFromLS();
const state = classNames
    ? {
          classNames: classNames,
          pageCount: 0
      }
    : {
          classNames: [],
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
    create({}, className) {
        return new Promise((resolve, reject) => {
            apiPost(className)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    update({}, className) {
        return new Promise((resolve, reject) => {
            apiUpdate(className)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    delete({}, className) {
        return new Promise((resolve, reject) => {
            apiDelete(className)
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
    setDatas(state, classNames) {
        state.classNames = classNames;
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
