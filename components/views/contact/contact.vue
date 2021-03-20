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
            placeholder="Type in your message"
            v-model="$v.content.$model"
            style="border: 1px solid #926aa6"
          ></textarea>
          <div class="err-group" v-if="$v.content.$error">
            <BaseText errText v-if="!$v.content.required">
              {{ $t("errMessage.questionContentRequired") }}
            </BaseText>
          </div>
          <BaseButton w100 :loading="loading">Send</BaseButton>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { required, email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      email: "",
      question: "",
      content: "",
    };
  },
  computed: {
    ...mapState("sendMail", ["loading"]),
  },
  methods: {
    ...mapActions("sendMail", ["sendMailAsync"]),
    async handleSendQuestion() {
      this.$v.$touch();

      if (this.$v.$error || this.$v.$invalid) {
        this.$notify({
          type: "error",
          title: "Failed",
          text: "Please correct the form",
        });
        return;
      }

      await this.sendMailAsync({
        from: this.email,
        question: this.question,
        content: this.content,
      });

      for (let key in this.$data) {
        this.$data[key] = "";
      }

      this.$v.$reset();
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

  @include medium_phone {
    width: 90%;
  }
}

.contact__title {
  text-transform: uppercase;
  text-align: center;
  padding: 1.5rem 0;

  @include small_phone {
    font-size: 2.5rem;
  }
}

.contact__body {
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;

  @include tablet {
    justify-content: center;
  }
}

.contact__image {
  width: 30%;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  @include tablet {
    display: none;
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

  @include large_phone {
    width: 80%;
  }

  @include medium_phone {
    width: 90%;
  }

  @include small_phone {
    width: 100%;
  }
}
</style>