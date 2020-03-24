<template>
  <div>
    <v-text-field
      name="newTask"
      solo
      round
      outlined
      counter
      label="What is your task?"
      id="newTask"
      clearable
      v-model="name"
      @keyup.enter="addTodo"
    ></v-text-field>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AddTodo",
  data() {
    return {
      name: ""
    };
  },
  methods: {
    ...mapActions(["addTask"]),
    addTodo: function(e) {
      const newTodo = {
        id: Math.floor(1000 + Math.random() * 9000),
        name: this.name,
        isCompleted: false
      };

      // this.$emit("add-todo", newTodo);
      this.addTask(newTodo);

      this.name = "";
      e.preventDefault();
    }
  }
};
</script>

<style scoped></style>
