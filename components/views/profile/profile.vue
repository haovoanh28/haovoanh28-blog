<template>
  <div class="admin__profile">
    <div class="admin__profile-title">
      <h1>{{ $t("edit.title") }}</h1>
    </div>
    <div class="admin__profile-body">
      <div class="admin__profile-avatar">
        <img :src="previewImage" v-if="previewImage" />
        <img :src="user.imgUrl" alt="user" v-else />
        <label for="profile-avatar">
          <font-awesome-icon :icon="['fas', 'camera']" />
        </label>
        <input id="profile-avatar" type="file" @change="handlePreviewImage" />
        <BaseButton
          uppercase
          w100
          v-if="previewImage"
          @click.native="handleUploadImage"
          >Upload</BaseButton
        >
      </div>
      <div class="admin__profile-form">
        <BaseInput
          placeholder="Full Name"
          :icon="['fas', 'user']"
          border
          v-model="fullName"
        />
        <BaseInput
          placeholder="Age"
          :icon="['fab', 'autoprefixer']"
          border
          v-model="age"
        />
        <BaseInput
          placeholder="New Password"
          :icon="['fas', 'lock']"
          border
          v-model="password"
        />
        <BaseButton uppercase @click.native="handleUpdateProfile">{{
          $t("edit.button")
        }}</BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      fullName: "",
      age: "",
      password: "",
      previewImage: "",
      uploadedImage: "",
    };
  },
  computed: {
    ...mapState("auth", ["user"]),
  },
  methods: {
    ...mapActions("account/edit", ["uploadAvatarAsync", "updateProfileAsync"]),
    handlePreviewImage(e) {
      this.uploadedImage = e.target.files[0];
      if (this.uploadedImage) {
        this.previewImage = URL.createObjectURL(this.uploadedImage);
      }
    },
    handleUploadImage() {
      let data = new FormData();
      data.append("avatar", this.uploadedImage);
      this.uploadAvatarAsync({
        data,
        userId: this.user._id,
      }).then(() => {
        this.previewImage = "";
        this.uploadedImage = "";
      });
    },
    handleUpdateProfile() {
      this.updateProfileAsync({
        id: this.user._id,
        fullName: this.fullName,
        age: this.age,
      });
    },
  },
  mounted() {
    this.fullName = this.user.fullName;
    this.age = this.user.age.toString();
  },
};
</script>

<style lang="scss" scoped>
.admin__profile {
  width: 90%;
  margin: 0 auto;
}

.admin__profile-title {
  text-transform: uppercase;
  padding: 1.5rem 0;
  text-align: center;
}

.admin__profile-body {
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
}

.admin__profile-avatar {
  width: 10rem;
  height: 10rem;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10rem;
  }
  svg {
    position: absolute;
    bottom: 0;
    right: 1rem;
    font-size: 2.5rem;
    z-index: 2;
    color: $white;
    padding: 0.5rem;
    background-color: $black;
    border-radius: 50%;
    cursor: pointer;
  }
  input {
    display: none;
  }

  button {
    margin-top: 2rem;
  }
}

.admin__profile-form {
  width: 50%;
}
</style>