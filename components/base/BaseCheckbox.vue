<template>
  <div class="checkbox">
    <input
      type="checkbox"
      :id="value"
      @change="handleInputChange"
      :value="value"
    />
    <label :for="value">{{ value }}</label>
  </div>
</template>

<script>
export default {
  props: {
    value: String,
  },
  methods: {
    handleInputChange(e) {
      if (e.target.checked) {
        // console.log(e.target.value);
        this.$emit("select-type", e.target.value);
      } else {
        this.$emit("unselect-type", e.target.value);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.checkbox {
  margin-right: 1rem;
}
</style>