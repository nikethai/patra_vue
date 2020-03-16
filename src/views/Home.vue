/* eslint-disable */
<template>
  <div class="container-fluid">
    <b-row>
      <div class="col-md-4 ">
        <b-card>
          <b-card-title>Checklist 1</b-card-title>
          <b-card-body>
            <AddTodo />
            <Todo />
          </b-card-body>
        </b-card>
      </div>
      <div class="col-md-8">
        <b-card>
          <b-card-body>
            <b-card-title>Hello</b-card-title>
            <b-card-text>{{getTaskView.desc}}</b-card-text>
          </b-card-body>
        </b-card>
      </div>
    </b-row>
  </div>
</template>

<script>
// @ is an alias to /src
import Todo from "@/components/Todo.vue";
import AddTodo from "@/components/AddTodo.vue";
import { mapGetters } from "vuex";

export default {
  name: "home",
  components: {
    Todo,
    AddTodo
  },
  computed: {
    ...mapGetters(["getTaskView"])
  }
};
</script>

<style scoped>

</style>
