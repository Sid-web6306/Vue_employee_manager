import VueRouter from "vue-router";
import Vue from "vue";
import Dashboard from "@/components/Dashboard.vue";
import EditEmployee from "@/components/EditEmployee.vue";
import ViewEmployee from "@/components/ViewEmployee.vue";
import NewEmployee from "@/components/NewEmployee.vue";
import HelloWorld from "@/components/HelloWorld.vue";

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {   path: "/",  
            component: Dashboard,
            name: "dashboard",
        },
        {
            path: '/edit/:id',
            component: EditEmployee,
            name: 'edit-employee'
        },
        {
            path: '/add',
            component: NewEmployee,
            name: 'add-employee'
        },
        {
            path: '/employee/:id',
            component: ViewEmployee,
            name: 'view-employee'
        },
        {
            path: '*',
            component: HelloWorld,
            name: 'hello-world'
        }
    ]
});