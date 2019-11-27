<template>
  <div>
    <div class="section-one">
      <div id="portfolioAnimation">
        <div class="js-anime-hero-target circle"></div>
        <div class="js-anime-hero-target circle"></div>
        <div class="js-anime-hero-target circle"></div>
        <div class="js-anime-hero-target square"></div>
        <div class="js-anime-hero-target square"></div>
        <div class="js-anime-hero-target square"></div>
        <div class="js-anime-hero-target triangle"></div>
        <div class="js-anime-hero-target triangle"></div>
        <div class="js-anime-hero-target triangle"></div>
        <div class="js-anime-hero-target cross"></div>
        <div class="js-anime-hero-target cross"></div>
        <div class="js-anime-hero-target cross"></div>
      </div>
      <h1 class="page-title">Portfolio</h1>
      <p>
        A collection of my recent work
      </p>
    </div>
    <div class="section-two"></div>
  </div>
</template>

<script>
  import anime from "animejs";
  export default {
    head() {
      return {
        title: "Portfolio | Offical site of Justin Taddei"
      };
    },

    created() {
      this.$store.commit("theme/setIsHeaderDark", true);
      this.$store.commit("theme/setShouldHeaderHaveTitle", true);
    },

    mounted() {
      this.animation = anime({
        targets: document.querySelectorAll(".js-anime-hero-target"),
        translateX() {
          return `${anime.random(
            window.innerWidth * 0.1,
            window.innerWidth * 0.9
          )}px`;
        },
        translateY() {
          return `${anime.random(
            window.innerHeight * 0.1,
            window.innerHeight * 0.75
          )}px`;
        },
        rotate() {
          return `${anime.random(0, 5) + Math.random()}turn`;
        },
        duration: 0,
        complete: () => this.startAnimation()
      });
    },

    beforeDestroy() {
      if (this.animation) this.animation.pause();
    },

    methods: {
      startAnimation() {
        this.animation = anime({
          targets: document.querySelectorAll(".js-anime-hero-target"),
          translateX() {
            return `${anime.random(
              window.innerWidth * 0.1,
              window.innerWidth * 0.9
            )}px`;
          },
          translateY() {
            return `${anime.random(
              window.innerHeight * 0.1,
              window.innerHeight * 0.75
            )}px`;
          },
          rotate() {
            return `${anime.random(0, 5) + Math.random()}turn`;
          },
          duration: 7000,
          complete: this.startAnimation.bind(this)
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/ui-components/_shape.scss";
  @import "@/assets/scss/_color.scss";
  .section-one {
    background: #22252b;
    background: #292c34;
    background: #282c34;
    min-height: 500px;
    height: 100vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    position: relative;
    color: #fcfcfc;

    padding: 0 25%;

    &::after {
      @extend %shape;
      height: 25%;
      background: no-repeat url("/imgs/waves/wave-portfolio-first.svg");
    }

    width: 100%;
    h1 {
      margin: 0;
      position: relative;
      // text-shadow: 0 12px 8px rgba(0, 0, 0, 0.14), 0 6px 5px rgba(0, 0, 0, 0.12),
      //   0 8px 4px rgba(0, 0, 0, 0.2);
    }
    p {
      margin: 0;
      position: relative;
      color: #ddd;

      font-size: 42px;
    }

    #portfolioAnimation {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.8;
      .circle {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: $home-yellow;
        // background: #007a51;
        transform: translate(-100px, 0);
        pointer-events: none;
        position: fixed;
      }
      .square {
        width: 50px;
        height: 50px;
        background: $home-green;
        transform: translate(-100px, 0);
        pointer-events: none;
        position: fixed;
      }

      .cross {
        transform: translate(-100px, 0);
        pointer-events: none;
        position: fixed;
        // background: #00447a;
        background: $home-blue;
        height: 50px;
        width: 10px;
        &:after {
          // background: #00447a;
          background: $home-blue;
          content: "";
          height: 10px;
          top: 20px;
          left: -20px;
          position: absolute;
          width: 50px;
        }
      }

      .triangle {
        transform: translate(-100px, 0);
        pointer-events: none;
        position: fixed;
        width: 0;
        height: 0;
        border-left: 25px solid transparent;
        border-right: 25px solid transparent;
        // border-bottom: 50px solid #7a0039;
        border-bottom: 50px solid $home-red;
      }
    }
  }

  .section-two {
    width: 100%;
    height: 100vw;
    background: #22252b;
    position: relative;
  }
</style>
