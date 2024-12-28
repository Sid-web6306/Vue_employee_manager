<template>
    <div id="new-employee" class="container mt10">
      <form @submit.prevent="addEmployee">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" id="employeeId" v-model="id">
            <label for="employeeId">EmployeeID#</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" id="employeeName" v-model="name">
            <label for="employeeName">Name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" id="employeePosition" v-model="position">
            <label for="employeePosition">Position</label>
          </div>
        </div>
        <button type="submit" class="btn grey ml10">Add</button>
        <router-link to="/" class="btn red ml4">Cancel</router-link>
    </form>
    </div>
  </template>

<script>
import { addDoc, collection } from 'firebase/firestore';
import db from './firebaseInit';

export default {
    name: 'NewEmployee',
    data(){
        return{
            id: null,
            name: null,
            position: null,
        }
    },
    methods:{
        async addEmployee(){
            try {
                if(!this.id || !this.name || !this.position){
                    alert('Please fill all fields');
                    return;
                }
                const docRef = await addDoc(collection(db, 'Employees'), {
                    id: this.id,
                    name: this.name,
                    position: this.position
                });
                if(docRef.id){
                    this.$router.push('/');
                } 
            }catch(err){
                console.error('Error adding Document', err);
            }
        }
    }
}
</script>

<style scoped>
.ml4{
    margin-left: 4px;
}
.ml10{
    margin-left: 10px;
}
.mt10{
    margin-top: 10px;
}
</style>