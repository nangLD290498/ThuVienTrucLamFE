

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
        path: '/books/ByCate/:id/:name',
        component: () => import('../components/pages/books/ListAll.vue')
    },
    {
        name: 'allBooksByAuthor',
        path: '/books/ByAuthor/:author',
        component: () => import('../components/author/AllByAuthor.vue')
    },
    {
        name: "search",
        path: "/findGenerals",
        component: () =>
            import ("../components/search/SearchGeneral.vue"),
    },
    {
        name: 'Author',
        path: '/authors',
        component: () =>
            import ("../components/author/Author.vue")
    },
    {
        name: 'Category',
        path: '/categories',
        component: () =>
            import ("../components/category/Category.vue")
    },
];
