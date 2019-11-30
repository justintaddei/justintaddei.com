<template>
  <div class="portfolio-details-page">
    <template v-if="error">
      <h1>Sorry, we couldn't find details on that domain</h1>
    </template>
    <template v-else>
      <div class="imgs">
        <div>
          <h4 class="fade-in">Desktop</h4>
          <img
            :src="entry.desktopImage"
            :alt="`Screenshot of ${entry.domain}${entry.topLevelDomain}`"
            class="desktop-image"
            ref="desktopImage"
          />
        </div>
        <div class="mobile-image-wrapper">
          <h4 class="fade-in">Mobile</h4>
          <img
            :src="entry.mobileImage"
            class="mobile-image"
            :alt="
              `Screenshot of ${entry.domain}${entry.topLevelDomain} on a mobile device`
            "
          />
        </div>
      </div>
      <div>
        <h1 class="fade-in">
          {{ entry.domain }}<span>{{ entry.topLevelDomain }}</span>
        </h1>
        <h3 class="fade-in">{{ entry.type.replace(/,/g, " / ") }}</h3>

        <a
          class="fade-in"
          target="_blank"
          :href="`http://${entry.domain}${entry.topLevelDomain}/`"
          >View site</a
        >
        <p class="fade-up">{{ entry.about }}</p>
      </div>
    </template>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "portfolio-details",
    head() {
      return {
        title: "Portfolio | Offical site of Justin Taddei"
      };
    },
    transition: (to, from) => {
      if (!from) return "page";

      return from.name === "portfolio" ? "none" : "page";
    },
    data() {
      return {
        entry: {},
        error: null
      };
    },
    async asyncData({ params }) {
      const { data } = await axios.get(`/api/portfolio/${params.portfolio_id}`);
      return {
        entry: data.data,
        error: data.error
      };
    },

    fetch({ store }) {
      store.commit("theme/setIsHeaderDark", true);
      store.commit("theme/setShouldHeaderHaveTitle", true);
    },

    mounted() {
      const position = this.$route.params.position;
      if (!position) return;

      const img = this.$refs.desktopImage;
      img.onload = () => {
        const rect = img.getBoundingClientRect();
        const scale = position.width / rect.width;
        const tX = position.left - rect.left;
        const tY = position.top - rect.top;

        img.style.transform = `translate(${tX}px, ${tY}px) scale(${scale})`;

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            img.classList.add("animate");
            img.style.transform = "";
          });
        });
      };
    }
  };
</script>

<style lang="scss" scoped>
  @function strip-unit($value) {
    @return $value / ($value * 0 + 1);
  }

  @mixin fluid-type($min-vw, $max-vw, $min-font-size, $max-font-size) {
    $u1: unit($min-vw);
    $u2: unit($max-vw);
    $u3: unit($min-font-size);
    $u4: unit($max-font-size);

    @if $u1 == $u2 and $u1 == $u3 and $u1 == $u4 {
      & {
        font-size: $min-font-size;
        @media screen and (min-width: $min-vw) {
          font-size: calc(
            #{$min-font-size} + #{strip-unit($max-font-size - $min-font-size)} *
              ((100vw - #{$min-vw}) / #{strip-unit($max-vw - $min-vw)})
          );
        }
        @media screen and (min-width: $max-vw) {
          font-size: $max-font-size;
        }
      }
    }
  }

  .fade-in {
    opacity: 0;
    animation: fade-in 0.3s 0.5s both;
  }
  .fade-up {
    opacity: 0;
    transform: translate(0, 25px);
    animation: fade-up 0.4s 0.7s both;
  }

  .portfolio-details-page {
    padding: 100px 15% 20px 15%;
    color: #fafafa;
    a {
      font-size: 25px;
      color: inherit;
      border-bottom: 1px solid currentColor;
      &:hover {
        opacity: 0.5;
      }
    }

    h1.fade-in {
      animation-delay: 0.3s;
      word-break: break-all;
      line-height: 1.5em;

      @include fluid-type(320px, 1080px, 16px, 40px);

      span {
        font-size: 0.75em;
      }
    }
    h3.fade-in {
      animation-delay: 0.3s;
    }
  }

  .imgs {
    display: flex;
    justify-content: space-between;
  }
  .desktop-image {
    transform-origin: top left;
    height: 30vw;
    border-radius: 5px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    &.animate {
      transition: transform 0.25s ease-out;
    }
  }
  .mobile-image-wrapper {
    margin-left: 10px;
  }
  .mobile-image {
    height: 30vw;
    border-radius: 5px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    animation: fade-left 0.3s 0.4s both;

    transform: translate(100px, 0);
    opacity: 0;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fade-left {
    from {
      transform: translate(100px, 0);
      opacity: 0;
    }
    to {
      transform: none;
      opacity: 1;
    }
  }
  @keyframes fade-up {
    from {
      transform: translate(0, 25px);
      opacity: 0;
    }
    to {
      transform: none;
      opacity: 1;
    }
  }
</style>
