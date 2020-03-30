<template>
    <div>
        <v-text-field
                @keyup.enter="addTodo"
                clearable
                counter
                id="newTask"
                label="What is your task?"
                name="newTask"
                outlined
                round
                solo
                v-model="name"
        ></v-text-field>
    </div>
</template>

<script>
  import {mapActions} from "vuex";

  export default {
    name: "AddTodo",
    data() {
      return {
        name: ""
      };
    },
    methods: {
      ...mapActions(["addTask"]),
      addTodo: function (e) {
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
