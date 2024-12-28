<template>
    <div class="container">
        <ul class="collection with-header">
            <li class="collection-header"><h4>Employees</h4></li>
            <li class="collection-item" v-for="employee in employees" v-bind:key="employee.id">
                <div class="chip">
                    {{ employee.employeePosition }}
                </div> 
                {{ employee.employeeId }}: {{ employee.employeeName }}
                <div class="secondary-content">
                    <router-link v-bind:to="{name: 'view-employee', params: { id: employee.employeeId }}">
                            <i class="fa fa-eye"></i>
                    </router-link>
                </div>
            </li>
        </ul>
        <div class="fixed-action-btn">
            <router-link class="btn-floating btn-large waves-effect waves-light red" to="/add"><i class="fa-solid fa-plus"></i></router-link>
        </div>
    </div>
</template>

<script>
import db from './firebaseInit';
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export default {
    name: 'EmployeeDashboard',
    data(){
        return{
            employees: [],
        }
    },
    created() {
        const getEmployees = async () => {
            const q = query(
                collection(db, 'Employees'),
                orderBy("name", "asc")
            );
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const data = {
                    id: doc.id,
                    employeeId: doc.data().id,
                    employeeName: doc.data().name,
                    employeePosition: doc.data().position,
                }
                this.employees.push(data);
            });
        }
        getEmployees();
    },  
}
</script>