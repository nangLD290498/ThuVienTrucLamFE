import {
    apiGetList,
    apiGetById,
    apiPost,
    apiUpdate,
    apiDelete,
    apiExport
} from "@/api/statistic.api";

const getDataFromLS = () => {
    const statistics = localStorage.getItem("statistics");
    if (statistics) {
        try {
            return JSON.parse(statistics);
        } catch (e) {
            return null;
        }
    }
    return null;
};
const statistics = getDataFromLS();
const state = statistics
    ? {
          statistics: statistics,
          pageCount: 0
      }
    : {
          statistics: [],
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
    create({}, statistic) {
        return new Promise((resolve, reject) => {
            apiPost(statistic)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    update({}, statistic) {
        return new Promise((resolve, reject) => {
            apiUpdate(statistic)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    delete({}, statistic) {
        return new Promise((resolve, reject) => {
            apiDelete(statistic)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    exportExcel({}){
        return new Promise((resolve, reject) => {
            apiExport()
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
    setDatas(state, statistics) {
        state.statistics = statistics;
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
