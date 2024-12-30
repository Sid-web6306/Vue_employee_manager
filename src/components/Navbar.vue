<template>
    <nav>
        <div class="nav-wrapper green">
            <div class="container">
                <router-link to="/" class="brand-logo">Employee Management</router-link>
                <ul class="right"> 
                    <li v-if="!isLoggedIn"><router-link to="/login">Login</router-link></li>
                    <li v-if="!isLoggedIn"><router-link to="/register">Register</router-link></li>
                    <li v-if="isLoggedIn" class="email">{{ currentUser.email }}</li>
                    <li v-if="isLoggedIn"><button @click="logout" class="btn black">Logout</button></li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import { getAuth, signOut } from 'firebase/auth';

export default {
    name: 'NavbarEmplopyee',
    data(){
        return {
            isLoggedIn: false, 
            currentUser: null,
        }
    },
    created(){
        const auth = getAuth();
        auth.onAuthStateChanged((user) => {
            console.log(user);
            if(user){
                this.isLoggedIn = true;
                this.currentUser = user;
            }else{
                this.isLoggedIn = false;
                this.currentUser = null;
            }
        });
    },
    methods: {
        logout(){
            console.log('Logging out');
            const auth = getAuth();
            signOut(auth).then(() => {
                this.$router.push('/login');
            }).catch((error) => {
                console.error('Error while logging out', error);
            });
        }
    }
}
</script>

<style>
.email{
    margin-right: 10px;
    color: blue;
}
</style>