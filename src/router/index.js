import { createRouter, createWebHistory } from 'vue-router';
import { inject } from 'vue';

import EventListView from '../views/EventListView.vue';
import EventLayout from '../views/event/Layout.vue';
import EventDetails from '../views/event/Details.vue';
import EventRegister from '../views/event/Register.vue';
import EventEdit from '../views/event/Edit.vue';
// import AboutView from '../views/AboutView.vue';
import NotFound from '../views/NotFound.vue';
import NetworkError from '../views/NetworkError.vue';

const ABOUT = () => import('../views/AboutView.vue');

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'event-list',
            component: EventListView,
            props: (route) => ({ page: parseInt(route.query.page) || 1 }),
        },
        {
            path: '/events/:id', // We have rename path '/event/:id' to '/events/:id'
            name: 'event-layout',
            props: true, // Tells vue router to send route params as component props
            component: EventLayout,
            children: [
                {
                    path: '',
                    name: 'event-details',
                    component: EventDetails,
                },
                {
                    path: 'register', // i.e. /event/2/register
                    name: 'event-register',
                    component: EventRegister,
                },
                {
                    path: 'edit', // i.e. /event/2/edit
                    name: 'event-edit',
                    component: EventEdit,
                    meta: { requireAuth: true }, // Meta gets inherited by children routes
                },
            ],
        },
        {
            /*
                Match on /event/, and capture everything else in afterEvents.
                Using (.*) so that it will include / in the match (by default it doesn't)
            */
            path: '/event/:afterEvent(.*)',
            redirect: (to) => {
                return { path: `/events/${to.params.afterEvent}` };
            },
        },
        // {
        //     // We have rename path '/event/:id' to '/events/:id'
        //     // Then we need to create this route in order to redirect to new path
        //     path: '/event/:id',
        //     redirect: (/*to*/) => {
        //         // param Id is not necessary because vue router will pass it from url automatically
        //         return { name: 'event-details' /*, params: { id: to.params.id }*/ };
        //     },
        //     children: [
        //         { path: 'register', redirect: () => ({ name: 'event-register' }) },
        //         { path: 'edit', redirect: () => ({ name: 'event-edit' }) },
        //     ],
        // },
        {
            path: '/about-us',
            name: 'about',
            // component: AboutView,
            // component: () => import('../views/AboutView.vue'),
            component: ABOUT,
            // alias: '/about'      <-- Not recommended by SEO
        },
        {
            path: '/about',
            redirect: { name: 'about' },
        },
        {
            path: '/404/:resource',
            name: '404-resource',
            component: NotFound,
            props: true,
        },
        {
            path: '/network-error',
            name: 'network-error',
            component: NetworkError,
        },
        {
            path: '/:catchAll(.*)',
            name: 'NotFound',
            component: NotFound,
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0 };
        }
    },
});

router.beforeEach((to, from) => {
    const notAuthorized = true;

    const GStore = inject('GStore');

    if (to.meta.requireAuth && notAuthorized) {
        GStore.flashMessage = 'Sorry, you are not authorized to view this page';

        setTimeout(() => {
            GStore.flashMessage = '';
        }, 3000);

        if (from.href) {
            // If there was a previous page stop navigation
            return false;
        } else {
            return { path: '/' };
        }
    }
});

export default router;
