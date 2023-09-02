import {
    apiGetList,
    apiGetByBarcodeId,
    apiGetById,
    apiPost,
    apiUpdate,
    apiDelete
} from "@/api/member.api";

const getDataFromLS = () => {
    const members = localStorage.getItem("members");
    if (members) {
        try {
            return JSON.parse(members);
        } catch (e) {
            return null;
        }
    }
    return null;
};
const members = getDataFromLS();
const state = members
    ? {
          members: members,
          pageCount: 0
      }
    : {
          members: [],
          pageCount: 0
      };

const actions = {
    get({ commit }, filter = {}) {
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
    create({}, member) {
        return new Promise((resolve, reject) => {
            apiPost(member)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    update({}, member) {
        return new Promise((resolve, reject) => {
            apiUpdate(member)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    delete({}, member) {
        return new Promise((resolve, reject) => {
            apiDelete(member)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    getByBarcodeId({ commit }, barcodeId) {
        return new Promise((resolve, reject) => {
            apiGetByBarcodeId(barcodeId)
                .then(response => {
                    commit("setDatas", response.data.data);
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    }
};

const mutations = {
    setDatas(state, members) {
        state.members = members;
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
