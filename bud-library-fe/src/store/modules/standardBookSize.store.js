import {
    apiGetList,
    apiGetById,
    apiPost,
    apiUpdate,
    apiDelete
} from "@/api/standardBookSize.api";

const getDataFromLS = () => {
    const standardBookSizes = localStorage.getItem("standardBookSizes");
    if (standardBookSizes) {
        try {
            return JSON.parse(standardBookSizes);
        } catch (e) {
            return null;
        }
    }
    return null;
};
const standardBookSizes = getDataFromLS();
const state = standardBookSizes
    ? {
          standardBookSizes: standardBookSizes,
          pageCount: 0
      }
    : {
          standardBookSizes: [],
          pageCount: 0
      };

const actions = {
    loadCache({ commit }) {
        commit("setDatas", getDataFromLS());
    },
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
    create({}, standardBookSize) {
        return new Promise((resolve, reject) => {
            apiPost(standardBookSize)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    update({}, standardBookSize) {
        return new Promise((resolve, reject) => {
            apiUpdate(standardBookSize)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    delete({}, standardBookSize) {
        return new Promise((resolve, reject) => {
            apiDelete(standardBookSize)
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
    setDatas(state, standardBookSizes) {
        state.standardBookSizes = standardBookSizes;
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
