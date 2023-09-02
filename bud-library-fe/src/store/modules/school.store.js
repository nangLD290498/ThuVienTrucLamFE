import {
    apiGetList,
    apiGetById,
    apiPost,
    apiUpdate,
    apiDelete
} from "@/api/school.api";

const getDataFromLS = () => {
    const schools = localStorage.getItem("schools");
    if (schools) {
        try {
            return JSON.parse(schools);
        } catch (e) {
            return null;
        }
    }
    return null;
};
const schools = getDataFromLS();
const state = schools
    ? {
          schools: schools,
          pageCount: 0
      }
    : {
          schools: [],
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
    create({}, school) {
        return new Promise((resolve, reject) => {
            apiPost(school)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    update({}, school) {
        return new Promise((resolve, reject) => {
            apiUpdate(school)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    delete({}, school) {
        return new Promise((resolve, reject) => {
            apiDelete(school)
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
    setDatas(state, schools) {
        state.schools = schools;
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
