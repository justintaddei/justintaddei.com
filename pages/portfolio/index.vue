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
      <div>
        <h1 class="page-title">Portfolio</h1>
        <p>
          A collection of my recent work
        </p>
      </div>
      <button class="scroll-btn" @click="scrollTo('#sectionTwo')">
        <i class="material-icons">arrow_downward</i>
      </button>
    </div>
    <div id="sectionTwo" class="section-two">
      <p v-if="api_error">
        Sorry, we're having trouble accessing the server. Please try again.
      </p>
      <div v-else class="portfolio-wrapper">
        <div
          class="portfolio-entry"
          v-for="entry of portfolio"
          :key="entry.domain"
        >
          <img
            class="preview"
            :ref="entry.domain"
            :src="entry.desktopImage"
            :alt="`'Screenshot of ${entry.domain}${entry.topLevelDomain}`"
          />
          <div class="details">
            <h2 class="domain">
              {{ entry.domain }}<span>{{ entry.topLevelDomain }}</span>
            </h2>
            <div>
              <p>{{ entry.type.replace(/,/g, " / ") }}</p>
              <div class="buttons">
                <span @click="goTo(entry.domain)"
                  ><Button class="primary" fake>View details </Button></span
                >
                <Button
                  :href="`http://${entry.domain}${entry.topLevelDomain}/`"
                  external
                  >Visit site</Button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import anime from "animejs";
  import axios from "axios";
  import Button from "@/components/inputs/Button.vue";

  export default {
    name: "portfolio",
    components: { Button },
    head() {
      return {
        title: "Portfolio | Offical site of Justin Taddei"
      };
    },

    data() {
      return {
        portfolio: [],
        api_error: null
      };
    },

    async asyncData(context) {
      const { data, error } = await axios.get("/api/portfolio/all");
      return {
        portfolio: data.portfolio,
        api_error: error
      };
    },

    fetch({ store }) {
      store.commit("theme/setIsHeaderDark", true);
      store.commit("theme/setShouldHeaderHaveTitle", true);
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
      scrollTo(e) {
        window.scrollBy({
          top: document.querySelector(e).getBoundingClientRect().top,
          behavior: "smooth"
        });
      },
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
      },

      goTo(domain) {
        const img = this.$refs[domain][0];

        const { top, left, width } = img.getBoundingClientRect();
        this.$router.push({
          name: "portfolio-portfolio_id",
          params: {
            portfolio_id: domain,
            position: {
              top,
              left,
              width
            }
          }
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
    align-items: center;
    position: relative;
    color: #fafafa;

    &::after {
      @extend %shape;
      height: 25%;
      right: 0;
      left: auto;
      background: no-repeat url("/imgs/waves/wave-portfolio-first.svg");
    }

    width: 100%;
    h1 {
      margin: 0;
      position: relative;
    }
    p {
      margin: 0;
      position: relative;
      color: #fafafa;

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
        pointer-events: none;
        position: fixed;
        @media screen and (max-width: 550px) {
          width: 25px;
          height: 25px;
        }
      }
      .square {
        width: 50px;
        height: 50px;
        background: $home-green;
        pointer-events: none;
        position: fixed;
        @media screen and (max-width: 550px) {
          width: 25px;
          height: 25px;
        }
      }

      .cross {
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

        @media screen and (max-width: 550px) {
          height: 25px;
          width: 5px;
          &:after {
            // background: #00447a;
            top: 10px;
            left: -10px;
            width: 25px;
            height: 5px;
          }
        }
      }

      .triangle {
        pointer-events: none;
        position: fixed;
        width: 0;
        height: 0;
        border-left: 25px solid transparent;
        border-right: 25px solid transparent;
        // border-bottom: 50px solid #7a0039;
        border-bottom: 50px solid $home-red;
        @media screen and (max-width: 550px) {
          border-bottom-width: 25px;
          border-left-width: 12.5px;
          border-right-width: 12.5px;
        }
      }
    }
  }

  .scroll-btn {
    background: $home-yellow;
    color: #212121;
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

  .section-two {
    width: 100%;
    background: #22252b;
    color: #fafafa;
    position: relative;
    padding: 75px 0;

    .portfolio-wrapper {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
    }

    .portfolio-entry {
      width: 500px;
      @media screen and (max-width: 550px) {
        width: 90%;
      }
      position: relative;
      background: #292c34;
      padding: 30px 20px;
      border-radius: 30px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
      margin: 32px 10px;
      text-align: center;

      img {
        position: relative;
        width: calc(100% - 20px);
        // border-radius: 20px;
        margin: 0 10px;
      }

      .details {
        max-width: 100%;
        position: relative;
        h2 {
          font-size: 35px;
          @media screen and (max-width: 550px) {
            font-size: 25px;
          }
          overflow: hidden;
          line-height: 1.6em;
          text-overflow: ellipsis;
          width: 100%;
          position: relative;

          span {
            font-size: 0.75em;
          }
        }

        .buttons {
          display: flex;
          justify-content: space-evenly;
          @media screen and (max-width: 550px) {
            flex-direction: column;
            align-items: center;
            .button {
              margin: 10px 0;
            }
          }
        }

        .button {
          width: 200px;
          height: 60px;
          margin: 0;
        }
      }
    }
  }
</style>
