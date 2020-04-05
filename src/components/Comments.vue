<template>
  <v-flex
    v-if="isEmpArr(allTask[getTaskViewByIndex].comments)"
    class="d-flex flex-column"
    style="text-align: left"
  >
    <v-card v-for="cmt in allTask[getTaskViewByIndex].comments" :key="cmt.id" class="pa-1 mb-2">
      <v-row class="d-flex flex-row flex-nowrap" no-gutters>
        <v-card-text>
          <v-avatar>
            <v-img
              contain
              src="https://randomuser.me/api/portraits/men/86.jpg"
              max-height="30px"
              max-width="30px"
            />
          </v-avatar>
          <span class="mr-auto">{{ cmt.username }}</span>
        </v-card-text>
        <v-btn @click.stop="onDeleteComment(cmt)" text color="red" icon>
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-row>
      <v-row no-gutters>
        <v-container>
          <span v-html="cmt.comment"></span>
          <p class="text-wrap"></p>
        </v-container>
      </v-row>
    </v-card>
    <v-dialog v-model="deleteDialog" persistent max-width="290">
      <v-card>
        <v-card-title>Delete this comment?</v-card-title>
        <v-card-subtitle>This action cannot be reverted!</v-card-subtitle>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="deleteDialog = false">No</v-btn>
          <v-btn color="red darken-1" text @click="deleteCmt()">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-flex>
</template>

<script>
import { mapGetters } from "vuex";
import helper from "@/util/fetchHelper.js";

export default {
  name: "comments",
  data() {
    return {
      deleteDialog: false,
      cmtId: ""
    };
  },
  methods: {
    isEmpArr(arr) {
      return Array.isArray(arr) && arr.length;
    },
    async deleteCmt() {
      let jwt = localStorage.getItem("jwt");
      let taskID = this.getTaskView.taskId;

      if (taskID != null && this.cmtId.length && jwt != null) {
        let delTaskResp = await helper.deleteCommentHelp(
          taskID,
          this.cmtId,
          jwt
        );
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
    onDeleteComment(cmt) {
      if (cmt != null) {
        this.cmtId = cmt.commentId;
      }
      this.deleteDialog = true;
    }
  },
  computed: {
    ...mapGetters(["getTaskView", "getTaskViewByIndex", "allTask"])
  }
};
</script>

<style>
</style>