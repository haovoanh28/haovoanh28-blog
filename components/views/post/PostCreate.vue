<template>
  <AdminPostEditor action="create" />
</template>

<script>
import Editor from "@tinymce/tinymce-vue";

export default {
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