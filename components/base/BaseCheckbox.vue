<template>
  <div class="checkbox">
    <input
      type="checkbox"
      :id="type"
      @change="handleInputChange"
      :value="type"
      :checked="value.includes(type)"
    />
    <label :for="type">{{ type }}</label>
  </div>
</template>

<script>
export default {
  props: {
    type: String,
    value: Array,
  },
  methods: {
    handleInputChange(e) {
      let currentCheckedTypes = [...this.value];
      if (e.target.checked) {
        currentCheckedTypes.push(e.target.value);
      } else {
        currentCheckedTypes = currentCheckedTypes.filter(
          (type) => type !== e.target.value
        );
      }
      this.$emit("input", currentCheckedTypes);
    },
  },
};
</script>

<style lang="scss" scoped>
.checkbox {
  margin-right: 1rem;

  label {
    text-transform: capitalize;
  }
}
</style>