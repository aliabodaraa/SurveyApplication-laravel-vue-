import { createRouter, createWebHistory } from "vue-router";
import Dashboard from '../views/Dashboard.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Surveys from '../views/Surveys.vue'
import SurveyView from '../views/SurveyView.vue'
import DefaultLayout from '../components/DefaultLayout.vue'
import AuthLayout from '../components/AuthLayout.vue'
import SurveyPublicView from '../views/SurveyPublicView.vue'

SurveyPublicView
import store from '../store'
const routes = [{

    },
    {
        path: '/view/survey/:slug',
        name: 'SurveyPublicView',
        component: SurveyPublicView
    },
    {
        path: '/',
        redirect: '/login',
        //name: 'Dashboard',
        component: DefaultLayout,
        meta: { requireAuth: true },
        children: [{
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard
        }, {
            path: '/surveys',
            name: 'Surveys',
            component: Surveys
        }, {
            path: '/surveys/create',
            name: 'SurveyCreate',
            component: SurveyView
        }, {
            path: '/surveys/:id',
            name: 'SurveyView',
            component: SurveyView
        }, ],
    },
    {
        path: '/auth',
        name: 'Auth',
        meta: { isGuest: true },
        redirect: '/login',
        component: AuthLayout,
        children: [{
                path: '/register',
                name: 'Register',
                component: Register
            },
            {
                path: '/login',
                name: 'Login',
                component: Login
            }
        ]
    }
]


const router = createRouter({
        history: createWebHistory(),
        routes
    })
    // router.beforeEach((to, from, next) => {
    //     if (to.name === 'Dashboard' && !store.state.user.token) {
    //         console.log(11);
    //         next({ path: "/login" });
    //     } else if (store.state.user.token && to.meta.isGuest) {
    //         // } else if (store.state.user.token && (to.name === 'Login' || to.name === 'Register')) {
    //         console.log(22);
    //         next({ path: "/dashboard" });
    //     } else {
    //         console.log(33);
    //         next();
    //     }
    // });
export default router;