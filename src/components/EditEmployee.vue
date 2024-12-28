<template>
    <div id="edit-employee" class="container mt10">
      <form @submit.prevent="updateEmployee">
        <div class="row">
          <div class="input-field col s12">
            <input disabled type="text" id="employeeId" v-model="id">
            <label class="active" for="employeeId">EmployeeID#</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" id="employeeName" v-model="name">
            <label class="active" for="employeeName">Name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" id="employeePosition" v-model="position">
            <label class="active" for="employeePosition">Position</label>
          </div>
        </div>
        <button type="submit" class="btn grey ml10">Update</button>
        <router-link to="/" class="btn red ml4">Cancel</router-link>
    </form>
    </div>
</template>

<script>
import { collection, getDocs, query, where, updateDoc } from 'firebase/firestore';
import db from './firebaseInit';

export default {
    name: 'EditEmployee',
    data(){
        return{
            id: null,
            name: null,
            position: null,
        }
    },
    async beforeRouteEnter(to, from, next) {
        const employeeRef = collection(db, 'Employees');
        const q = query(employeeRef, where('id', "==", to.params.id));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            next(vm => {
                vm.id = doc.data().id;
                vm.name = doc.data().name;
                vm.position = doc.data().position;
            });
        });
        next();
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
                    this.id = doc.data().id;
                    this.name = doc.data().name;   
                    this.position = doc.data().position;
                });
            }
            retriveEmployee();
        },
        async updateEmployee() {
        try {
            const employeeRef = collection(db, 'Employees');
            const q = query(employeeRef, where('id', '==', this.$route.params.id));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                console.error("No matching document found!");
                return;
            }
            const docSnap = querySnapshot.docs[0];
            const data = docSnap.data();
            const docRef = docSnap.ref;
            if(data.name === this.name && data.position === this.position){
                alert("No changes made");
                return;
            }
            await updateDoc(docRef, {
                name: this.name,
                position: this.position
            });
            this.$router.push('/');
            } catch (error) {
                console.error('Error updating document:', error);
            }
        }
    },
}
</script>

<style scoped>
.ml10{
    margin-left: 10px;
}   
.ml4{
    margin-left: 4px;
}
.mt10{
    margin-top: 10px;
}
</style>