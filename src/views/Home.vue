/* eslint-disable */
<template>
  <div class="home">
    <b-row>
      <div class="col-4">
        <b-card>
          <b-card-title>
            Checklist 1
          </b-card-title>
          <b-card-body>
            <AddTodo v-on:add-todo="addTodo" />
            <Todo v-bind:todos="todos" v-on:del-todo="delTodos" />
          </b-card-body>
        </b-card>
      </div>
      <div class="col-8">
        <b-card>
          <b-card-body>
            <b-card-title>
              Hello
            </b-card-title>
            <b-card-text>
              Lo lo con kek
            </b-card-text>
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

export default {
  name: "home",
  components: {
    Todo,
    AddTodo
  },
  data() {
    return {
      todos: [
        {
          id: 1,
          name: "Nam nyan",
          isCompleted: false
        },
        { id: 2, name: "Tus Tus", isCompleted: true },
        { id: 3, name: "Thong always Wong", isCompleted: false }
      ]
    };
  },
  methods: {
    delTodos(id) {
      this.todos = this.todos.filter(todo => todo.id !== id);
    },
    addTodo(newTodo) {
      this.todos = [...this.todos, newTodo];
    }
  }
};
</script>
