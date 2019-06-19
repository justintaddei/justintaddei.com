<template>
  <header :class="{ dark: isDark, filled: filled }">
    <div class="logo">
      <img src="/imgs/logo.svg" alt="Justin Taddei's logo" />
      <h2
        :style="{
          opacity: shouldShowTitle ? 1 : 0
        }"
      >
        Justin Taddei
      </h2>
    </div>
    <nav>
      <ul>
        <li>
          <Button href="/">Home</Button>
        </li>
        <li>
          <Button href="/portfolio">Portfolio</Button>
        </li>
        <li>
          <Button href="/contact">Contact</Button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import Button from './inputs/Button'
export default {
  name: 'PageHeader',
  components: {
    Button
  },

  data: () => ({
    filled: false
  }),

  computed: {
    isDark() {
      return this.$store.state.theme.isHeaderDark
    },
    shouldShowTitle() {
      return this.$store.state.theme.shouldHeaderHaveTitle || this.filled
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
  },

  methods: {
    onScroll() {
      this.filled = window.scrollY > 20
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  top: 0;
  position: fixed;
  z-index: 100;
  left: 0;
  width: 100%;
  height: 75px;
  color: #fff;
  transition: all 0.2s ease;
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
  }
}
img {
  width: 65px;
  height: 65px;
  position: relative;
  margin-left: 5px;
}

h2 {
  display: inline;
  margin: 0;
  padding: 0;
  margin-left: 20px;
  position: relative;
  top: 5px;
}

nav {
  height: 90%;
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
  }
}
</style>
