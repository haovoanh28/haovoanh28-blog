<template>
  <div class="input" :class="classObj">
    <font-awesome-icon :icon="icon" v-if="icon" />
    <input
      :type="type"
      :placeholder="placeholder"
      :value="value"
      @input="handleInput"
    />
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
    },
    width: {
      type: String,
      default: "auto",
    },
    icon: {
      type: Array,
    },
    value: String,
    border: {
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
  },
  computed: {
    classObj() {
      return { "input-border": this.border };
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
    border-left: 1px solid lightgray;
  }
}

.input-border {
  border: 1px solid $primary-color;
}
</style>