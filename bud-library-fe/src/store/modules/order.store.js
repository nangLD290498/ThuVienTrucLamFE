import {
    apiGetList,
    apiGetById,
    apiPost,
    apiUpdate,
    apiDelete,
    apiGetHistoryOrders,
} from "@/api/order.api";

const getDataFromLS = () => {
    const orders = localStorage.getItem("orders");
    if (orders) {
        try {
            return JSON.parse(orders);
        } catch (e) {
            return null;
        }
    }
    return null;
};
const orders = getDataFromLS();
const state = orders
    ? {
          orders: orders,
          pageCount: 0,
          historyOrders: [],
      }
    : {
          orders: [],
          pageCount: 0,
          historyOrders: [],
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
    create({}, order) {
        return new Promise((resolve, reject) => {
            apiPost(order)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    update({}, order) {
        return new Promise((resolve, reject) => {
            apiUpdate(order)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    delete({}, order) {
        return new Promise((resolve, reject) => {
            apiDelete(order)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    getHistoryOrders({ commit }) {
        return new Promise((resolve, reject) => {
            apiGetHistoryOrders().then(response => {
                commit('setHistoryOrders', response.data.data);
            })
            .catch(function (error) {
                if (error.response) {
                    reject(error);
                }
            });
        })
    },
};

const mutations = {
    setDatas(state, orders) {
        state.orders = orders;
    },
    setPageCount(state, pageCount) {
        state.pageCount = pageCount;
    },
    setHistoryOrders(state, orders) {
        state.historyOrders = orders;
    },
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
};
