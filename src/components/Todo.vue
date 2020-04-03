<template>
  <div>
    <v-btn dense text color="info" @click="saveEdit">{{buttonValue}}</v-btn>
    <span :key="todo.id" v-for="(todo,index) in allTask">
      <v-list flat class="grey lighten-3">
        <v-list-item>
          <!-- <v-list-item-action>
            <v-checkbox
              :false-value="0"
              :true-value="1"
              off-icon="mdi-checkbox-blank-circle-outline"
              on-icon="mdi-check-circle"
              v-model="todo.status_id"
            ></v-checkbox>
          </v-list-item-action>-->
          <v-list-item-content>
            <v-list-item-title>
              <p
                solo
                v-if="!isEditing"
                :value="todo.taskName"
                @click="getTaskInfo(todo,index)"
                :class="[todo.status_id ? 'is-completed':'']"
              >{{ todo.taskName }}</p>
              <v-text-field
                solo
                :value="todo.taskName"
                @input="taskNameChanged($event,todo)"
                @click="getTaskInfoEdit(todo)"
                @blur="doSomething"
                v-if="isEditing"
              ></v-text-field>
              <!-- <span
                  :class="{ 'is-completed': todo.status_id }"
                  @click="getTaskInfo(todo)"
                  >{{ todo.taskName }}</span
              >-->
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
  data() {
    return {
      isEditing: false,
      buttonValue: "Edit"
    };
  },
  computed: {
    ...mapGetters(["allTask", "getTaskView"])
  },
  methods: {
    ...mapActions([
      "delTask",
      "getTask",
      "getMemActions",
      "editTaskActions",
      "getTaskByIndex"
    ]),
    deleteTask(id) {
      this.delTask(id);
    },
    doSomething() {
      console.log("Blur event triggered");
    },
    getTaskInfo(task, index) {
      this.$emit("refresh"); //get fresh task from API
      this.getTask(task);
      this.getTaskByIndex(index);
      this.getMemActions(); //get mem in org to assign
    },
    getTaskInfoEdit(task) {
      this.getTask(task);
    },
    saveEdit() {
      if (!this.isEditing) {
        this.buttonValue = "Save";
        this.isEditing = true;
      } else {
        this.buttonValue = "Edit";
        this.isEditing = false;
      }
    },
    taskNameChanged(val, task) {
      this.editTaskActions({ newVal: val, currTask: task });
    }
  }
};
</script>

<style scoped>
.is-completed {
  color: #d9d9d9;
  text-decoration: line-through;
}
.is-editing {
  pointer-events: none;
}
</style>
