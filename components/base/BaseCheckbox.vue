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
        console.log(e.target.value);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.checkbox {
}
</style>