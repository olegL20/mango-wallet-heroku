<template>
    <div>
        <div class="alert alert-danger" v-if="error">
            <p>There was an error, unable to sign in with those credentials.</p>
        </div>
        <form autocomplete="on" @submit.prevent="login" method="post">
            <div class="form-group">
                <label for="email">E-mail</label>
                <input type="email" id="email" class="form-control" placeholder="user@example.com" v-model="email">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" class="form-control" v-model="password" >
            </div>
            <button type="submit" class="btn btn-default">Sign in</button>
        </form>
    </div>
</template>

<script>
    import axios from 'axios';
    import store from '../../store';

    export default {
        name: "Login",
        data() {
            return {
                email: null,
                password: null,
                error: false
            }
        },
        methods: {
            login() {
                this.error = false;
                axios.post('/auth/login', {
                    email: this.email,
                    password: this.password
                }).then(response => {
                    store.commit('loginUser');
                    localStorage.setItem('token', response.headers.authorization);
                    this.$router.push({name: 'home'});
                }).catch(error => {
                    console.log(error);
                    this.error = true;
                })

            },
        }
    }
</script>
