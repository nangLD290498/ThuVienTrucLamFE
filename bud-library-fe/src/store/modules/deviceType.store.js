import {
    apiGetList,
    apiGetById,
    apiPost,
    apiUpdate,
    apiDelete
} from "@/api/deviceType.api";

const getDataFromLS = () => {
    const deviceTypes = localStorage.getItem("deviceTypes");
    if (deviceTypes) {
        try {
            return JSON.parse(deviceTypes);
        } catch (e) {
            return null;
        }
    }
    return null;
};
const deviceTypes = getDataFromLS();
const state = deviceTypes
    ? {
          deviceTypes: deviceTypes,
          pageCount: 0
      }
    : {
          deviceTypes: [],
          pageCount: 0
      };

const actions = {
    get({ commit }, filter) {
        return new Promise((resolve, reject) => {
            apiGetList(filter)
                .then(response => {
                    commit("setDatas", response.data.data);
                    localStorage.setItem('deviceTypes', response.data.data);
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
    create({}, deviceType) {
        return new Promise((resolve, reject) => {
            apiPost(deviceType)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    update({}, deviceType) {
        return new Promise((resolve, reject) => {
            apiUpdate(deviceType)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    delete({}, deviceType) {
        return new Promise((resolve, reject) => {
            apiDelete(deviceType)
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
    setDatas(state, deviceTypes) {
        state.deviceTypes = deviceTypes;
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
