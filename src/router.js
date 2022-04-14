import { createRouter, createWebHistory } from "vue-router";

// import CoachDetail from './pages/coaches/CoachDetail.vue'
import CoachesList  from './pages/coaches/CoachesList.vue'
// import CoachRegistration from './pages/coaches/CoachRegistration.vue'
// import RequestReceived from './pages/requests/RequestReceived.vue'
// import ContactCoach from './pages/requests/ContactCoach'
// import NotFound from './pages/NotFound.vue'



const router = createRouter({
  history: createWebHistory(),

  routes: [
    { path: "/", redirect: "/coaches" },
    { path: "/coaches", component: CoachesList },
    {
      path: "/coaches:id",
      component: null,
      children: [{ path: "contact", component: null }],
    },
    { path: "/register", component: null },
    { path: "/requests", component: null },
    { path: "/:notFound(.*)", component: null }, //invalid input route
  ],
});

export default router;
