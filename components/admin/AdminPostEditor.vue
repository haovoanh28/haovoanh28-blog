<template>
  <div class="editor">
    <div class="editor__intro">
      <h1 :class="['uppercase', 'text-center']">{{ getTitle }}</h1>
    </div>
    <div class="editor__title">
      <BaseInput
        :placeholder="$t('post.coverImg')"
        border
        :icon="['fas', 'image']"
        v-model="$v.post.coverImg.$model"
      />
      <div class="err-group" v-if="$v.post.coverImg.$error">
        <BaseText errText v-if="!$v.post.coverImg.required">{{
          $t("errMessage.coverImgRequired")
        }}</BaseText>
      </div>
      <BaseInput
        :placeholder="$t('post.title')"
        border
        :icon="['fas', 'thumbtack']"
        v-model="$v.post.title.$model"
      />
      <div class="err-group" v-if="$v.post.title.$error">
        <BaseText errText v-if="!$v.post.title.required">{{
          $t("errMessage.titleRequired")
        }}</BaseText>
      </div>
      <div class="editor__checkbox-group">
        <BaseCheckbox
          v-for="cat in categories"
          :cat="cat"
          :key="`checkbox-${cat}`"
          v-model="post.types"
        />
      </div>
      <div class="err-group" v-if="$v.post.types.$error">
        <BaseText errText v-if="!$v.post.types.required">{{
          $t("errMessage.postTypesRequired")
        }}</BaseText>
      </div>
      <textarea
        :placeholder="$t('post.introduction')"
        v-model="$v.post.introduction.$model"
        spellcheck="false"
      />
      <div class="err-group" v-if="$v.post.introduction.$error">
        <BaseText errText v-if="!$v.post.introduction.required">{{
          $t("errMessage.introductionRequired")
        }}</BaseText>
      </div>
    </div>
    <div class="editor__tool" style="border: 1px solid #926aa6">
      <editor
        api-key="zkr4z6fnh3osmkkm1h95whkoy62b5rvfewo6u83ac96mmm3k"
        :init="initConfig"
        v-model="$v.post.content.$model"
      />
      <div class="err-group" v-if="$v.post.content.$error">
        <BaseText errText v-if="!$v.post.content.required">{{
          $t("errMessage.contentRequired")
        }}</BaseText>
      </div>
    </div>
    <div class="editor__buttons">
      <template v-if="action === 'create'">
        <BaseButton
          uppercase
          @click.native="handleCreatePostClick"
          :disabled="loading"
          :loading="loading"
          >{{ $t("post.createBtn") }}</BaseButton
        >
      </template>
      <template v-else>
        <BaseButton
          uppercase
          @click.native="handleEditPostClick"
          :disabled="loading"
          :loading="loading"
          >{{ $t("post.editBtn") }}</BaseButton
        >
      </template>

      <BaseButton
        uppercase
        btnType="delete"
        :disabled="loading"
        @click.native="clearForm"
        >{{ $t("generalMessage.clear") }}</BaseButton
      >
    </div>
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
import { mapState, mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
  middleware: "auth",
  layout: "admin",
  data() {
    return {
      initConfig: {
        height: 800,
        menubar: false,
        strict_loading_mode: true,
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount",
          "code",
        ],
        toolbar:
          "undo redo | formatselect | bold italic backcolor |  alignleft aligncenter alignright alignjustify image insert link |  bullist numlist outdent indent |removeformat | code | help",
      },
      post: {
        content: "",
        coverImg: "",
        types: [],
        introduction: "",
        title: "",
      },
    };
  },
  components: {
    editor: Editor,
  },
  props: {
    action: String,
  },
  computed: {
    ...mapState("post/get", ["loading"]),
    ...mapState("general", ["categories"]),
    getTitle() {
      if (this.action === "create") {
        return this.$t("post.create");
      }

      if (this.action === "edit") {
        return this.$t("post.edit");
      }
    },
  },
  methods: {
    ...mapActions("post/get", ["getPostByIdAsync"]),
    ...mapActions("post/add", ["addPostAsync"]),
    ...mapActions("post/edit", ["editPostByIdAsync"]),
    verifyForm() {
      this.$v.$touch();
      if (this.$v.$error) {
        this.$notify({
          type: "error",
          title: "Failed",
          text: "Please correct the form",
        });

        return false;
      }

      return true;
    },
    clearForm() {
      for (const key in this.post) {
        if (key == "types") {
          this.post.types = [];
          continue;
        }
        this.post[key] = "";
      }
    },
    handleCreatePostClick() {
      if (!this.verifyForm()) return;
      this.addPostAsync(this.post);
      this.clearForm();
      this.$v.$reset();
    },
    handleEditPostClick() {
      if (!this.verifyForm()) return;
      this.editPostByIdAsync(this.post);
      // this.clearForm();
      this.$v.$reset();
    },
  },
  validations: {
    post: {
      coverImg: {
        required,
      },
      title: {
        required,
      },
      content: {
        required,
      },
      introduction: {
        required,
      },
      types: {
        required,
      },
    },
  },
  async mounted() {
    const { id } = this.$route.params;
    if (id) {
      const post = await this.getPostByIdAsync(id);
      this.post = { ...post };
      this.post._id = id;
    }
  },
};
</script>

<style lang="scss" scoped>
.editor {
  margin: 0 auto;
  padding: 2rem 0;
  width: 80%;

  & textarea {
    border: 1px solid $primary-color;
    border-radius: 4px;
    outline: none;
    padding: 1rem;
    width: 100%;
    resize: none;
    min-height: 15rem;
    margin-bottom: 1rem;
    line-height: 1.5;
    font-size: 1.5rem;
  }
}

.editor__intro {
  margin-bottom: 2rem;
}

.editor__checkbox-group {
  margin-bottom: 1rem;
  display: flex;
  flex-wrap: wrap;
  min-height: 10rem;
  border-radius: 4px;
  border: 1px solid $primary-color;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;

  @include large_phone {
    &::after {
      content: "";
      flex: auto;
    }
  }
}

.editor__tool {
  .err-group {
    margin-top: 1rem;
  }
}

.editor__buttons {
  margin-top: 2rem;

  button:first-child {
    margin-right: 1rem;
  }
}
</style>