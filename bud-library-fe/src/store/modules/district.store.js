import {
    apiGetList,
    apiGetById,
    apiPost,
    apiUpdate,
    apiDelete
} from "@/api/district.api";

const getDataFromLS = () => {
    const districts = localStorage.getItem("districts");
    if (districts) {
        try {
            return JSON.parse(districts);
        } catch (e) {
            return null;
        }
    }
    return null;
};
const districts = getDataFromLS();
const state = districts
    ? {
          districts: districts,
          pageCount: 0
      }
    : {
          districts: [],
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
    create({}, district) {
        return new Promise((resolve, reject) => {
            apiPost(district)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    update({}, district) {
        return new Promise((resolve, reject) => {
            apiUpdate(district)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    delete({}, district) {
        return new Promise((resolve, reject) => {
            apiDelete(district)
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
    setDatas(state, districts) {
        state.districts = districts;
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
