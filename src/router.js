import {createRouter} from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', redirect: '/coaches'},
        {path: '/coaches', component: null, name: 'coahces'},                   // redirect when someone enters to home page.
        {path: '/coaches/:id', component: null, name: 'coahces_Id', children:[
            {path: 'contact', component: null, name: 'contact_coach'},          // coaches/c1/contact -- contact specific coach

        ]},
        {path: '/register', component: null, name: 'register_coahces'},
        {path: '/requests', component: null, name: 'requests'},
        {path: '/:notFound(.*)', component: null, name: 'requests'},        //catch all route, for invalid inputs.
    ],


});

export default router