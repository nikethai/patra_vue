<template>
  <div>
    <form @submit="addTodo">
      <input type="text" v-model="name" placeholder="Add Todo" class="new-task" />
      <input type="submit" value="Submit" class="btn" />
    </form>
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

<style scoped>
form {
  display: flex;
}
input[type="text"] {
  flex: 10;
  padding: 5px;
}
input[type="submit"] {
  flex: 2;
  background-color: black;
  color: whitesmoke;
}
.new-task {
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  color: inherit;
  padding: 6px;
  border: 1px solid rgb(100, 96, 96);
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.new-task {
  padding: 16px 16px 16px 60px;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
}
</style>
