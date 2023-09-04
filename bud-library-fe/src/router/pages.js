

export default [
    {
        name: 'home',
        path: '/',
        component: () => import('../components/pages/books/List.vue'),
    },
    {
        name: 'books.read',
        path: '/books/:id',
        component: () => import('../components/pages/books/Read.vue')
    },
    {
        name: 'allBooks',
        path: '/books',
        component: () => import('../components/pages/books/ListAll.vue')
    },{
        name: "search",
        path: "/findGeneral",
        component: () =>
            import ("../components/search/SearchGeneral.vue"),
    },
];
