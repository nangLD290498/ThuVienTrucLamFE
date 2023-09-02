import {
    apiGetList,
    apiGetById,
    apiPost,
    apiUpdate,
    apiDelete
} from "@/api/device.api";

const getDataFromLS = () => {
    const devices = localStorage.getItem("devices");
    if (devices) {
        try {
            return JSON.parse(devices);
        } catch (e) {
            return null;
        }
    }
    return null;
};
const devices = getDataFromLS();
const state = devices
    ? {
          devices: devices,
          pageCount: 0
      }
    : {
          devices: [],
          pageCount: 0
      };

const actions = {
    get({ commit }, filter) {
        return new Promise((resolve, reject) => {
            apiGetList(filter)
                .then(response => {
                    commit("setDatas", response.data.data);
                    localStorage.setItem('devices', response.data.data);
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
    create({}, device) {
        return new Promise((resolve, reject) => {
            apiPost(device)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    update({}, device) {
        return new Promise((resolve, reject) => {
            apiUpdate(device)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    delete({}, device) {
        return new Promise((resolve, reject) => {
            apiDelete(device)
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
    setDatas(state, devices) {
        state.devices = devices;
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
