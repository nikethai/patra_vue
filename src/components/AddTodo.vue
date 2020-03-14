<template>
  <div>
    <form @submit="addTodo">
      <input type="text" v-model="name" placeholder="Add Todo>" />
      <input type="submit" value="Submit" class="btn" />
    </form>
  </div>
</template>

<script>
export default {
  name: "AddTodo",
  data() {
    return {
      name: ""
    };
  },
  methods: {
    addTodo: function(e) {
      const newTodo = {
        id: Math.floor(1000 + Math.random() * 9000),
        name: this.name,
        isCompleted: false
      };

      this.$emit("add-todo", newTodo);
      
      this.name = '';
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
  color: whitesmoke
}
</style>