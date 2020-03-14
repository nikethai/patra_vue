/* eslint-disable */

<template>
  <div>
    <div v-for="todo in todos" :key="todo.id">
        <TodoItem v-bind:todo="todo" v-on:del-todo="$emit('del-todo',todo.id)"/>
    </div>
  </div>
</template>

<script>
import TodoItem from '@/components/TodoItem.vue'
export default {
  name: "Todo",
  props: ["todos"],
  components:{
      TodoItem
  }
};
</script>

<style>
</style>