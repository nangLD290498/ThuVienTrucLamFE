export default [
    {
        name: 'admin.books',
        path: '/admin/books',
        component: () => import('../components/admin/books/Index.vue')
    },
    {
        name: 'admin.books-add',
        path: '/admin/books/add',
        component: () => import('../components/admin/books/Add.vue')
    },
];
