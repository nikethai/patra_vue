<template>
  <v-container fluid>
    <v-row>
      <v-col
        :cols="!isEmp(getTaskView)?'md-5 nopadding-task grey lighten-4':'md-12 nopadding-task'"
      >
        <v-card class="mx-auto" flat>
          <v-card-title class="justify-center">Checklist1</v-card-title>
          <v-card-text>
            <AddTodo />
            <Todo @refresh="getTas()"/>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col v-if="!isEmp(getTaskView)" cols="md-7  nopadding-desc">
        <TodoDescription/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import Todo from "@/components/Todo.vue";
import AddTodo from "@/components/AddTodo.vue";
import TodoDescription from "@/components/TodoDescription.vue";
import axios from "axios";
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
    AddTodo,
    TodoDescription
  },
  methods: {
    ...mapActions(["fetchTask", "getMemActions"]),
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
    assign() {
      this.dialog = false;
    }
  },
  mounted() {
    this.getTas();
  },
  asyncComputed: {
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
