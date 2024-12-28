<template>
    <div id="view-employee" class="container">
        <ul class="collection with-header">
            <li class="collection-header"><h4>{{ employee_name }}</h4></li>
            <li class="collection-item">Employee Id#: {{ employee_id }}</li>
            <li class="collection-item">Position: {{ employee_position }} </li>
        </ul>
        <router-link to="/" class="btn grey">Back</router-link>
        <button @click="deleteEmployee" class="col btn red">Delete</button>
        <div class="fixed-action-btn">
            <router-link class="btn-floating btn-large waves-effect waves-light red" :to="{name: 'edit-employee', params: { id: this.$route.params.id}}"><i class="fa-solid fa-edit"></i></router-link>
        </div>

    </div>
</template>

<script>
import { collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import db from './firebaseInit';

export default {
    name: 'ViewEmployee',
    data(){
        return{
            employee_id: null,
            employee_name: null,
            employee_position: null,
        }
    },
    beforeRouteEnter(to, from, next) {
        const retriveEmployee = async () => {
            const employeesRef = collection(db, 'Employees');
            const q = query(employeesRef, where('id', '==', to.params.id));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                next(vm => {
                    vm.employee_id = doc.data().id;
                    vm.employee_name = doc.data().name;
                    vm.employee_position = doc.data().position;
                });
            });
        }
        retriveEmployee();
    },
    watch: {
        $route: 'fetchData'
    },
    methods: {
        fetchData() {
            const retriveEmployee = async () => {
                const employeesRef = collection(db, 'Employees');
                const q = query(employeesRef, where('id', '==', this.$route.params.id));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    this.employee_id = doc.data().id;
                    this.employee_name = doc.data().name;   
                    this.employee_position = doc.data().position;
                });
            }
            retriveEmployee();
        },
        async deleteEmployee() {
            const employeesRef = collection(db, 'Employees');
            const q = query(employeesRef, where('id', '==', this.$route.params.id));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                if(confirm('Are you sure you want to delete this employee?')){
                    deleteDoc(doc.ref);
                    this.$router.push('/');
                }
            });
        }
    },
}
</script>

<style scoped>
button{
    margin-left: 4px;
}
</style>