<template>
  <div id="app">
    <v-btn color="error" @click="toggle()">{{buttonText}}</v-btn>
    <div class="border container round">
      <ckeditor
        :editor="editor"
        :disabled="editorDisable"
        v-model="editorData"
        :config="editorConfig"
      ></ckeditor>
    </div>
  </div>
</template>

<script>
import InlineEditor from "@ckeditor/ckeditor5-build-inline";
// import Todo from "@/components/Todo.vue";

export default {
  name: "about",
  data() {
    return {
      editor: InlineEditor,
      editorDisable: true,
      buttonText: "Edit",
      content: "",
      editorConfig: {
        // The configuration of the editor.
        placeholder: "Add comment here...",
        toolbar: [ 'bold', 'italic','underline', '|', 'undo', 'redo' ]
      }
    };
  },
  components: {
    // Todo
  },
  methods: {
    toggle() {
      if (this.editorDisable) {
        this.buttonText = "Save";
        this.editorDisable = !this.editorDisable;
      } else {
        this.buttonText = "Edit";
        this.editorDisable = !this.editorDisable;
        localStorage.setItem("test", this.content);
      }
    }
  },
  computed: {
    editorData: {
      get() {
        return localStorage.getItem("test");
      },
      set(val) {
        this.content = val;
      }
    }
  },
  watch: {
    editorData() {
      console.log(this.editorData);
    }
  }
};
</script>
<style  scoped>
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
