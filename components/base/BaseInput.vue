<template>
  <div class="input" :class="classObj">
    <font-awesome-icon :icon="icon" v-if="icon" />
    <input
      :type="type"
      v-bind="$attrs"
      :value="value"
      @input="handleInput"
      @blur="handleBlur"
    />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: "text",
    },
    icon: {
      type: Array,
    },
    value: String,
    border: {
      type: Boolean,
      default: false,
    },
    w50: {
      type: Boolean,
      default: false,
    },
  },
  model: {
    prop: "value",
    event: "input",
  },
  methods: {
    handleInput(e) {
      this.$emit("input", e.target.value);
    },
    handleBlur(e) {
      this.$emit("blur");
    },
  },
  computed: {
    classObj() {
      return { "input-border": this.border, "w-50": this.w50 };
    },
  },
};
</script>

<style lang="scss" scoped>
.input {
  background-color: $white;
  border-radius: 4px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;

  svg {
    margin-left: 1rem;
    width: 5%;
  }

  input {
    padding: 1rem;
    margin-left: 1rem;
    outline: none;
    border: none;
    width: 90%;
    border-left: 1px solid $primary-color;
    font-size: 1.5rem;
  }
}

.input-border {
  border: 1px solid $primary-color;
}
</style>