/* eslint-disable */

<template>
  <div>
    <ul v-for="todo in allTask" :key="todo.id" class="todo-list">
      <li>
        <TodoItem v-bind:todo="todo" />
      </li>
    </ul>
  </div>
</template>

<script>
import TodoItem from "@/components/TodoItem.vue";
import { mapGetters } from "vuex";

export default {
  name: "Todo",
  props: ["todos"],
  computed: {
    ...mapGetters(["allTask"])
  },
  components: {
    TodoItem
  }
};
</script>

<style scope>
.todo-list {
  margin: 0;
  padding: 0;
  list-style: none;
}
.todo-list li {
	position: relative;
	font-size: 20px;
	border-bottom: 1px solid #ededed;
}

</style>