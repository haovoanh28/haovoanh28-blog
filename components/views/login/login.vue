<template>
  <div class="admin">
    <BaseText center uppercase textBig fw600 padding="0 0 2rem 0">{{
      $t("login.title")
    }}</BaseText>
    <form @submit.prevent="handleLogin">
      <BaseInput
        :placeholder="$t('generalMessage.email')"
        :icon="['fas', 'at']"
        v-model="$v.email.$model"
      />
      <div class="err-group" v-if="$v.email.$error">
        <BaseText errText v-if="!$v.email.required">{{
          $t("errMessage.emailRequired")
        }}</BaseText>
        <!-- <BaseText errText v-if="!$v.email.email">Incorrect format</BaseText> -->
      </div>
      <BaseInput
        type="password"
        :placeholder="$t  ('generalMessage.password')"
        :icon="['fas', 'lock']"
        v-model="$v.password.$model"
      />
      <div class="err-group" v-if="$v.password.$error">
        <BaseText errText v-if="!$v.password.required">{{
          $t("errMessage.passwordRequired")
        }}</BaseText>
      </div>
      <BaseButton display="block" width="100%" :loading="loading">{{
        $t("login.button")
      }}</BaseButton>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { required, email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    ...mapState("account/login", ["loading"]),
  },
  methods: {
    ...mapActions("account/login", ["loginAsync"]),
    async handleLogin() {
      this.$v.$touch();

      if (this.$v.$error || this.$v.$invalid) {
        this.$notify({
          type: "error",
          title: "Failed",
          text: "Please correct the form",
        });

        return;
      }

      await this.loginAsync({
        email: this.email,
        password: this.password,
      });
    },
  },
  validations: {
    email: {
      required,
    },
    password: {
      required,
    },
  },
};
</script>

<style lang="scss" scoped>
.admin {
  min-height: 90vh;
  width: 70%;
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;

  @include small_phone {
    width: 90%;
  }
}
</style>