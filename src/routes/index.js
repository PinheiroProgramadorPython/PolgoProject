import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import ComoParticipar from "../views/ComoParticipar.vue";
import FAQ from "../views/FAQ.vue";
import Ganhadores from "../views/Ganhadores.vue";
import Lojas from "../views/Lojas.vue";
import Premios from "../views/Premios.vue";
import CriarConta from "../views/CriarConta.vue";
import Login from "../views/Login.vue";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
            meta: { requiresAuth: true }
        },
        {
            path: "/comoparticipar",
            name: "comoparticipar",
            component: ComoParticipar,
            meta: { requiresAuth: true }
        },
        {
            path: "/faq",
            name: "faq",
            component: FAQ,
            meta: { requiresAuth: true }
        },
        {
            path: "/ganhadores",
            name: "ganhadores",
            component: Ganhadores,
            meta: { requiresAuth: true }
        },
        {
            path: "/lojas",
            name: "lojas",
            component: Lojas,
            meta: { requiresAuth: true }
        },
        {
            path: "/premios",
            name: "premios",
            component: Premios,
            meta: { requiresAuth: true }
        },
        {
            path: "/login",
            name: "login",
            component: Login,
            meta: { requiresGuest: true }
        },
        {
            path: "/criarconta",
            name: "criarconta",
            component: CriarConta,
            meta: { requiresGuest: true }
        }
    ]
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("token");
    if (to.meta.requiresAuth && !token) {
        next("/login")
    } else if (to.meta.requiresGuest && token) {
        next("/")
    } else {
        next()
    }
})

export default router;
