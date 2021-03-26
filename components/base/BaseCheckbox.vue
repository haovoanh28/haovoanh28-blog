<template>
  <div class="checkbox">
    <input
      type="checkbox"
      :id="cat"
      @change="handleInputChange"
      :value="cat"
      :checked="value.includes(cat)"
    />
    <label :for="cat">{{ cat }}</label>
  </div>
</template>

<script>
export default {
  props: {
    cat: String,
    value: Array,
  },
  methods: {
    handleInputChange(e) {
      let currentCheckedTypes = [...this.value];
      if (e.target.checked) {
        currentCheckedTypes.push(e.target.value);
      } else {
        currentCheckedTypes = currentCheckedTypes.filter(
          (cat) => cat !== e.target.value
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