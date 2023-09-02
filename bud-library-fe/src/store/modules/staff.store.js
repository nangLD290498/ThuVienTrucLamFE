import {
    apiGetList,
    apiGetById,
    apiPost,
    apiUpdate,
    apiDelete
} from "@/api/staff.api";

const getDataFromLS = () => {
    const staffs = localStorage.getItem("staffs");
    if (staffs) {
        try {
            return JSON.parse(staffs);
        } catch (e) {
            return null;
        }
    }
    return null;
};
const staffs = getDataFromLS();
const state = staffs
    ? {
          staffs: staffs,
          pageCount: 0
      }
    : {
          staffs: [],
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
    create({}, staff) {
        return new Promise((resolve, reject) => {
            apiPost(staff)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    update({}, staff) {
        return new Promise((resolve, reject) => {
            apiUpdate(staff)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    delete({}, staff) {
        return new Promise((resolve, reject) => {
            apiDelete(staff)
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
    setDatas(state, staffs) {
        state.staffs = staffs;
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
