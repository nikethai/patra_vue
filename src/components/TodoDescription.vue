<template>
  <v-card class="mx-auto" outlined>
    <v-card-title class="justify-center">{{getTaskView.taskName}}</v-card-title>
    <v-flex class="d-flex flex-row justify-space-around">
      <div class="overline mb-0">Status: {{getTaskView.status_id === 0}}</div>
      <v-dialog v-model="dialog" persistent max-width="500px">
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
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="assign()">Assign</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <span v-if="getUsrFr">
        <p v-for="usr in getUsrFr" :key="usr.memberId">{{usr.username}}</p>
      </span>
    </v-flex>
    <v-card-text>{{ getTaskView.taskDetails }}</v-card-text>
    <v-divider></v-divider>
    <v-container v-if="getTaskView.comments && getTaskView.comments.length ">
      <h5>Comments</h5>
      <!-- <v-row class="mx-auto">
              <v-col cols="12" style="text-align: left">
                
              </v-col>
      </v-row>-->
      <v-flex
        v-if="getTaskView.comments.length > 0"
        class="d-flex flex-column"
        style="text-align: left"
      >
        <v-card v-for="cmt in getTaskView.comments" :key="cmt.id" tile>
          <v-row no-gutters>
            <v-list-item-avatar>
              <v-img src="https://randomuser.me/api/portraits/men/85.jpg" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{cmt.username}}</v-list-item-title>
            </v-list-item-content>
          </v-row>

          <v-row no-gutters>
            <v-container>
              <p class="text-wrap">{{cmt.comment}}</p>
            </v-container>
          </v-row>
        </v-card>
      </v-flex>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import helper from "@/util/fetchHelper.js";

export default {
  name: "tododescription",
  data() {
    return {
      dialog: false,
      items: []
    };
  },
  methods: {
    getUserFromOrgID() {
      let mem = localStorage.getItem("mem_info");
      if (mem != null) {
        mem = JSON.parse(mem);
        axios
          .get(
            `${process.env.VUE_APP_API_URL}/api/v0/organizations/${mem.orgId}/members`
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
    }
  },
  mounted() {
    this.getUserFromOrgID();
  },
  computed: {
    ...mapGetters(["getTaskView", "getMem"]),
    getUsrFr: {
      get() {
        return this.getMem;
      },
      set(value) {
        console.log("select value: ", value);
        this.$store.dispatch("setMems", value);
      }
    }
  }
};
</script>

<style>
</style>