<template>
  <transition name="list">
    <div class="post-item">
      <BaseText>{{ handleText(post.title, 10) }}</BaseText>
      <div>
        <BaseButton
          btnType="edit"
          @click.native="handleEditClick"
          :disabled="!!loadingId"
          ><font-awesome-icon :icon="['fas', 'edit']"
        /></BaseButton>
        <BaseButton
          btnType="delete"
          @click.native="handleDeleteClick"
          :loading="loadingId === post._id"
          :disabled="!!loadingId"
          ><font-awesome-icon :icon="['fas', 'trash-alt']"
        /></BaseButton>
      </div>
    </div>
  </transition>
</template>

<script>
import handleText from "@/libs/helpers/handleText";

export default {
  props: {
    post: Object,
    loadingId: {
      type: String,
      default: "",
    },
  },
  methods: {
    handleText,
    handleEditClick() {
      this.$router.push({ path: `/admin/post/edit/${this.post._id}` });
    },
    handleDeleteClick() {
      this.$emit("delete-post", this.post._id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
};
</script>

<style lang="scss" scoped>
.post-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0;

  &:not(:last-child) {
    border-bottom: 1px solid lightgray;
  }

  p {
    width: 65%;
  }

  div {
    display: flex;
    justify-content: space-between;

    button:last-child {
      margin-left: 1rem;
    }
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s;
  opacity: 0.5;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>