import {
    apiGetList,
    apiGetById,
    apiPost,
    apiUpdate,
    apiDelete
} from "@/api/ward.api";

const getDataFromLS = () => {
    const wards = localStorage.getItem("wards");
    if (wards) {
        try {
            return JSON.parse(wards);
        } catch (e) {
            return null;
        }
    }
    return null;
};
const wards = getDataFromLS();
const state = wards
    ? {
          wards: wards,
          pageCount: 0
      }
    : {
          wards: [],
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
    create({}, ward) {
        return new Promise((resolve, reject) => {
            apiPost(ward)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    update({}, ward) {
        return new Promise((resolve, reject) => {
            apiUpdate(ward)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    delete({}, ward) {
        return new Promise((resolve, reject) => {
            apiDelete(ward)
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
    setDatas(state, wards) {
        state.wards = wards;
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
