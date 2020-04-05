<template>
  <v-card class="mx-auto" outlined>
    <v-card-title v-if="!isEditButtonClicked" class="justify-center headline">{{getTaskView.taskName}}</v-card-title>
    <v-text-field
      solo
      :value="getTaskView.taskName"
      @input="onEditorEditTask"
      v-if="isEditButtonClicked"
    ></v-text-field>
    <v-flex class="d-flex flex-row justify-space-around">
      <div class="overline mb-0">Status <p class="subtitle-1" :class="getColor(getTaskView.statusId)">{{getTaskViewStatus}} </p> </div>
      <v-dialog v-model="dialog" persistent max-width="500px">
        <template v-slot:activator="{on}">
          <v-btn v-on="on" class="overline subtitle-1 font-weight-bold" outlined color="blue" text>Assign</v-btn>
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
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" class="sub" text @click="assign()">Assign</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>

    <v-card-text v-if="!isEditButtonClicked" v-html="getTaskView.taskDetails" style="text-align: left"></v-card-text>
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
    <v-container class="pa-2">
      <h5>Comments</h5>
      <span v-if="getTaskView.comments && getTaskView.comments.length ">
        <Comments />
      </span>
      <div class="border container round mb-2">
        <ckeditor
          :editor="editor"
          :disabled="editorDisable"
          :value="content"
          @input="onEditorEdit"
          :config="editorConfig"
        ></ckeditor>
        <v-btn color="green" text small @click="submitComment(getTaskView.taskId)">Send</v-btn>
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
      dialog: false,
      items: [],
      editor: InlineEditor,
      editorDisable: false,
      buttonText: "Edit",
      content: "",
      editorConfig: {
        // The configuration of the editor.
        placeholder: "Write your comment...",
        toolbar: ["bold", "italic", "|", "undo", "redo"]
      }
    };
  },
  components: {
    Comments
  },
  methods: {
    getUserFromOrgID() {
      let mem = localStorage.getItem("mem_info");
      let jwt = localStorage.getItem("jwt");
      if (mem != null && jwt != null) {
        let config = {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        };
        mem = JSON.parse(mem);
        axios
          .get(
            `${process.env.VUE_APP_API_URL}/api/v0/organizations/${mem.orgId}/members`,
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
    getColor(status) {
      if (status === 0) {
        return 'black--text'
      } else if (status === 1) {
        return 'warning--text'
      } else if (status === 2) {
        return 'blue--text'
      } else if (status === 3) {
        return 'success--text'
      }
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
      "getTaskViewStatus"
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