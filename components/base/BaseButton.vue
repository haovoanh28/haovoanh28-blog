<template>
  <button :class="classObj" :style="styleObj" :disabled="disabled || loading">
    <template v-if="loading">
      <font-awesome-icon :icon="['fas', 'cog']" />
    </template>
    <template v-else>
      <slot></slot>
    </template>
  </button>
</template>

<script>
export default {
  props: {
    btnType: {
      type: String,
      default: "1",
    },
    display: {
      type: String,
      default: "initial",
    },
    width: {
      type: String,
      default: "auto",
    },
    uppercase: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    w100: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classObj() {
      return {
        btn: true,
        [`btn--${this.btnType}`]: true,
        uppercase: this.uppercase,
        "w-100": this.w100,
      };
    },
    styleObj() {
      return {
        display: this.display,
        width: this.width,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  outline: none;
  border: none;
  padding: 1rem 1.5rem;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background-color: lighten(gray, 10%);
    cursor: not-allowed;
  }

  @include tablet {
    &:hover {
      transform: unset;
    }

    &:active {
      transform: unset;
    }
  }
}

.btn--1 {
  background-color: $black;
  color: $white;
}

.btn--edit {
  background-color: #2e4ef0;
  color: $white;
}

.btn--delete {
  background-color: #ff0000;
  color: $white;
}

.fa-cog {
  animation: spinner 1s linear infinite;
}
</style>