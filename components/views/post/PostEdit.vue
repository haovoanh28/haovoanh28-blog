<template>
  <AdminPostEditor action="edit" />
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
import { mapActions } from "vuex";

export default {
  middleware: "auth",
  components: {
    editor: Editor,
  },
};
</script>

<style lang="scss">
.editor {
  margin: 0 auto;
  padding: 2rem 0;
  width: 80%;
}

.editor__intro {
  margin-bottom: 2rem;
}

.editor__buttons {
  margin-top: 2rem;

  button:first-child {
    margin-right: 1rem;
  }
}
</style>