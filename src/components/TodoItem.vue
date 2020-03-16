<template>
  <div class="todo-item borderer" :class="{'is-completed':todo.isCompleted}" >
    <input
      class="checkbox-round"
      type="checkbox"
      id="checkbox"
      :checked="todo.isCompleted"
      v-on:change="markComplete(todo)"
    />
    <span @click="doSomething(todo)">{{todo.name}}</span>
    <button @click="deleteTask(todo.id)" class="destroy" />
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "TodoItem",
  props: ["todo"],
  methods: {
    ...mapActions(["delTask"]),
    ...mapActions(["markCompleted"]),
    ...mapActions(["getTask"]),
    markComplete(todo) {
      this.markCompleted(todo);
      // this.todo.isCompleted = !this.todo.isCompleted;
    },
    deleteTask(id) {
      this.delTask(id);
    },
    doSomething(task) {
      this.getTask(task);
    }
  }
};
</script>

<style scope>
.is-completed {
  color: #d9d9d9;
  text-decoration: line-through;
}
.borderer {
  border: 1px solid #ccc !important;
  border-radius: 6px;
}
.todo-list li .destroy {
  display: none;
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 30px;
  margin: auto 0;
  color: #cc9a9a;
  transition: color 0.2s ease-out;
}

.todo-list li .destroy:hover {
  color: #af5b5e;
}

.todo-list li .destroy:after {
  content: "×";
}

.todo-list li:hover .destroy {
  display: block;
}

.checkbox-round {
  width: 1.3em;
  height: 1.3em;
  background-color: white;
  border-radius: 50%;
  vertical-align: middle;
  border: 1px solid #ddd;
  -webkit-appearance: none;
  outline: none;
  cursor: pointer;
  margin-right:15px;
  float: left;
}

.checkbox-round:checked {
  background-color: #66bb6a;
  border-color: #66bb6a;
}

.checkbox-round:checked:after {
  content: '\2713';
  padding-left: 5px;
}
</style>