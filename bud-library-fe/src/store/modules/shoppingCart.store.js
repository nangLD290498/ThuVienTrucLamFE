const countQuantity = (shoppingCarts) => {
    shoppingCarts.sort(function(a, b) {
        return a.book_id - b.book_id;
    });

    return shoppingCarts.reduce((a, b) =>  a + b.quantity, 0);
}

const shoppingCarts = JSON.parse(localStorage.getItem('shoppingCarts'));
const state = shoppingCarts
    ? { data: shoppingCarts, quantity: countQuantity(shoppingCarts)}
    : { data: [], quantity: 0 };

const actions = {
    addBook({ dispatch, commit }, book) {
        commit('addBook', book);
    },
    removeBook({ dispatch, commit }, book) {
        commit('removeBook', book);
    },
    reset({ dispatch, commit }, book) {
        commit('clear');
    }
};

const mutations = {
    addBook(state, book){
        state.data = state.data.filter(function(bookElement) {
            return bookElement.book_id !== book.book_id;  
        }, book);

        state.data.push(book);

        state.quantity = countQuantity(state.data);

        localStorage.setItem('shoppingCarts', JSON.stringify(state.data));
    },
    removeBook(state, book){
        state.data = state.data.filter(function(bookElement) {
            return bookElement.book_id !== book.book_id;  
        }, book);

        state.quantity = countQuantity(state.data);

        localStorage.setItem('shoppingCarts', JSON.stringify(state.data));
    },
    clear(state) {
        state.data = [];
        state.quantity = 0;
        localStorage.removeItem('shoppingCarts');
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
};