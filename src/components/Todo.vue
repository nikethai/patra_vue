<template>
  <div>
    <span :key="todo.id" v-for="todo in allTask">
      <v-list flat>
        <v-list-item>
          <v-list-item-action>
            <v-checkbox
              :false-value="0"
              :true-value="1"
              off-icon="mdi-checkbox-blank-circle-outline"
              on-icon="mdi-check-circle"
              v-model="todo.status_id"
            ></v-checkbox>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <span
                :class="{ 'is-completed': todo.status_id }"
                @click="getTaskInfo(todo)"
                >{{ todo.taskName }}</span
              >
            </v-list-item-title>
          </v-list-item-content>

          <v-btn @click="deleteTask(todo)" icon ripple>
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
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Todo",
  props: ["todos"],
  computed: {
    ...mapGetters(["allTask"])
  },
  methods: {
    ...mapActions(["delTask","getTask","getMemActions"]),
    deleteTask(id) {
      this.delTask(id);
    },
    getTaskInfo(task) {
      this.getTask(task);
      this.getMemActions();
    }
  }
};
</script>

<style scoped>
.is-completed {
  color: #d9d9d9;
  text-decoration: line-through;
}
</style>
