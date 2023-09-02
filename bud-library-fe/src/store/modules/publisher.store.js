import {
    apiGetList,
    apiGetById,
    apiPost,
    apiUpdate,
    apiDelete
} from "@/api/publisher.api";

const getDataFromLS = () => {
    const publishers = localStorage.getItem("publishers");
    if (publishers) {
        try {
            return JSON.parse(publishers);
        } catch (e) {
            return null;
        }
    }
    return null;
};
const publishers = getDataFromLS();
const state = publishers
    ? {
          publishers: publishers,
          pageCount: 0
      }
    : {
          publishers: [],
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
    create({}, publisher) {
        return new Promise((resolve, reject) => {
            apiPost(publisher)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    update({}, publisher) {
        return new Promise((resolve, reject) => {
            apiUpdate(publisher)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    delete({}, publisher) {
        return new Promise((resolve, reject) => {
            apiDelete(publisher)
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
    setDatas(state, publishers) {
        state.publishers = publishers;
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
