import VueRouter from "vue-router";
import Vue from "vue";
import Dashboard from "@/components/Dashboard.vue";
import EditEmployee from "@/components/EditEmployee.vue";
import ViewEmployee from "@/components/ViewEmployee.vue";
import NewEmployee from "@/components/NewEmployee.vue";
import HelloWorld from "@/components/HelloWorld.vue";
import LoginPage from "@/components/LoginPage.vue";
import RegisterPage from "@/components/RegisterPage.vue";
import { getAuth } from "firebase/auth";

Vue.use(VueRouter);

let router = new VueRouter({
    routes: [
        {   path: "/",  
            component: Dashboard,
            name: "dashboard",
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/edit/:id',
            component: EditEmployee,
            name: 'edit-employee',
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/add',
            component: NewEmployee,
            name: 'add-employee',
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/employee/:id',
            component: ViewEmployee,
            name: 'view-employee',
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/login',
            component: LoginPage,
            name: 'login',
            meta: {
                requiresGuest: true
            }
        },
        {
            path: '/register',
            component: RegisterPage,
            name: 'register',
            meta: {
                requiresGuest: true
            }
        },
        {
            path: '*',
            component: HelloWorld,
            name: 'hello-world',
            meta: {
                requiresAuth: true
            }
        }
    ]
});

router.beforeEach((to, from, next) => {
    const auth = getAuth();
    const user = auth.currentUser;
  
    // Check if the route requires authentication
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (!user) {
        // Redirect to login only if not already heading there
        if (to.path !== '/login') {
          next({
            path: '/login',
            query: { redirect: to.fullPath }, // Add redirect path for after-login redirection
          });
        } else {
          next(); // Prevent infinite loops if already navigating to /login
        }
      } else {
        next(); // User is authenticated, proceed
      }
    } else if (to.matched.some((record) => record.meta.requiresGuest)) {
      if (user) {
        if (to.path !== '/') {
          next({
            path: '/',
            query: { redirect: to.fullPath },
          });
        } else {
          next();
        }
      } else {
        next();
      }
    } else {
      next();
    }
  });

export default router;