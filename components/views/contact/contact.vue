<template>
  <div class="contact">
    <h1 class="contact__title">have some questions ?</h1>
    <div class="contact__body">
      <div class="contact__image">
        <img
          src="https://image.flaticon.com/icons/png/512/31/31505.png"
          alt=""
        />
      </div>
      <div class="contact__form">
        <form @submit.prevent="handleSendQuestion">
          <BaseInput
            placeholder="Your valid email"
            border
            :icon="['fas', 'at']"
            v-model="$v.email.$model"
          />
          <div class="err-group" v-if="$v.email.$error">
            <BaseText errText v-if="!$v.email.required">{{
              $t("errMessage.emailRequired")
            }}</BaseText>
            <BaseText errText v-if="!$v.email.email"
              >{{ $t("errMessage.emailCheck") }}
            </BaseText>
          </div>
          <BaseInput
            placeholder="Your question"
            border
            :icon="['fas', 'question']"
            v-model="$v.question.$model"
          />
          <div class="err-group" v-if="$v.question.$error">
            <BaseText errText v-if="!$v.question.required">{{
              $t("errMessage.questionTitleRequired")
            }}</BaseText>
          </div>
          <textarea
            placeholder="Your content"
            v-model="$v.content.$model"
          ></textarea>
          <div class="err-group" v-if="$v.content.$error">
            <BaseText errText v-if="!$v.content.required">
              {{ $t("errMessage.questionContentRequired") }}
            </BaseText>
          </div>
          <BaseButton w100>Send</BaseButton>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      email: "",
      question: "",
      content: "",
    };
  },
  methods: {
    handleSendQuestion() {
      this.$v.$touch();

      if (this.$v.$error || this.$v.$invalid) {
        this.$notify({
          type: "error",
          title: "Failed",
          text: "Please correct the form",
        });

        return;
      }
    },
  },
  validations: {
    email: {
      required,
      email,
    },
    question: {
      required,
    },
    content: {
      required,
    },
  },
};
</script>

<style lang="scss" scoped>
.contact {
  width: 80%;
  margin: 0 auto;
}

.contact__title {
  text-transform: uppercase;
  text-align: center;
  padding: 1.5rem 0;
}

.contact__body {
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
}

.contact__image {
  width: 30%;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.contact__form {
  width: 65%;

  textarea {
    width: 100%;
    height: 20rem;
    border: 1px solid black;
    outline: none;
    border-radius: 4px;
    resize: none;
    padding: 1rem;
    margin-bottom: 0.5rem;
  }
}
</style>