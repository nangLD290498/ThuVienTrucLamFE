// import Vue from "vue";
import Router from "vue-router";
import * as VueRouter from 'vue-router';
import adminRouter from "./admins";
import pagesRouter from "./pages";
import { showRequireLoginModal } from '../mixins'
import Login from "../components/authen/Login.vue";
import Register from "../components/authen/Register.vue";

const routes = [
    {
        path: "/",
        component: () =>
            import ("../components/pages/BasePage.vue"),
        children: pagesRouter
    },
    {
        name: "admin",
        path: "/admin/dashboard",
        alias: "/admin",
        component: () =>
            import ("../components/admin/BaseAdmin.vue"),
        children: adminRouter,
        meta: { requiresAuth: true, requiresAdmin: true}
    },
    {
        name: "forbidden",
        path: "/403",
        component: () =>
            import ("../components/pages/error/403.vue"),
    },
    {
        name: 'ViewPdf',
        path: '/books/read/:id/:startPage/:index',
        component: () =>
            import ("../components/pages/books/ViewPdf.vue")
    },
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/register",
        component: Register,
    },
];

export const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    //const publicPages = ['/login', '/register', '/home'];
    const authRequired = to.path.includes("/admin");
    const loggedIn = localStorage.getItem('user');
  
    // trying to access a restricted page + not logged in
    // redirect to login page
    console.log("beforeEach: ",authRequired,loggedIn )
    if (authRequired && !loggedIn) {
      next('/login');
    } else {
      next();
    }
  });
