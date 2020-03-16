/* eslint-disable */
<template>
    <div id="navbar">
        <div id="regisDiv">
            <a href="#" id="show-model2" v-b-modal.mymodal2>Register</a>
            <b-modal id="mymodal2" ref="modal" title="Register" @ok=checkForm @hidden=resetModal @cancel=resetModal no-stacking>
                <form id="login" @submit="checkForm">
                    <p v-if="errors.length">
                        <b>Please correct the following error(s):</b>
                        <ul>
                            <b-alert show variant="danger">
                                <li v-for="error in errors" :key="error">{{ error }}</li>
                            </b-alert>
                        </ul>
                    </p>

                    <p>
                        <label for="username">UserName</label>
                        <input id="username" class="form-control" v-model="username" type="text" name="username">
                    </p>

                    <p>
                        <label for="password">Password</label>
                        <input id="password" class="form-control" v-model="password" type="password" name="password">
                    </p>

                </form>
                Having an account already? <input type="button" v-b-modal.mymodal  value="Login"/>
                <template v-slot:modal-footer="{ok,cancel}">
                    <b-button variant="success" @click="ok()">Register</b-button>
                    <b-button variant="danger" @click="cancel()">Cancel</b-button>
                </template>
            </b-modal>
        </div>



    </div>
</template>

<script>
    import axios from "axios";
    import { mapActions } from 'vuex';

    export default {
        name: "regisNav",
        data() {
            return {
                errors: [],
                username: '',
                password: '',
            };
        },
        methods: {
            ...mapActions(['login']),
            checkForm: function (e) {
                e.preventDefault();
                if (this.username && this.password) {
                    let data = {
                        username: this.username,
                        password: this.password
                    };
                    axios
                        .post("https://hello-next-express.thongthai7.now.sh/api/ptest", data)
                        .then(res => {
                            localStorage.setItem("jwt", res.data.token);
                            localStorage.setItem("username",res.data.username);

                            if (localStorage.getItem("jwt") != null) {
                                this.login(res);
                                if (this.$route.params.nextUrl != null) {
                                    this.$router.push(this.$route.params.nextUrl);
                                }
                                else {
                                    this.$refs['modal'].hide()
                                    this.$router.push('/users');
                                }
                            }

                        })
                        .catch(e => console.log(e));
                }

                this.errors = [];

                if (!this.username) {
                    this.errors.push('Name required.');
                }
                if (!this.password) {
                    this.errors.push('Password required.');
                }

            },
            resetModal: function () {
                this.username = '';
                this.password = '';
            }
        },

    };
</script>

<style>
</style>