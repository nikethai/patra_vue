<template>
  <v-container fluid>
    <v-row>
      <v-col
        :cols="!isEmp(getTaskView)?'md-5 nopadding-task lighten-3':'md-12 nopadding-task'"
      >
        <v-card class="mx-auto lighten-3" flat>
          <v-card-title class="justify-center headline font-weight-bold">{{getSheetName}}</v-card-title>
          <v-card-text>
            <Todo @refresh="getTas()" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col v-if="!isEmp(getTaskView)" cols="md-7  pa-1">
        <TodoDescription @refresh="getTas" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import Todo from "@/components/Todo.vue";
import TodoDescription from "@/components/TodoDescription.vue";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

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
    TodoDescription
  },
  methods: {
    ...mapActions(["fetchTask"]),
    getTas() {
      this.fetchTask(this.$route.params.id);
    },
    isEmp(obj) {
      return (
        obj != null &&
        Object.keys(obj).length === 0 &&
        obj.constructor === Object
      );
    },
    isNotEmpArr(arr) {
      return Array.isArray(arr) && arr.length;
    },
    assign() {
      this.dialog = false;
    }
  },
  created() {
    this.getTas();
  },
  computed: {
    ...mapGetters(["getTaskView"]),
    getSheetName(){
      let sheetName = localStorage.getItem("sheet_name");
      if (sheetName != null){
        return sheetName;
      }
      return "";
    }
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
