<template>
  <v-container fluid>
    <v-row>
      <v-col cols="md-5 nopadding-task grey">
        <v-card class="mx-auto" flat>
          <v-card-title class="justify-center">Checklist1</v-card-title>
          <v-card-text>
            <AddTodo />
            <Todo />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="md-7  nopadding-desc">
        <v-card class="mx-auto" outlined>
          <v-card-title class="justify-center">{{
            getTaskView.taskName
          }}</v-card-title>
          <v-flex class="d-flex flex-row justify-space-around">
            <div class="overline mb-0">
              Status: {{ getTaskView.status_id === 0 }}
            </div>
            <v-dialog max-width="500px" persistent v-model="dialog">
              <template v-slot:activator="{ on }">
                <v-btn class="overline" color="error" text v-on="on"
                  >Assign</v-btn
                >
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">User Assign</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-combobox
                      :items="items"
                      chips
                      item-text="username"
                      label="Select user to assign"
                      multiple
                      return-object
                      v-model="select"
                    ></v-combobox>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="dialog = false" color="blue darken-1" text
                    >Close</v-btn
                  >
                  <v-btn @click="assign()" color="blue darken-1" text
                    >Save</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
            <div v-if="select.length">
              <p :key="usr.memberId" v-for="usr in select">
                {{ usr.username }}
              </p>
            </div>
          </v-flex>
          <v-card-text>{{ getTaskView.taskDetails }}</v-card-text>
          <v-divider></v-divider>
          <v-container
            v-if="getTaskView.comments && getTaskView.comments.length"
          >
            <h5>Comments</h5>
            <!-- <v-row class="mx-auto">
                          <v-col cols="12" style="text-align: left">
                            
                          </v-col>
                        </v-row>-->
            <v-flex class="d-flex flex-column" style="text-align: left">
              <v-card
                :key="cmt.id"
                outlined
                v-for="cmt in getTaskView.comments"
              >
                <v-row no-gutters>
                  <v-list-item-avatar>
                    <v-img
                      src="https://randomuser.me/api/portraits/men/85.jpg"
                    />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>{{ cmt.username }}</v-list-item-title>
                  </v-list-item-content>
                </v-row>

                <v-row no-gutters>
                  <v-container>
                    <p class="text-wrap">{{ cmt.comment }}</p>
                  </v-container>
                </v-row>
              </v-card>
            </v-flex>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import Todo from "@/components/Todo.vue";
import AddTodo from "@/components/AddTodo.vue";
import { mapActions, mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "task",
  data() {
    return {
      dialog: false,
      select: [],
      items: []
    };
  },
  components: {
    Todo,
    AddTodo
  },
  methods: {
    ...mapActions(["fetchTask"]),
    getTas() {
      this.fetchTask(this.$route.params.id);
    },
    isEmp(obj) {
      return Object.keys(obj).length === 0 && obj.constructor === Object;
    },
    assign() {
      this.dialog = false;
    },
    getUserFromOrgID() {
      let mem = localStorage.getItem("mem_info");
      if (mem != null) {
        mem = JSON.parse(mem);
        axios
          .get(
            `${process.env.VUE_APP_API_URL}/api/v0/organizations/${
              mem.orgId
            }/members`
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
    }
  },
  mounted() {
    this.getTas();
    this.getUserFromOrgID();
  },
  computed: {
    ...mapGetters(["getTaskView"])
  }
};
</script>

<style scoped>
.nopadding-desc {
  margin: 0 !important;
  padding: 0 !important;
}

.nopadding-task {
  margin: 0 !important;
  padding: 0 !important;
  max-height: 100%;
}
</style>
