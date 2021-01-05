<template>
  <div class="about">
    <div class="about__introduction">
      <h2>Introduction</h2>
      <div class="about__introduction-body">
        <div class="about__introduction-image">
          <img
            src="https://images.unsplash.com/photo-1548247416-ec66f4900b2e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=363&q=80"
            alt="intro img"
          />
        </div>
        <div class="about__introduction-content">
          <p>{{ introduction }}</p>
        </div>
      </div>
    </div>
    <div class="about__interest">
      <h2>Interests</h2>
      <div class="about__interest-body">
        <div class="about__interest-item">
          <font-awesome-icon :icon="['fas', 'laptop-code']" />
        </div>
        <div class="about__interest-item">
          <font-awesome-icon :icon="['fas', 'microchip']" />
        </div>
        <div class="about__interest-item">
          <font-awesome-icon :icon="['fas', 'music']" />
        </div>
        <div class="about__interest-item">
          <font-awesome-icon :icon="['fas', 'gamepad']" />
        </div>
      </div>
    </div>
    <div class="about__competence">
      <h2>Competences</h2>
      <div class="about__competence-body">
        <div class="about__competence-item">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/800px-HTML5_logo_and_wordmark.svg.png"
            alt="html logo"
          />
        </div>
        <div class="about__competence-item">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1200px-CSS3_logo_and_wordmark.svg.png"
            alt="css logo"
          />
        </div>
        <div class="about__competence-item">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/d/d4/Javascript-shield.svg"
            alt="javascript logo"
          />
        </div>
      </div>
    </div>
    <div class="about__framework">
      <h2>Frameworks</h2>
      <div class="about__framework-body">
        <div class="about__framework-item">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Vue.png"
            alt="vue logo"
          />
        </div>
        <div class="about__framework-item">
          <img
            src="https://images.viblo.asia/696c5301-3440-45a6-a9e9-0972725f3c5f.png"
            alt="nuxt logo"
          />
        </div>
        <div class="about__framework-item">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1024px-Node.js_logo.svg.png"
            alt="vue logo"
          />
        </div>
      </div>
    </div>
    <div class="about__database">
      <h2>Databases</h2>
      <div class="about__database-body">
        <div class="about__database-item">
          <img
            src="https://upload.wikimedia.org/wikipedia/de/8/8c/Microsoft_SQL_Server_Logo.svg"
            alt="ms sql logo"
          />
        </div>
        <div class="about__database-item">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/4/45/MongoDB-Logo.svg/1920px-MongoDB-Logo.svg.png"
            alt="mongodb logo"
          />
        </div>
        <div class="about__database-item invisible"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: `About ${this.name}`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.introduction,
        },
      ],
    };
  },
  data() {
    return {
      name: "Vo Anh Hao",
      introduction:
        "I'm a senior student at HUFI. I have a passionate on developing softwares to meet user's needs. My goal is to become a full-stack developer. I write this blog to share my knowledges and my interests to other people, hope it will be helpful.",
    };
  },
};
</script>

<style lang="scss" scoped>
.about {
  width: 80%;
  margin: 0 auto;
  padding-top: 2rem;
  & div {
    margin-bottom: 2rem;

    h2 {
      margin-bottom: 1rem;
    }
  }

  @include medium_phone {
    width: 90%;
  }
}

.about__introduction {
  &-image {
    width: 25%;
    height: 30rem;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);

    img {
      width: 100%;
      height: 100%;
      object-fit: fill;
    }
  }

  &-content {
    width: 70%;
    font-size: 2rem;
    line-height: 1.4;
  }

  &-body {
    display: flex;
    justify-content: space-between;
  }

  @include large_phone {
    &-body {
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    &-image {
      margin-bottom: 2rem;
      width: 20rem;
      height: 20rem;
      border-radius: 50%;
    }

    &-content {
      width: 90%;
    }
  }
}

.about__interest,
.about__competence,
.about__framework,
.about__database {
  &-body {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  &-item {
    width: 20%;
    height: 15rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    border-radius: 5px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
    svg {
      font-size: 5rem;
    }
  }

  @include large_phone {
    &-item {
      width: 45%;
    }
  }

  @include small_phone {
    &-item {
      width: 100%;
    }
  }
}

.about__competence,
.about__framework,
.about__database {
  &-item {
    border: none;
    padding: 1.5rem;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}

.about__database {
  @include large_phone {
    &-item:last-child {
      display: none;
    }
  }
}
</style>