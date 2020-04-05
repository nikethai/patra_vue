<template>
  <div>
    <v-btn dense text color="info" @click="saveEdit">{{ buttonValue }}</v-btn>
    <span :key="todo.id" v-for="(todo, index) in allTask">
      <v-list flat class="lighten-3">
        <v-list-item>
          <v-list-item-content>
            <v-card>
              <v-card-actions>
                <v-btn
                  solo
                  v-if="!isEditing"
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
