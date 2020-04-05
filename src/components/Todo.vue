<template>
  <div>
    <v-dialog max-width="600px" v-model="addDialog">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" class="mx-0" fab x-small dark color="indigo">
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Add Task</span>
        </v-card-title>
        <div v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <ul>
            <b-alert show variant="danger">
              <li :key="error" v-for="error in errors">{{ error }}</li>
            </b-alert>
          </ul>
        </div>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="taskName" :rules="[rules.required]" label="Task Name"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="taskDetail"
                  auto-grow
                  :rules="[rules.required]"
                  label="Sheet Detail"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="addDialog = false" color="error" depressed>Cancel</v-btn>
          <v-btn @click="onAddTask()" color="primary" depressed>Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <span :key="todo.id" v-for="(todo, index) in allTask">
      <v-list flat class="lighten-3">
        <v-list-item>
          <v-list-item-content>
            <v-card>
              <v-card-actions>
                <v-btn
                  solo
                  v-if="!isEditButtonClicked"
                  :value="todo.taskName"
                  @click="getTaskInfo(todo, index)"
                  :class="[todo.statusId === 4 ? 'is-completed' : '']"
                  class="container"
                  text
                  :color="getColor(todo.statusId)"
                >{{ todo.taskName }}</v-btn>
              </v-card-actions>
              <v-card-subtitle class="d-flex pb-0 pe-0 justify-content-end">
                <v-badge class="mx-2" v-if="todo.comments" :content="todo.comments.length">
                  <v-icon small color="grey">mdi-comment</v-icon>
                </v-badge>
                <v-badge class="mx-2" v-if="todo.assignee" :content="todo.assignee.length">
                  <v-icon small color="grey">mdi-account</v-icon>
                </v-badge>
                <v-icon class="mx-2" color="grey" v-if="isAssigned(todo)">mdi-eye</v-icon>
              </v-card-subtitle>
            </v-card>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </span>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import helper from "@/util/fetchHelper.js";

export default {
  name: "Todo",
  props: {
    sheetId: String
  },
  data() {
    return {
      isEditing: false,
      taskName: "",
      taskDetail: "",
      buttonValue: "Edit",
      deleteDialog: false,
      addDialog: false,
      errors: [],
      rules: {
        required: value => !!value || "Required."
      }
    };
  },
  computed: {
    ...mapGetters(["allTask", "getTaskView", "isEditButtonClicked"])
  },
  methods: {
    ...mapActions([
      "delTask",
      "getTask",
      "getMemActions",
      "editTaskActions",
      "getTaskByIndex"
    ]),
    getColor(status) {
      if (status === 0) {
        return "black";
      } else if (status === 1) {
        return "warning";
      } else if (status === 2) {
        return "blue";
      } else if (status === 3) {
        return "success";
      }
    },
    async isAssigned(todo) {
      if (todo) {
        const username = await localStorage.getItem("username");
        if (todo.assignee.includes(username)) {
          return true;
        }
      } else {
        return false;
      }
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
    // saveEdit() {
    //   if (!this.isEditing) {
    //     this.buttonValue = "Save";
    //     this.isEditing = true;
    //     this.$store.commit("setEditButtonClick");
    //   } else {
    //     this.buttonValue = "Edit";
    //     this.isEditing = false;
    //     this.$store.commit("setEditButtonClick");
    //   }
    // },
    taskNameChanged(val, task) {
      this.editTaskActions({ newVal: val, currTask: task });
    },
    async onAddTask() {
      let jwt = localStorage.getItem("jwt");
      if (
        this.sheetId != null &&
        this.taskName.length &&
        this.taskDetail.length &&
        jwt != null
      ) {
        let addTaskResp = await helper.addTaskHelp(
          this.sheetId,
          this.taskName,
          this.taskDetail,
          jwt
        );
        if (addTaskResp.status === 200) {
          this.$emit("refresh");
          this.$store.dispatch("setSnackbar", {
            status: true,
            message: "Add Successfully!"
          });
          this.addDialog = false;
          this.taskName = "";
          this.taskDetail = "";
        } else {
          console.log(addTaskResp);
          this.$store.dispatch("setSnackbar", {
            status: true,
            message: "Add Failed!"
          });
        }
      }
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
