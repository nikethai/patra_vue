<template>
  <v-card class="mx-auto" outlined>
    <v-card-title v-if="!isEditButtonClicked" class="justify-center">{{getTaskView.taskName}}</v-card-title>
    <v-text-field
      solo
      :value="getTaskView.taskName"
      @input="onEditorEditTask"
      v-if="isEditButtonClicked"
    ></v-text-field>
    <v-flex class="d-flex flex-row justify-space-around">
      <v-dialog v-model="doneDialog" persistent max-width="500px">
        <template v-slot:activator="{on}">
          <v-btn
            v-on="on"
            class="overline mb-0"
            color="deep-purple darken-1"
            text
          >Status: {{taskStatus}}</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Mark status</span>
          </v-card-title>
          <v-card-text>
            <span>Mark your status</span>
          </v-card-text>
          <v-card-text>
            <v-radio-group v-model="taskStatus" mandatory row>
              <v-radio label="DOING" color="blue" value="DOING"></v-radio>
              <v-radio label="DONE" color="red" value="DONE"></v-radio>
            </v-radio-group>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="doneDialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="onMarkStt">Mark</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- <div class="overline mb-0"></div> -->

      <v-dialog v-model="assignDialog" persistent max-width="500px">
        <template v-slot:activator="{on}">
          <v-btn v-on="on" class="overline" color="error" text>Assign</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">User Assign</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-combobox
                v-model="getUsrFr"
                label="Select user to assign"
                chips
                multiple
                item-text="username"
                return-object
                :items="items"
              ></v-combobox>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="assignDialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="assign()">Assign</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <span v-if="getUsrFr">
        <p v-for="usr in getUsrFr" :key="usr.memberId">{{usr.username}}</p>
      </span>
    </v-flex>

    <v-card-text v-if="!isEditButtonClicked" v-html="getTaskView.taskDetails"></v-card-text>
    <span v-if="isEditButtonClicked">
      <ckeditor
        :editor="editor"
        :disabled="editorDisable"
        :value="getTaskView.taskDetails"
        @input="onEditorEditTask"
        :config="editorConfig"
      ></ckeditor>
    </span>

    <v-divider></v-divider>
    <v-container>
      <h5>Comments</h5>
      <!-- <v-row class="mx-auto">
              <v-col cols="12" style="text-align: left">
                
              </v-col>
      </v-row>-->
      <span v-if="getTaskView.comments && getTaskView.comments.length ">
        <Comments />
      </span>
      <div class="border container round">
        <ckeditor
          :editor="editor"
          :disabled="editorDisable"
          :value="content"
          @input="onEditorEdit"
          :config="editorConfig"
        ></ckeditor>
        <v-btn color="green" text small @click="submitComment(getTaskView.taskId)">Submit</v-btn>
      </div>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import helper from "@/util/fetchHelper.js";
import Comments from "@/components/Comments.vue";
import InlineEditor from "@ckeditor/ckeditor5-build-inline";

export default {
  name: "tododescription",
  data() {
    return {
      assignDialog: false,
      doneDialog: false,
      items: [],
      editor: InlineEditor,
      editorDisable: false,
      buttonText: "Edit",
      taskStt: "",
      content: "",
      editorConfig: {
        // The configuration of the editor.
        placeholder: "Add comment here...",
        toolbar: ["bold", "italic", "|", "undo", "redo"]
      }
    };
  },
  components: {
    Comments
  },
  methods: {
    getUserFromOrgID() {
      let orgId = localStorage.getItem("select_org");
      let jwt = localStorage.getItem("jwt");
      if (orgId != null && jwt != null) {
        let config = {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        };
        axios
          .get(
            `${process.env.VUE_APP_API_URL}/api/v0/organizations/${orgId}/members`,
            config
          )
          .then(res => {
            // let stringarr = res.data.map(item => {
            //   return item["username"];
            // });
            // console.log(stringarr);
            this.items = res.data;
          })
          .catch(e => console.log(e));
      }
    },
    async assign() {
      this.dialog = false;
      let taskID = this.getTaskView.taskId;
      let assigneeSelected = this.getMem;
      let assignResp = await helper.assignHelper(taskID, assigneeSelected);
      if (assignResp.status === 200) {
        this.$store.dispatch("setSnackbar", {
          status: true,
          message: "Assign Successfully!"
        });
      } else {
        this.$store.dispatch("setSnackbar", {
          status: true,
          message: "Assign Failed!"
        });
      }
    },
    async submitComment(taskId) {
      if (this.content != null && this.content.length > 0 && taskId != null) {
        let usrCmt = this.getUserInfo.name;
        let jwt = localStorage.getItem("jwt");
        if (usrCmt != null && jwt != null) {
          let cmtResp = await helper.commentHelp(
            taskId,
            this.content,
            usrCmt,
            jwt
          );
          if (cmtResp.status === 200) {
            this.$store.dispatch("setSnackbar", {
              status: true,
              message: "Comment added!"
            });
            this.$emit("refresh");
            this.content = "";
          } else {
            console.log(cmtResp);

            this.$store.dispatch("setSnackbar", {
              status: true,
              message: "Fail to add comment!"
            });
            this.content = "";
          }
        }
      }
    },
    onEditorEdit(value) {
      this.content = value;
    },
    onEditorEditTask(value) {
      console.log("select value: ", value);
    },
    async onMarkStt() {
      let tskId = this.getTaskView.taskId;
      let jwt = localStorage.getItem("jwt");
      if (
        this.taskStt != null &&
        this.taskStt.length &&
        tskId != null &&
        jwt != null
      ) {
        let markSttResp = await helper.markStatusHelp(tskId, jwt, this.taskStt);
        if (markSttResp.status === 200) {
          this.$store.dispatch("setSnackbar", {
            status: true,
            message: "Mark status successfully!"
          });
          this.$emit("refresh");
          this.doneDialog = false;
        } else {
          this.$store.dispatch("setSnackbar", {
            status: true,
            message: "Fail to mark status!"
          });
        }
      }
    },
    isEmpArr(arr) {
      return Array.isArray(arr) && arr.length;
    }
  },
  mounted() {
    this.getUserFromOrgID();
  },
  computed: {
    ...mapGetters([
      "getTaskView",
      "getMem",
      "getUserInfo",
      "isEditButtonClicked",
      "getTaskViewByIndex",
      "allTask"
    ]),
    getUsrFr: {
      get() {
        return this.getMem;
      },
      set(value) {
        console.log("select value: ", value);
        this.$store.dispatch("setMems", value);
      }
    },
    editorData: {
      get() {
        return "";
      },
      set(val) {
        this.content = val;
      }
    },
    taskStatus: {
      get() {
        let sttId = this.allTask[this.getTaskViewByIndex].statusId;
        if (sttId) {
          switch (sttId) {
            case 0:
              return "PENDING";
            case 1:
              return "DOING";
            case 3:
              return "DONE";
          }
        }
        return "";
      },
      set(val) {
        console.log(val);
        this.taskStt = val;
      }
    }
  }
};
</script>

<style>
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