<template>
    <div class="panel panel-default">
        <div class="panel-heading">
            <nav>
                <ul class="list-inline">
                    <li>
                        <router-link :to="{name:'home'}">Home</router-link>
                    </li>
                    <li v-if="!store.state.isLoggedIn" class="pull-right">
                        <router-link :to="{name:'login'}">Login</router-link>
                    </li>
                    <li v-if="!store.state.isLoggedIn" class="pull-right">
                        <router-link :to="{name:'register'}">Register</router-link>
                    </li>
                    <li v-if="store.state.isLoggedIn" class="pull-right">
                        <router-link :to="{name: 'logout'}">Logout</router-link>
                    </li>
                </ul>
            </nav>
        </div>

        <div class="panel-body">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import store from '../store';

    export default {
        name: "App",
        data() {
            return {
                store: store,
                user: {}
            }
        },
        updated() {
            if(localStorage.token) {
                axios.get('/user', {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token')
                        }
                    },
                ).then(response => {
                    console.log(response);
                    this.user = response.data;
                }).catch(error => {
                    if (error.response.status === 401 || error.response.status === 403) {
                        store.commit('logoutUser');
                        localStorage.setItem('token', '');
                        this.$router.push({name: 'home'})
                    }
                });
            }
        }
    }
</script>

