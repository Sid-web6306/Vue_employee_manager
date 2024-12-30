<template>
   <div id="login" class="container">
        <div class="row">
            <div class="col s12 m8 offset-m2">
                <div class="login card-panel center">
                    <h3>Register</h3>
                    <form>
                        <div class="input-field">
                            <i class="material-icons prefix">email</i>
                            <input type="email" id="email" v-model="email" />
                            <label for="email">Email</label>
                        </div>
                        <div class="input-field">
                            <i class="material-icons prefix">lock</i>
                            <input type="password" id="password" v-model="password" />
                            <label for="password">Password</label>
                        </div>
                        <button @click="register" class="btn btn-large lighten-4 grey black-text">Register</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export default {
    name: 'RegisterPage',
    data(){
        return {
            email: null,
            password: null,
        }
    },
    methods:{
        async register(){
            try {
                if(!this.email || !this.password){
                    alert('Please fill all fields');
                    return;
                }
                // Add your code here
                const currentUser = await createUserWithEmailAndPassword(getAuth(), this.email, this.password);
                alert(`Registered as a ${currentUser.user.email}`);
                this.$router.push('/');
            }catch(err){
                alert(err.message);
                console.error('Error while registering a user', err);
            }
        }
    }
}
</script>