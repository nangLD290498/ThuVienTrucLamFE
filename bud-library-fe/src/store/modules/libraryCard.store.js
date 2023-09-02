import { apiPostRegisterLibraryCard } from "@/api/libraryCard.api"

const registeredLibraryCard = JSON.parse(localStorage.getItem('registeredLibraryCard'));
const state = registeredLibraryCard
    ? { registeredLibraryCard: registeredLibraryCard}
    : { registeredLibraryCard: {}};

const actions = {
    register({ dispatch, commit }, {url, memberInfo}) {
        return new Promise((resolve, reject) => {
            apiPostRegisterLibraryCard({url, memberInfo}).then(response => {
                commit('setRegisteredLibraryCard', response.data);
                resolve(response);
            })
            .catch(function (error) {
                console.log("error 001")
                if (error.response) {
                    reject(error);
                }
            });
        })
    },
};

const mutations = {
    setRegisteredLibraryCard(state, libraryCard){
        state.registeredLibraryCard = libraryCard;
    },
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
};