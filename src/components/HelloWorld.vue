/* eslint-disable */

<template>
  <div class="container">
    <p>{{msg}}</p>
    <form id ="login" @submit="checkForm">
      <p v-if="errors.length" >
        <b>Please correct the following error(s):</b>
        <ul>
          <b-alert show variant="danger" ><li v-for="error in errors" :key="error">{{ error }}</li></b-alert>
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
      <p>
        <input type="submit" class="btn btn-primary" value="Submit">
      </p>

    </form>
  </div>
</template>

<script>
import axios from "axios";
import {mapActions} from 'vuex';

export default {
  name: "hello",
  props: {
    msg: String
  },
  data() {
    return {
      errors: [],
      username: null,
      password: null
    };
  },
  methods: {
    ...mapActions(['login']),
    checkForm: function(e) {
      if (this.username && this.password) {
        let data = {
          username: this.username,
          password: this.password
        };
        axios
          .post("https://hello-next-express.thongthai7.now.sh/api/ptest", data)
          .then(res => {
            localStorage.setItem("jwt", res.data.token);

            if (localStorage.getItem("jwt") != null) {
              this.$emit("loggedIn");
              this.login(res);
              if (this.$route.params.nextUrl != null) {
                this.$router.push(this.$route.params.nextUrl);
              }
              else{
                this.$router.push('/users');
              }
            }

          })
          .catch(e => console.log(e));
        // return true;
      }

      this.errors = [];

      if (!this.username) {
        this.errors.push("Name required.");
      }
      if (!this.password) {
        this.errors.push("Password required.");
      }

      e.preventDefault();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
