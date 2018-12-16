<template>
    <div>
        <div class="alert alert-danger" v-if="error && !success">
            <p>There was an error, unable to complete registration.</p>
        </div>
        <div class="alert alert-success" v-if="success">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-8">
                        <div class="card">
                            <div class="card-header">Verify Your Email Address'</div>

                            <div class="card-body">

                                <div class="alert alert-success" role="alert">
                                    'A fresh verification link has been sent to your email address
                                </div>


                                Before proceeding, please check your email for a verification link
                                If you did not receive the email'  <router-link to=""></router-link>.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <form autocomplete="off" @submit.prevent="register" v-if="!success" method="post">
            <div class="form-group" v-bind:class="{ 'has-error': error && error.name }">
                <label for="name">Name</label>
                <input type="text" id="name" class="form-control" v-model="name" required>
                <span class="help-block" v-if="error && errors.name">{{ error.name }}</span>
            </div>
            <div class="form-group" v-bind:class="{ 'has-error': error && errors.email }">
                <label for="email">E-mail</label>
                <input type="email" id="email" class="form-control" placeholder="user@example.com" v-model="email" required>
                <span class="help-block" v-if="error && errors.email">{{ error.email }}</span>
            </div>
            <div class="form-group" v-bind:class="{ 'has-error': error && error.password }">
                <label for="password">Password</label>
                <input type="password" id="password" class="form-control" v-model="password" required>
                <span class="help-block" v-if="error && errors.password">{{ error.password }}</span>
            </div>
            <button type="submit" class="btn btn-default">Submit</button>
        </form>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'Register',
        data(){
            return {
                name: '',
                email: '',
                password: '',
                error: false,
                errors: {},
                success: false
            };
        },
        methods: {
            register() {
                let app = this;
                axios.post('/auth/register', {
                    name: app.name,
                    email: app.email,
                    password: app.password
                }).then(response => {
                    app.success = true;
                }).catch(error => {
                    app.error = error;
                });
            }
        }
    }
</script>
