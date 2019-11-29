<template>
  <div>
    <div class="section-one">
      <div class="circle"></div>
      <div class="triangle"></div>
      <div class="cross"></div>

      <div>
        <h1 class="page-title">Get in touch</h1>
        <p>
          Let's create something amazing
        </p>
      </div>

      <button
        class="scroll-btn"
        id="sectionTwo"
        @click="scrollTo('#sectionTwo')"
      >
        <i class="material-icons">arrow_downward</i>
      </button>
    </div>
    <div class="section-two">
      <ul class="contact-details">
        <li>
          <i class="material-icons">phone</i>
          <a href="tel:+19188846609">(918) 884-6609</a>
        </li>
        <li>
          <i class="material-icons">email</i>
          <a class="contact-link" href="mailto:justin@justintaddei.com">
            justin@justintaddei.com
          </a>
        </li>
      </ul>
      <p
        class="error-msg"
        :class="{
          sending: errorMsg === 'Sending...',
          sent: errorMsg === 'Message sent'
        }"
        v-show="errorMsg"
      >
        {{ errorMsg }}
      </p>
      <form
        v-show="!/(Sending\.\.\.|Message\ssent)/.test(errorMsg)"
        ref="form"
        @submit.prevent="submit($event)"
      >
        <label for="name">
          Name
        </label>
        <input
          id="name"
          v-model="name"
          ref="nameInput"
          aria-label="Your name"
          placeholder="e.g. John Doe"
          type="text"
          name="name"
        />
        <label for="email">
          Email
        </label>
        <input
          id="email"
          v-model="email"
          ref="emailInput"
          placeholder="johndoe@example.com"
          type="email"
          name="email"
        />
        <label for="phone">
          Phone
        </label>
        <input
          id="phone"
          ref="phoneInput"
          v-model="phoneNumber"
          placeholder="(___) ___-____"
          type="tel"
          name="phone"
        />
        <label for="message">
          Message
        </label>
        <textarea
          id="message"
          v-model="message"
          ref="messageInput"
          placeholder="Hello . . ."
          name="message"
          cols="30"
          rows="10"
        ></textarea>

        <vue-recaptcha
          ref="recaptcha"
          @verify="recaptchaToken = $event"
          sitekey="6Lc8IsAUAAAAAGY7oR1jYvs3AXCCipIQcZu_6Mxs"
          :loadRecaptchaScript="true"
        />

        <button class="button primary">
          <span class="text">Send <i class="material-icons">send</i></span>
          <svg
            class="wobble-line"
            style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421"
            version="1.1"
            xml:space="preserve"
            viewBox="0 0 390 50"
          >
            <path
              d="M0,49.346l130,0c13.75,0 28.74,-38.794 46.168,-19.432c16.501,18.331 67.435,19.432 83.832,19.432l130,0"
              style="fill:none;stroke:currentColor;stroke-width:1.5px"
            />
          </svg>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
  import VueRecaptcha from "vue-recaptcha";

  export default {
    name: "contact",
    components: { VueRecaptcha },
    head() {
      return {
        title: "Contact | Offical site of Justin Taddei"
      };
    },

    data() {
      return {
        name: "",
        phone: "",
        email: "",
        message: "",
        errorMsg: "",
        recaptchaToken: ""
      };
    },

    created() {
      this.$store.commit("theme/setIsHeaderDark", false);
      this.$store.commit("theme/setShouldHeaderHaveTitle", true);
    },

    computed: {
      phoneNumber: {
        get() {
          let number = this.phone;
          const regexp = /^\D*(\d{3})\D*(\d{3})\D*(\d{4})\D*$/i;
          if (regexp.test(number)) {
            number = number.replace(regexp, "($1) $2-$3");
          }
          return number;
        },

        set(value) {
          let number = value;
          const regexp = /^\D*(\d{3})\D*(\d{3})\D*(\d{4})\D*$/i;
          if (regexp.test(number)) {
            number = number.replace(regexp, "($1) $2-$3");
            this.$refs.phoneInput.setCustomValidity("");
          } else if (value.length) {
            this.$refs.phoneInput.setCustomValidity("Invalid phone number");
          } else {
            this.$refs.phoneInput.setCustomValidity("");
          }

          this.phone = value;
        }
      },

      error: {
        get() {
          return this.errorMsg;
        },
        set(err) {
          this.errorMsg = err;

          if (err) this.scrollTo("#sectionTwo");
        }
      }
    },

    methods: {
      scrollTo(e) {
        window.scrollBy({
          top: document.querySelector(e).getBoundingClientRect().top,
          behavior: "smooth"
        });
      },

      submit(evt) {
        const formData = {};

        let valid = true;

        if (!this.name) {
          valid = false;
          this.error = "Please enter you name";
          return;
        } else {
          this.$refs.nameInput.setCustomValidity("");
          formData.name = this.name;
        }

        if (!this.email || !this.$refs.emailInput.checkValidity()) {
          valid = false;
          this.error = "Please enter your email";
          return;
        } else {
          this.$refs.emailInput.setCustomValidity("");
          formData.email = this.email;
        }

        if (this.phoneNumber !== "" && !this.$refs.phoneInput.checkValidity()) {
          valid = false;
          this.$refs.phoneInput.setCustomValidity(
            "Please enter your phone number"
          );
          this.error = "Please enter your phone number";
          return;
        } else {
          this.$refs.phoneInput.setCustomValidity("");
          formData.phone = this.phone;
        }

        if (!this.message) {
          valid = false;
          this.error = "Please enter a message";
          return;
        } else {
          formData.message = this.message;
        }

        if (!this.recaptchaToken) {
          valid = false;
          this.error = 'Please check the "I\'m not a robot" checkbox';
          return;
        } else {
          formData.recaptchaToken = this.recaptchaToken;
        }

        if (valid) {
          this.error = "Sending...";
          this.$axios
            .post("/api/contact-form", formData)
            .then(res => {
              console.log("res :", res);
              this.error = res.data;
            })
            .catch(err => {
              console.error("Error sending message", err);
              this.error = err;
              this.$refs.recaptcha.reset();
            });
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/ui-components/_shape.scss";
  @import "@/assets/scss/_color.scss";
  .section-one {
    background: #22252b;
    background: $home-yellow;
    background: #fcfcfc;
    min-height: 500px;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    color: #22252b;
    width: 100%;

    // padding: 0 25%;

    &::after {
      @extend %shape;
      height: 25%;
      right: 0;
      left: auto;
      background: no-repeat url("/imgs/waves/wave-contact-first.svg");
    }

    h1 {
      margin: 0;
      position: relative;
      @media screen and (max-width: 720px) {
        font-size: 55px;
      }
      @media screen and (max-width: 600px) {
        font-size: 45px;
      }
      @media screen and (max-width: 380px) {
        font-size: 40px;
      }
    }
    p {
      margin: 0;
      position: relative;
      color: #292c34;

      font-size: 42px;

      @media screen and (max-width: 720px) {
        font-size: 36px;
      }

      @media screen and (max-width: 600px) {
        font-size: 26px;
      }
      @media screen and (max-width: 400px) {
        font-size: 24px;
      }
      @media screen and (max-width: 380px) {
        font-size: 20px;
      }
    }

    .circle {
      width: 1000px;
      height: 1000px;
      border-radius: 50%;
      background: $home-yellow;
      // background: #007a51;
      pointer-events: none;
      position: absolute;
      transform: translate(50%, -50%);
      top: 0;
      right: 0;
      animation: contact-circle 10s linear infinite alternate;

      @media screen and (max-width: 600px) {
        width: 750px;
        height: 750px;
      }
      @media screen and (max-width: 490px) {
        width: 500px;
        height: 500px;
      }

      @keyframes contact-circle {
        from {
          transform: translate(50%, -50%);
        }
        50% {
          transform: translate(48%, -53%);
        }
        to {
          transform: translate(47%, -50%);
        }
      }
    }

    .cross {
      pointer-events: none;
      position: absolute;
      $h: 500px;
      $w: 100px;
      $color: $home-green;
      transform: rotate(-30deg);
      left: 50px;
      bottom: -100px;
      background: $color;
      height: $h;
      width: $w;

      animation: contact-cross 300s linear infinite;

      @keyframes contact-cross {
        from {
          transform: rotate(-30deg) rotateZ(0deg);
        }
        to {
          transform: rotate(-30deg) rotateZ(360deg);
        }
      }

      &:after {
        // background: #00447a;
        background: $color;
        content: "";
        height: $h;
        position: absolute;
        width: $w;
        top: 0;
        left: 0;
        transform: rotate(90deg);
      }

      @media screen and (max-width: 600px) {
        $h: 250px;
        $w: 50px;
        left: 50px;
        bottom: 0px;

        height: $h;
        width: $w;

        &:after {
          height: $h;
          width: $w;
        }
      }
    }

    .triangle {
      pointer-events: none;
      width: 0;
      height: 0;
      border-left: 375px solid transparent;
      border-right: 375px solid transparent;
      border-bottom: 500px solid $home-blue;
      @media screen and (max-width: 600px) {
        border-left: 375px solid transparent;
        border-right: 375px solid transparent;
        border-bottom: 400px solid $home-blue;
      }
      @media screen and (max-width: 490px) {
        border-left: 275px solid transparent;
        border-right: 275px solid transparent;
        border-bottom: 300px solid $home-blue;
      }
      position: absolute;
      top: 0;
      left: 0;
      transform: translate(-40%, -50%) rotate(-45deg);
    }
  }

  .section-two {
    width: 100%;
    min-height: 100vw;
    background: #22252b;
    position: relative;
    padding: 75px 25%;
    @media screen and (max-width: 1080px) {
      padding: 75px 15%;
    }
    @media screen and (max-width: 720px) {
      padding: 75px 8%;
    }
    color: #fcfcfc;
  }

  .scroll-btn {
    background: $home-red;
    color: #fff;
    position: absolute;
    left: 50%;
    bottom: 12.5%;
    transform: translate(-50%, 0);
    z-index: 5;
    $size: 75px;
    width: $size;
    height: $size;
    display: flex;
    justify-content: center;
    cursor: pointer;
    align-items: center;
    outline: none;
    border-radius: 50%;
    border: none;
    box-shadow: 0 12px 10px 2px rgba(0, 0, 0, 0.14),
      0 6px 10px 5px rgba(0, 0, 0, 0.12), 0 8px 8px -4px rgba(0, 0, 0, 0.2);
    i.material-icons {
      font-size: 35px;
    }

    transition: transform 0.1s ease;

    &:hover,
    &:focus {
      transform: translate(-50%, 0) scale(1.1);
    }

    &:focus {
      transform: translate(-50%, 0) scale(1.2);
    }
  }

  .contact-details {
    margin: 0 auto 50px auto;
    list-style: none;
    font-size: 30px;
    @media screen and (max-width: 600px) {
      font-size: 25px;
    }
    @media screen and (max-width: 515px) {
      font-size: 20px;
    }
    @media screen and (max-width: 430px) {
      font-size: 18px;
    }
    @media screen and (max-width: 380px) {
      font-size: 16px;
    }
    border: 2px solid $home-green;
    border-radius: 15px;
    padding: 0;

    li {
      margin: 0;
      padding: 25px 35px;
      @media screen and (max-width: 430px) {
        padding: 25px 15px;
      }
      display: flex;
      align-items: center;

      .material-icons {
        font-size: 48px;
        @media screen and (max-width: 600px) {
          font-size: 42px;
        }
        @media screen and (max-width: 515px) {
          font-size: 35px;
        }
        @media screen and (max-width: 430px) {
          font-size: 32px;
        }
        @media screen and (max-width: 380px) {
          font-size: 25px;
        }
        margin-right: 16px;
      }

      &:nth-child(1) {
        border-bottom: 2px solid $home-green;
      }

      a {
        color: inherit;
        border-bottom: 1px solid currentColor;
        padding: 5px;
        &:hover {
          opacity: 0.7;
        }
        &:active {
          color: $home-green;
        }
      }
    }
  }

  .error-msg {
    // margin: 0 auto 50px auto;
    font-size: 30px;
    border-radius: 15px;
    padding: 25px 35px;
    border: 2px solid $home-red;
    color: $home-red;
    background: fade-out($home-red, 0.95);
    &.sending {
      border: 2px solid $home-blue;
      color: $home-blue;
      background: fade-out($home-blue, 0.95);
    }
    &.sent {
      border: 2px solid $home-green;
      color: $home-green;
      background: fade-out($home-green, 0.95);
    }
  }
  form {
    display: flex;
    flex-direction: column;
    font-size: 30px;

    @media screen and (max-width: 430px) {
      font-size: 25px;
    }

    input,
    textarea {
      margin: 15px auto;
      width: 100%;
      @media screen and (max-width: 430px) {
        font-size: 20px;
      }
    }
  }

  .button {
    position: relative;
    height: 45px;
    overflow: hidden;
    margin: 0 5px;
    font-size: 20px;
    cursor: pointer;
    border: none;

    .material-icons {
      margin: 0 0 0 15px;
    }
  }

  .text {
    text-decoration: none;
    position: relative;
    color: inherit;
    height: 100%;
    padding: 0 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.1);
      opacity: 0;
      transition: opacity 0.2s;
    }
    &:hover::before,
    .button:focus &::before {
      opacity: 1;
    }
  }

  .wobble-line {
    position: absolute;
    bottom: 0;
    z-index: 1;
    left: 0;
    width: 400%;
    pointer-events: none;
  }
  .text:hover ~ .wobble-line {
    transition: transform 1.25s ease;
    transform: translate(-75%, 0);
  }

  .primary {
    width: 200px;
    height: 60px;
    font-size: 20px;
    margin: 10px 0;
    color: #fff;
    background: #22252b;
    background: $home-green;
    // border-radius: 10px;
    box-shadow: 0 12px 10px 2px rgba(0, 0, 0, 0.14),
      0 6px 10px 5px rgba(0, 0, 0, 0.12), 0 8px 8px -4px rgba(0, 0, 0, 0.2);
  }
</style>
