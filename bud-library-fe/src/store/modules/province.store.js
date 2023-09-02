import {
    apiGetList,
    apiGetById,
    apiPost,
    apiUpdate,
    apiDelete
} from "@/api/province.api";

const getDataFromLS = () => {
    const provinces = localStorage.getItem("provinces");
    if (provinces) {
        try {
            return JSON.parse(provinces);
        } catch (e) {
            return null;
        }
    }
    return null;
};
const provinces = getDataFromLS();
const state = provinces
    ? {
          provinces: provinces,
          pageCount: 0
      }
    : {
          provinces: [],
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
    create({}, province) {
        return new Promise((resolve, reject) => {
            apiPost(province)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    update({}, province) {
        return new Promise((resolve, reject) => {
            apiUpdate(province)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    delete({}, province) {
        return new Promise((resolve, reject) => {
            apiDelete(province)
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
    setDatas(state, provinces) {
        state.provinces = provinces;
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
