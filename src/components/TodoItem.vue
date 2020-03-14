<template>
  <div class="todo-item" :class="{'is-completed':todo.isCompleted}">
    <p>
      <input type="checkbox" :checked="todo.isCompleted" v-on:change="markComplete" />
      {{todo.name}}
      <button @click="$emit('del-todo',todo.id)" class="del">x</button>
    </p>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: ["todo"],
  methods: {
    markComplete() {
      this.todo.isCompleted = !this.todo.isCompleted;
    }
  }
};
</script>

<style>
.is-completed {
  text-decoration: line-through;
}
.del{
    background-color: red
}
</style>