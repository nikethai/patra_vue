<template>
  <div id="app">
    <v-btn color="error" @click="toggle()">{{buttonText}}</v-btn>
    <v-file-input
      accept="image/png, image/jpeg, image/bmp"
      placeholder="Pick an avatar"
      prepend-icon="mdi-camera"
      label="Avatar"
      v-model="imageFile"
    ></v-file-input>
    <div class="border container round">
      <ckeditor
        :editor="editor"
        :disabled="editorDisable"
        v-model="editorData"
        :config="editorConfig"
      ></ckeditor>
    </div>
    <!-- <img src="https://patra.s3.amazonaws.com/images/1585462383239_Bosch-Supergraphic.jpg"/> -->
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
      editorDisable: false,
      buttonText: "Edit",
      imageFile: null,
      content: "",
      editorConfig: {
        // The configuration of the editor.
        placeholder: "Write your comment..."
        // toolbar: [ 'bold', 'italic','underline', '|', 'undo', 'redo' ]
      }
    };
  },
  components: {
    // Todo
  },
  methods: {
    toggle() {
      // if (this.editorDisable) {
      //   this.buttonText = "Save";
      //   this.editorDisable = !this.editorDisable;
      // } else {
      //   this.buttonText = "Edit";
      //   this.editorDisable = !this.editorDisable;
      //   localStorage.setItem("test", this.content);
      // }
      let fd = new FormData();
      fd.append("image",this.imageFile);
      fd.append("content",this.content);
      for (var vl of fd.values()){
        console.log(vl);
        
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
    },
    imageFile(){
      console.log(this.imageFile);
      
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
