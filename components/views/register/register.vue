<template>
  <div class="admin__register">
    <div class="admin__register-title">
      <h1>{{ $t("register.title") }}</h1>
    </div>
    <form class="admin__register-body" @submit.prevent="handleRegister">
      <BaseInput
        :placeholder="$t('generalMessage.fullName')"
        border
        :icon="['fas', 'user']"
        v-model="$v.fullName.$model"
      />
      <div class="err-group" v-if="$v.fullName.$error">
        <BaseText errText v-if="!$v.fullName.required">{{
          $t("errMessage.nameRequired")
        }}</BaseText>
        <BaseText errText v-if="!$v.fullName.minLength">{{
          $t("errMessage.nameCharacters")
        }}</BaseText>
      </div>
      <BaseInput
        :placeholder="$t('generalMessage.age')"
        border
        :icon="['fab', 'autoprefixer']"
        v-model="$v.age.$model"
      />
      <div class="err-group" v-if="$v.age.$error">
        <BaseText errText v-if="!$v.age.required">{{
          $t("errMessage.ageRequired")
        }}</BaseText>
        <BaseText errText v-if="!$v.age.between">{{
          $t("errMessage.ageRange")
        }}</BaseText>
      </div>
      <BaseInput
        :placeholder="$t('generalMessage.email')"
        border
        :icon="['fas', 'at']"
        v-model="$v.email.$model"
      />
      <div class="err-group" v-if="$v.email.$error">
        <BaseText errText v-if="!$v.email.required">{{
          $t("errMessage.emailRequired")
        }}</BaseText>
        <BaseText errText v-if="!$v.email.between"
          >{{ $t("errMessage.emailCheck") }}
        </BaseText>
      </div>
      <BaseInput
        :placeholder="$t('generalMessage.password')"
        type="password"
        border
        :icon="['fas', 'lock']"
        v-model="$v.password.$model"
      />
      <div class="err-group" v-if="$v.password.$error">
        <BaseText errText v-if="!$v.password.required">{{
          $t("errMessage.passwordRequired")
        }}</BaseText>
        <BaseText errText v-if="!$v.password.minLength"
          >{{ $t("errMessage.passwordCharacters") }}
        </BaseText>
      </div>
      <BaseInput
        :placeholder="$t('generalMessage.confirmPassword')"
        type="password"
        border
        :icon="['fas', 'lock']"
        v-model="$v.confirmPassword.$model"
      />
      <div class="err-group" v-if="$v.confirmPassword.$error">
        <BaseText errText v-if="!$v.confirmPassword.required">{{
          $t("errMessage.confirmPasswordRequired")
        }}</BaseText>
        <BaseText errText v-if="!$v.confirmPassword.minLength"
          >{{ $t("errMessage.confirmPasswordCharacters") }}
        </BaseText>
        <BaseText errText v-if="!$v.confirmPassword.sameAsPassword"
          >{{ $t("errMessage.confirmPasswordNotTheSame") }}
        </BaseText>
      </div>
      <BaseButton :loading="loading" uppercase>{{
        $t("register.button")
      }}</BaseButton>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import {
  required,
  email,
  sameAs,
  minLength,
  between,
} from "vuelidate/lib/validators";

export default {
  data() {
    return {
      fullName: "",
      age: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  computed: {
    ...mapState("auth", ["loading"]),
  },
  methods: {
    ...mapActions("account/register", ["registerAsync"]),
    handleRegister() {
      this.$v.$touch();

      if (this.$v.$error || this.$v.$invalid) {
        this.$notify({
          type: "error",
          title: "Failed",
          text: "Please correct the form",
        });

        return;
      }

      this.registerAsync({
        fullName: this.fullName,
        age: this.age,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
      }).then((res) => {
        this.$v.$reset();
        this.fullName = "";
        this.age = "";
        this.email = "";
        this.password = "";
        this.confirmPassword = "";
      });
    },
  },
  validations: {
    fullName: {
      required,
      minLength: minLength(4),
    },
    age: {
      required,
      between: between(18, 40),
    },
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(7),
    },
    confirmPassword: {
      required,
      minLength: minLength(7),
      sameAsPassword: sameAs("password"),
    },
  },
};
</script>

<style lang="scss" scoped>
.admin__register {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  padding-bottom: 2rem;
}

.admin__register-title {
  text-transform: uppercase;
  padding: 1.5rem 0;
}
</style>