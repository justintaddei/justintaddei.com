<!-- Home -->
<template>
  <div>
    <section class="section-one">
      <div class="arcs">
        <div class="arc"></div>
        <div class="arc"></div>
        <div class="arc"></div>
        <div class="arc"></div>
        <div class="arc"></div>
        <div class="arc"></div>
        <div class="arc"></div>
        <div class="arc"></div>
      </div>
      <div class="tag-line">
        <div class="logo-container">
          <!-- <img src="/imgs/logo.svg" class="logo" /> -->
          <div class="logo">
            <svg
              class="logo-svg"
              viewBox="0 0 1703 1081"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
              stroke-linejoin="round"
              stroke-miterlimit="2"
            >
              <circle
                cx="3644.8"
                cy="1962.31"
                r="22.166"
                transform="matrix(7.66518 0 0 7.66634 -27767.317 -14133.19)"
              />
              <path
                d="M1356.075.476h346.7v346.7h-346.7zM794.584.474v736.428c0 91.69-36.64 179.546-101.717 244.097-65.078 64.474-153.304 100.275-244.903 99.509h-.076V.474h346.696zM901.82.474h346.695v1079.988H901.82z"
              />
            </svg>
          </div>

          <h1 class="page-title">Justin Taddei</h1>
        </div>
        <div>
          <p class="light">
            Freelance Web Development<br />
            &amp; Graphic Design
          </p>
          <Button href="/contact" class="primary">
            Get in touch
          </Button>
        </div>
      </div>
      <div class="grad"></div>

      <button class="scroll-btn" @click="scrollTo('#sectionTwo')">
        <i class="material-icons">arrow_downward</i>
      </button>
    </section>
    <section class="section-two">
      <span class="v-line" id="sectionTwo"></span>
      <div class="triangle"></div>
      <div class="circle"></div>
      <div class="square"></div>
      <h2>Stop Being Ordinary</h2>
      <p>
        A boring website is easily forgotten. So let me give you something your
        customers will remember.
      </p>
      <div class="cross"></div>

      <button class="scroll-btn" @click="scrollTo('#sectionThree')">
        <i class="material-icons">arrow_downward</i>
      </button>
    </section>
    <section class="section-three">
      <span class="v-line" id="sectionThree"></span>
      <h2>Don't Be Generic</h2>
      <p>
        It's impossible to stand out if you appear like all the rest... the same
        old WordPress template is not your friend.
      </p>
      <div class="generic-squares">
        <div class="square"></div>
        <div class="cross"></div>
        <div class="square"></div>
        <div class="square"></div>
      </div>

      <button class="scroll-btn" @click="scrollTo('#sectionFour')">
        <i class="material-icons">arrow_downward</i>
      </button>
    </section>
    <section class="section-four">
      <span class="v-line" id="sectionFour"></span>
      <h2>Start Being Original</h2>
      <div class="sec4p">
        <p>
          Creativity is your most powerful marketing tool. After all, I've held
          your attention this far, have I not?
        </p>
        <div class="buttons">
          <Button href="/portfolio" class="larger fixed-width">
            View portfolio
          </Button>

          <Button href="/contact" class="primary fixed-width">
            Get in touch
          </Button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import Button from "../components/inputs/Button.vue";
  import anime from "animejs";

  export default {
    components: {
      Button
    },
    head() {
      return {
        title: "Freelance Web Design | Offical site of Justin Taddei"
      };
    },

    created() {
      this.$store.commit("theme/setIsHeaderDark", false);
      this.$store.commit("theme/setShouldHeaderHaveTitle", false);
    },

    methods: {
      scrollTo(e) {
        window.scrollBy({
          top: document.querySelector(e).getBoundingClientRect().top,
          behavior: "smooth"
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/_color.scss";
  @import "@/assets/scss/ui-components/_shape.scss";
  .section-one {
    position: relative;
    background: #282c34;
    background: #fcfcfc;
    height: 100vh;
    min-height: 550px;
    // color: #212121;
    display: flex;
    align-items: center;
    overflow: hidden;

    &::after {
      @extend %shape;
      height: 45%;
      background: no-repeat url("/imgs/waves/wave-home-first.svg");
    }
    padding: 0 0 0 33%;

    .arcs {
      position: fixed;
      opacity: 0.7;
      left: 100vw;
      top: 50vh;
      background: green;
      animation: arc-rotate 8s linear infinite reverse, fade-in 2s ease;

      contain: layout;
      will-change: transform;

      .arc {
        border-radius: 50%;

        position: absolute;
        transform: translate(-50%, -50%);

        will-change: transform;
        border: 15px solid $home-red;
        border-bottom-color: transparent;
        border-left-color: transparent;
        $d: 50vw;
        width: $d;
        height: $d;

        &:nth-child(2) {
          border: 15px solid $home-green;
          border-bottom-color: transparent;
          border-left-color: transparent;
          border-right-color: transparent;
          $d: 75vw;
          width: $d;
          height: $d;
          transform: translate(-50%, -50%) rotate(25deg);
        }
        &:nth-child(3) {
          border: 15px solid $home-salmon;
          border-bottom-color: transparent;
          border-left-color: transparent;
          border-right-color: transparent;
          $d: 100vw;
          width: $d;
          height: $d;
          transform: translate(-50%, -50%) rotate(175deg);
        }
        &:nth-child(4) {
          border: 15px solid $home-yellow;
          border-bottom-color: transparent;
          border-left-color: transparent;
          border-right-color: transparent;
          $d: 125vw;
          width: $d;
          height: $d;
          transform: translate(-50%, -50%) rotate(280deg);
        }
        &:nth-child(5) {
          border: 15px solid $home-blue;
          border-bottom-color: transparent;
          border-left-color: transparent;
          border-right-color: transparent;
          $d: 110vw;
          width: $d;
          height: $d;
          transform: translate(-50%, -50%) rotate(-15deg);
        }
        &:nth-child(6) {
          border: 15px solid $home-orange;
          border-top-color: transparent;
          border-right-color: transparent;
          $d: 150vw;
          width: $d;
          height: $d;
          transform: translate(-50%, -50%) rotate(25deg);
        }
        &:nth-child(7) {
          border: 15px solid $home-purple;
          border-top-color: transparent;
          border-right-color: transparent;
          $d: 90vw;
          width: $d;
          height: $d;
          transform: translate(-50%, -50%) rotate(-50deg);
        }
        &:nth-child(8) {
          border: 15px solid $home-blue;
          border-bottom-color: transparent;
          border-left-color: transparent;
          border-right-color: transparent;
          $d: 20vw;
          width: $d;
          height: $d;
          transform: translate(-50%, -50%) rotate(230deg);
        }

        @keyframes arc-rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
        }
      }
    }

    .grad {
      position: absolute;
      background: linear-gradient(to bottom, #fff, rgba(255, 255, 255, 0) 190px);
      width: 100vw;
      height: 100vh;
      top: 0;
      left: 0;
      pointer-events: none;
    }

    .tag-line {
      transform: translate(-50%, 0);
      position: relative;
      // color: #fcfcfc;

      .logo-container {
        display: flex;
        align-items: center;
        color: #22252b;

        .logo {
          $size: 115px;
          width: $size;
          height: $size;
          // filter: drop-shadow(0 12px 8px rgba(0, 0, 0, 0.46));
          margin: 0 32px 16px 0;
          background: $home-blue;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 15px;
          z-index: 1;
          // box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
          //   0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
          .logo-svg {
            $size: 90px;
            width: $size;
            height: $size;
            color: #fcfcfc;
          }
        }

        h1 {
          margin: 0;
          // text-shadow: 0 8px 10px rgba(0, 0, 0, 0.14),
          //   0 3px 14px rgba(0, 0, 0, 0.12), 0 5px 5px rgba(0, 0, 0, 0.2);
        }
      }

      p {
        color: #ddd;
        color: #444;
        font-size: 42px;
        line-height: 1em;
        padding: 0;
        margin: 0;
        // A white shadow help make the text readable over the animation
        // text-shadow: 0 0 10px #fff, 0 0 8px #fff, 0 0 5px #fff;
        //text-shadow: 0 12px 8px rgba(0, 0, 0, 0.14), 0 6px 5px rgba(0, 0, 0, 0.12),
        //0 8px 4px rgba(0, 0, 0, 0.2);
      }
    }

    .scroll-btn {
      background: $home-green;
      color: #fff;
    }

    @media screen and (max-width: 1080px) {
      padding: 0;
      justify-content: center;
      .tag-line {
        transform: none;
      }
    }
    @media screen and (max-width: 780px) {
      min-height: 500px;

      .tag-line {
        .logo-container {
          flex-direction: column;
          align-items: center;
          h1 {
            font-size: 60px;
          }
          .logo {
            margin: 0 0 16px 0;
            $size: 125px;
            width: $size;
            height: $size;
            display: none;
          }
        }
        p {
          font-size: 30px;
          color: #22252b;
          text-shadow: 0 0 3px #fff;
        }
      }

      .scroll-btn {
        bottom: 8%;
      }
    }
    @media screen and (max-width: 550px) {
      .tag-line {
        p {
          font-size: 30px;
        }
      }
    }
    @media screen and (max-width: 490px) {
      min-height: 560px;
      .tag-line {
        .logo-container {
          h1 {
            font-size: 50px;
          }
        }
        p {
          font-size: 25px;
        }
      }

      .scroll-btn {
        top: calc(100% - 175px);
      }
    }
    @media screen and (max-width: 410px) {
      .tag-line {
        .logo-container {
          h1 {
            font-size: 45px;
          }
        }
        p {
          font-size: 24px;
        }
      }
    }
    @media screen and (max-width: 380px) {
      .tag-line {
        .logo-container {
          h1 {
            font-size: 38px;
          }
        }
        p {
          font-size: 20px;
        }
      }

      .scroll-btn {
        bottom: 6%;
      }
    }
  }

  .scroll-btn {
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
    border-radius: 50%;
    outline: none;
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

  .section-two {
    padding: 50px 25% 150px 25%;
    background: #22252b;
    color: #fcfcfc;
    position: relative;
    // overflow-x: hidden;
    text-align: center;

    &::after {
      @extend %shape;
      height: 10%;
      background: no-repeat url("/imgs/waves/wave-home-second.svg");
    }

    .circle {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: $home-yellow;
      pointer-events: none;
      left: 300px;
      top: -25px;
    }
    .square {
      width: 50px;
      height: 50px;
      background: $home-purple;
      pointer-events: none;
      left: -250px;
      top: -90px;
    }

    .cross {
      pointer-events: none;
      background: $home-blue;
      height: 50px;
      width: 10px;
      &:after {
        background: $home-blue;
        content: "";
        height: 10px;
        top: 20px;
        left: -20px;
        position: absolute;
        width: 50px;
      }

      left: 175px;
    }

    .triangle {
      pointer-events: none;
      width: 0;
      height: 0;
      border-left: 25px solid transparent;
      border-right: 25px solid transparent;
      border-bottom: 50px solid $home-red;
      left: -400px;
      top: 25px;
    }

    .triangle,
    .square,
    .circle,
    .cross {
      margin: 0 auto -50px auto;
      position: relative;
      animation: home-rotate 30s linear infinite;
    }

    .v-line {
      width: 1px;
      height: 200px;
      background: #fcfcfc;
      display: block;
      margin: 0 auto;
      position: relative;
      top: -75px;
      margin-bottom: -50px;

      /* @media screen and (max-width: 550px) {
                                                                                                                                                                                        height: 80px;
                                                                                                                                                                                      } */
      @media screen and (max-width: 550px) {
        height: 70px;
        top: -50px;
        margin-bottom: 0;
      }
    }

    h2 {
      margin: 0 0 50px 0;
    }

    p {
      background: url("/imgs/waves/home-section-one-bubble.svg") no-repeat;
      background-size: 100% 100%;

      b {
        color: #fcfcfc;
        // text-shadow: 0 3px 5px rgba(0, 0, 0, 0.4);
      }

      padding: 125px 100px;
    }

    .scroll-btn {
      background: $home-red;
      color: #fff;
      bottom: auto;
      left: 37.5px;
      position: relative;
      margin: auto;
    }
    @media screen and (max-width: 1460px) {
      padding: 50px 20% 150px 20%;
    }
    @media screen and (max-width: 1080px) {
      p {
        background: url("/imgs/waves/home-section-one-bubble.svg") no-repeat;
        background-size: 100% 100%;
        padding: 75px 65px;
      }
    }
    @media screen and (max-width: 915px) {
      .triangle {
        left: -300px;
        top: 25px;
      }
    }
    @media screen and (max-width: 780px) {
      padding: 50px 16% 150px 16%;
    }
    @media screen and (max-width: 700px) {
      .circle {
        left: 230px;
        top: -75px;
      }
      .square {
        left: -150px;
        top: -150px;
      }

      .cross {
        top: -10px;
        left: 175px;
      }

      .triangle {
        left: -220px;
        top: 75px;
      }
    }
    @media screen and (max-width: 550px) {
      padding: 50px 5% 150px 5%;
      .circle {
        left: 170px;
        top: -120px;
      }
      .square {
        left: -150px;
        top: -70px;
        width: 25px;
        height: 25px;
      }

      .cross {
        top: -10px;
        left: 165px;
      }

      .triangle {
        left: -200px;
        top: 20px;
      }
    }
    @media screen and (max-width: 410px) {
      .circle {
        left: 150px;
        top: -125px;
      }
      .square {
        left: -125px;
        top: -100px;
      }

      .cross {
        top: -10px;
        left: 140px;
      }

      .triangle {
        left: -170px;
        top: 20px;
      }

      p {
        padding: 50px 30px;
      }
    }
  }

  .section-three {
    padding: 50px 25% 150px 25%;
    background: #fcfcfc;
    color: #22252b;
    position: relative;
    // overflow-x: hidden;
    text-align: center;

    .square {
      width: 50px;
      height: 50px;
      background: #c9c9c9;
      pointer-events: none;
      border-radius: 5px;
      // animation: home-rotate 90s linear infinite reverse;
    }

    .triangle {
      pointer-events: none;
      width: 0;
      height: 0;
      border-left: 25px solid transparent;
      border-right: 25px solid transparent;
      border-bottom: 50px solid $home-green;
    }

    .cross {
      pointer-events: none;
      background: $home-green;
      height: 50px;
      width: 10px;
      animation: home-rotate 20s linear infinite;
      &:after {
        background: $home-green;
        content: "";
        height: 10px;
        top: 20px;
        left: -20px;
        position: absolute;
        width: 50px;
      }
    }

    .square,
    .triangle,
    .cross {
      margin: auto;
      position: relative;
    }

    .generic-squares {
      display: flex;
      height: 100px;
      justify-content: space-around;
      align-items: center;
    }

    .v-line {
      width: 1px;
      height: 200px;
      background: #22252b;
      display: block;
      margin: 0 auto;
      position: relative;
      top: -100px;
      margin-bottom: -50px;

      @media screen and (max-width: 550px) {
        height: 70px;
        top: -50px;
        margin-bottom: 0;
      }
    }

    h2 {
      margin: 0 0 50px 0;
    }

    p {
      background: #ececec;
      color: #282c34;

      padding: 75px 100px;
      border-radius: 10px;
    }

    .scroll-btn {
      background: $home-blue;
      color: #fff;
      bottom: auto;
      left: 37.5px;
      position: relative;
      margin: 50px auto 0 auto;
    }

    &::after {
      @extend %shape;
      height: 10%;
      background: no-repeat url("/imgs/waves/wave-home-third.svg");
    }

    @media screen and (max-width: 1210px) {
      padding: 50px 18% 150px 18%;
    }
    @media screen and (max-width: 915px) {
      padding: 50px 12% 150px 12%;
    }
    @media screen and (max-width: 780px) {
      p {
        padding: 50px 60px;
      }
    }
    @media screen and (max-width: 550px) {
      padding: 50px 5% 150px 5%;
      p {
        padding: 30px 40px;
      }
    }
  }

  .section-four {
    padding: 50px 25% 150px 25%;
    background: linear-gradient(to bottom, #22252b, rgba(34, 37, 43, 0) 20%);
    color: #fcfcfc;
    position: relative;
    // overflow-x: hidden;
    text-align: center;

    .v-line {
      width: 1px;
      height: 200px;
      background: #fff;
      display: block;
      margin: 0 auto;
      position: relative;
      top: -140px;
      margin-bottom: -50px;
      @media screen and (max-width: 550px) {
        height: 70px;
        top: -50px;
        margin-bottom: 0;
      }
    }

    h2 {
      margin: 0 0 50px 0;
    }

    .sec4p {
      // background: #fafafa;
      background: url("/imgs/waves/home-section-four-text-bg.svg") no-repeat;
      background-size: 100% 100%;
      color: #22252b;
      padding: 50px 100px;
      // border-radius: 71% 29% 73% 27% / 44% 44% 56% 56%;
      display: flex;
      flex-direction: column;
      .buttons {
        display: flex;
        justify-content: space-around;

        width: 100%;
        .button {
          margin: 0 15px;
        }
        @media screen and (max-width: 600px) {
          flex-direction: column-reverse;
          align-items: center;
          .button {
            margin: 15px 0;
          }
        }
      }
    }

    @media screen and (max-width: 1440px) {
      padding: 50px 20% 150px 20%;
    }
    @media screen and (max-width: 1080px) {
      padding: 50px 16% 150px 16%;

      .sec4p {
        padding: 75px 100px;
      }
    }
    @media screen and (max-width: 930px) {
      padding: 50px 14% 150px 14%;

      .sec4p {
        padding: 75px 80px;
      }
    }
    @media screen and (max-width: 840px) {
      padding: 50px 10% 150px 10%;

      .sec4p {
        padding: 65px 80px;
      }
    }
    @media screen and (max-width: 780px) {
      padding: 50px 5% 150px 5%;

      .sec4p {
        padding: 65px 80px;
        .fixed-width {
          width: 180px;
          flex-shrink: 0;
        }
      }
    }
    @media screen and (max-width: 550px) {
      padding: 50px 5% 70px 5%;

      .sec4p {
        padding: 65px 50px;
        .fixed-width {
          width: 180px;
          flex-shrink: 0;
        }
      }
    }
  }

  @keyframes home-rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
