<template>
  <p :class="classObj" :style="styleObj">
    <slot></slot>
  </p>
</template>

<script>
export default {
  name: "base-text",
  props: {
    center: {
      type: Boolean,
      default: false,
    },
    errText: {
      type: Boolean,
      default: false,
    },
    fw800: {
      type: Boolean,
      default: false,
    },
    fw600: {
      type: Boolean,
      default: false,
    },
    textBig: {
      type: Boolean,
      default: false,
    },
    textMedium: {
      type: Boolean,
      default: false,
    },
    capitalize: {
      type: Boolean,
      default: false,
    },
    padding: {
      type: String,
      default: "",
    },
    uppercase: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    styleObj() {
      return {
        padding: this.padding,
      };
    },
    classObj() {
      return {
        "err-text": !!this.errText,
        "text-center": !!this.center,
        "fw-800": !!this.fw800,
        "fw-600": !!this.fw600,
        "text-big": !!this.textBig,
        "text-medium": !!this.textMedium,
        capitalize: !!this.capitalize,
        uppercase: !!this.uppercase,
      };
    },
  },
};
</script>

<style>
</style>