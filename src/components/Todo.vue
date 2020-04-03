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
              <span
                solo
                v-if="!isEditing"
                :value="todo.taskName"
                @click="getTaskInfo(todo,index)"
                :class="[todo.status_id ? 'is-completed':'']"
                class="border container round"
              >{{ todo.taskName }}</span>
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

          <v-dialog v-model="deleteDialog" persistent max-width="290">
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" icon ripple>
                <v-icon color="red">mdi-close-circle</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>Delete this task?</v-card-title>
              <v-card-subtitle>This action cannot be reverted!</v-card-subtitle>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="deleteDialog = false">No</v-btn>
                <v-btn color="red darken-1" text @click="deleteTask(todo)">Yes</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
import helper from "@/util/fetchHelper.js";

export default {
  name: "Todo",
  props: ["todos"],
  data() {
    return {
      isEditing: false,
      buttonValue: "Edit",
      deleteDialog: false
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
    async deleteTask(id) {
      let jwt = localStorage.getItem("jwt");
      if (id != null && jwt != null) {
        let tskID = id.taskId;
        let delTaskResp = await helper.deleteTaskHelp(tskID,jwt);
        if (delTaskResp.status === 200) {
          this.$store.dispatch("setSnackbar", {
            status: true,
            message: "Delete Successfully!"
          });
          this.$emit("refresh");
        } else {
          console.log(delTaskResp);
          this.$store.dispatch("setSnackbar", {
            status: true,
            message: "Delete Failed!"
          });
        }
      }
      // this.delTask(id); //not change in state anymore
      this.deleteDialog = false;
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
        this.$store.commit("setEditButtonClick");
      } else {
        this.buttonValue = "Edit";
        this.isEditing = false;
        this.$store.commit("setEditButtonClick");
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
.border {
  border: 1px solid #ccc !important;
}
.container {
  padding: 0.01em 16px;
}
.round {
  border-radius: 16px;
}
</style>
