<template>
    <div id="login" class="container">
        <div class="row">
            <div class="col s12 m8 offset-m2">
                <div class="login card-panel center">
                    <h3>Login</h3>
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
                        <button @click="handleLogin" class="btn btn-large lighten-4 grey black-text">Login</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default {
    name: 'LoginPage',
    data(){
        return {
            email: null,
            password: null,
        }
    },
    methods: {
        async handleLogin(){
            try {
                if(!this.email || !this.password){
                    alert('Please fill all fields');
                    return;
                }
                // Add your code here
                const currentUser = await signInWithEmailAndPassword(getAuth(), this.email, this.password);
                alert(`Logged in as a ${currentUser.user.email}`);
                this.$router.push('/');
            }catch(err){
                alert(err.message);
                console.error('Error while logged in', err);
            }
        }
    }
}
</script>