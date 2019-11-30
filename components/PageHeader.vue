<template>
  <header :class="{ dark: isDark, filled: filled }">
    <div class="logo">
      <nuxt-link to="/">
        <svg
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
      </nuxt-link>

      <h2
        :style="{
          opacity: shouldShowTitle ? 1 : 0
        }"
      >
        Justin Taddei
      </h2>
    </div>
    <nav>
      <div @click="navOpen = false" :class="{ navOpen }" class="overlay"></div>
      <ul @click="navOpen = false" :class="{ navOpen }">
        <li>
          <Button class="menu" href="/">Home</Button>
        </li>
        <li>
          <Button class="menu" href="/portfolio">Portfolio</Button>
        </li>
        <li>
          <Button class="menu" href="/contact">Contact</Button>
        </li>
      </ul>
      <VueHamburger :class="{ navOpen }" v-model="navOpen" />
    </nav>
  </header>
</template>

<script>
  import Button from "./inputs/Button";
  import VueHamburger from "./nav/vue-hamburger";

  export default {
    name: "PageHeader",
    components: {
      Button,
      VueHamburger
    },
    computed: {
      isDark() {
        return this.$store.state.theme.isHeaderDark;
      },
      shouldShowTitle() {
        return this.$store.state.theme.shouldHeaderHaveTitle || this.filled;
      }
    },
    data: () => ({
      filled: false,
      navOpen: false
    }),

    mounted() {
      window.addEventListener("scroll", this.onScroll);
    },
    beforeDestroy() {
      window.removeEventListener("scroll", this.onScroll);
    },

    methods: {
      onScroll() {
        this.filled = window.scrollY > 20;
      }
    }
  };
</script>

<style lang="scss" scoped>
  header {
    top: 0;
    position: fixed;
    z-index: 100;
    left: 0;
    width: 100%;
    height: 75px;
    color: #212121;

    --vue-hamburger-color: #212121;
    &.dark {
      color: #fff;

      --vue-hamburger-color: #fafafa;
    }

    transition: all 0.2s ease, box-shadow 0.15s;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &.filled {
      box-shadow: 0 12px 10px 2px rgba(0, 0, 0, 0.14),
        0 6px 10px 5px rgba(0, 0, 0, 0.12), 0 8px 8px -4px rgba(0, 0, 0, 0.2);

      background: #fff;
      color: #222;
      &.dark {
        color: #fff;
        background: #222;
      }
    }
  }
  .logo {
    display: flex;
    align-items: center;

    h2 {
      transition: opacity 0.2s ease;
      font-size: 25px;
    }
  }
  a {
    color: inherit;
  }
  svg {
    width: 65px;
    height: 65px;
    position: relative;
    margin-left: 10px;
  }

  h2 {
    display: inline;
    margin: 0;
    padding: 0;
    margin-left: 20px;
    position: relative;
    top: 5px;

    @media screen and (max-width: 356px) {
      display: none;
    }
  }

  nav {
    height: 100%;
    position: relative;
    ul {
      position: relative;
      width: 100%;
      height: 100%;
      list-style: none;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      padding: 0 50px 15px 0;
      margin: 0;

      .button {
        font-size: 16px;
      }
    }
    .vue-hamburger {
      visibility: hidden;
    }
    .overlay {
      display: none;
    }
    @media screen and (max-width: 720px) {
      .overlay {
        content: "";
        position: fixed;
        display: block;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        // backdrop-filter: blur(20px) saturate(180%);
        z-index: -1;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.2s linear;

        &.navOpen {
          opacity: 1;
          pointer-events: all;
        }
      }
      ul {
        position: fixed;
        width: 90%;
        max-width: 300px;
        top: 0;
        bottom: 0;
        right: 0;
        background: #fafafa;

        &::before {
          content: "";
          display: block;
          position: absolute;
          // This stops a weird 1px line rendering glitch from showing up.
          top: 0px;
          left: 0;
          width: 50px;
          transform: translateX(-100%);
          height: 100%;
          background-size: 100% 100% !important;
          background-position: bottom !important;
          pointer-events: none;
          background-image: url("~static/imgs/waves/nav-bg.svg");
        }

        color: #212121;
        display: block;
        padding: 75px 0 0 0;
        transform: translate(120%, 0);
        transition: transform 0.2s ease-in-out;

        &.navOpen {
          transform: none;
        }

        .button {
          height: 90px;
          width: 100%;
          margin: 0;
        }
      }
      .vue-hamburger {
        visibility: visible;
      }

      .navOpen {
        --vue-hamburger-color: #212121;
      }
    }
  }
</style>
