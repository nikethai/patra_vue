<template>
  <div id="navbar">
    <div id="loginDiv">
      <a href="#" id="show-model" v-b-modal.mymodal>Login</a>
      <b-modal
        @cancel="resetModal"
        @hidden="resetModal"
        @ok="checkForm"
        id="mymodal"
        no-stacking
        ref="modal"
        title="Login"
      >
        <form @submit="checkForm" id="login">
          <div v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
              <b-alert show variant="danger">
                <li :key="error" v-for="error in errors">{{ error }}</li>
              </b-alert>
            </ul>
          </div>

          <p>
            <label for="username">UserName</label>
            <input
              class="form-control"
              id="username"
              name="username"
              type="text"
              v-model="username"
            />
          </p>

          <p>
            <label for="password">Password</label>
            <input
              class="form-control"
              id="password"
              name="password"
              type="password"
              v-model="password"
            />
          </p>
        </form>
        Don't have an account?
        <input type="button" v-b-modal.mymodal2 value="Register Now" />
        <template v-slot:modal-footer="{ ok, cancel }">
          <b-button @click="ok()" variant="success">Login</b-button>
          <b-button @click="cancel()" variant="danger">Cancel</b-button>
        </template>
      </b-modal>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";

export default {
  name: "loginNav",
  data() {
    return {
      errors: [],
      username: "",
      password: ""
    };
  },
  methods: {
    ...mapActions(["login"]),
    checkForm: function(e) {
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
            localStorage.setItem("username", res.data.username);

            if (localStorage.getItem("jwt") != null) {
              this.login(res);
              if (this.$route.params.nextUrl != null) {
                this.$router.push(this.$route.params.nextUrl);
              } else {
                this.$refs["modal"].hide();
                this.$router.push("/users");
              }
            }
          })
          .catch(e => console.log(e));
      }

      this.errors = [];

      if (!this.username) {
        this.errors.push("Name required.");
      }
      if (!this.password) {
        this.errors.push("Password required.");
      }
    },
    resetModal: function() {
      this.username = "";
      this.password = "";
    }
  }
};
</script>

<style></style>
