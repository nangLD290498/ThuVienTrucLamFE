// import Vue from "vue";
import Router from "vue-router";
import * as VueRouter from 'vue-router';
import adminRouter from "./admins";
import pagesRouter from "./pages";
import { showRequireLoginModal } from '../mixins'

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
];

export const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
});
