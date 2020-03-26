/* eslint-disable */

<template>
  <div>
    <span v-for="todo in allTask" :key="todo.id">
      <v-list flat>
        <v-list-item>
          <v-list-item-action>
            <v-checkbox
              on-icon="mdi-check-circle"
              off-icon="mdi-checkbox-blank-circle-outline"
              v-model="todo.isCompleted"
            ></v-checkbox>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <span
                :class="{ 'is-completed': todo.isCompleted }"
                @click="getTaskInfo(todo)"
                >{{ todo.taskName }}</span
              >
            </v-list-item-title>
          </v-list-item-content>

          <v-btn @click="deleteTask(todo)" ripple icon>
            <v-icon color="red">mdi-close-circle</v-icon>
          </v-btn>
        </v-list-item>
      </v-list>
    </span>
    <!-- <ul v-for="todo in allTask" :key="todo.id" class="todo-list">
      <li>
        <TodoItem v-bind:todo="todo" />
      </li>
    </ul>-->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  name: "Todo",
  props: ["todos"],
  computed: {
    ...mapGetters(["allTask"])
  },
  methods: {
    ...mapActions(["delTask"]),
    ...mapActions(["getTask"]),
    deleteTask(id) {
      this.delTask(id);
    },
    getTaskInfo(task) {
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
</style>
