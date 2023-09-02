import {
    apiGetList,
} from "@/api/dashboard.api";

const getDataFromLS = () => {
    const dashboard = localStorage.getItem("dashboard");
    if (dashboard) {
        try {
            return JSON.parse(dashboard);
        } catch (e) {
            return null;
        }
    }
    return null;
};
const dashboard = getDataFromLS();
const state = dashboard
    ? {
          dashboard: dashboard,
      }
    : {
          dashboard: [],
      };

const actions = {
    get({ commit }, filter) {
        return new Promise((resolve, reject) => {
            apiGetList(filter)
                .then(response => {
                    commit("setDatas", response.data);
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
};

const mutations = {
    setDatas(state, dashboard) {
        state.dashboard = dashboard;
    },
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
};
