<template>
  <textarea
    class="textarea"
    :class="classObj"
    @input="handleInput"
    :value="value"
  />
</template>

<script>
export default {
  props: {
    border: {
      type: Boolean,
      default() {
        return false;
      },
    },
    value: {
      type: String,
      default() {
        return "";
      },
    },
  },
  computed: {
    classObj() {
      return {
        "textarea-border": this.border,
      };
    },
  },
  methods: {
    handleInput(e) {
      this.$emit("input", e.target.value);
    },
  },
};
</script>

<style lang="scss">
.textarea {
  border-radius: 4px;
  outline: none;
  padding: 1rem;
  width: 100%;
  min-height: 5rem;
  resize: none;
  margin-bottom: 1rem;
  line-height: 1.5;
  font-size: 1.5rem;
  font-family: inherit;
  transition: 1s all ease-in-out;

  &:focus {
    min-height: 15rem;
  }
}

.textarea-border {
  border: 1px solid $primary-color;
}
</style>