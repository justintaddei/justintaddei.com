<template>
  <div
    role="checkbox"
    :aria-checked="state ? 'checked' : ''"
    aria-label="Menu toggle"
    tabindex="0"
    class="vue-hamburger"
    :class="{ 'vue-hamburger-open': state }"
    @click="toggle()"
    @keypress.enter.space.prevent="toggle"
  >
    <div class="top"></div>
    <div class="middle"></div>
    <div class="bottom"></div>
  </div>
</template>

<script>
  export default {
    name: "vue-hamburger",
    props: {
      state: Boolean
    },
    model: {
      prop: "state",
      event: "toggle"
    },
    methods: {
      toggle() {
        this.$emit("toggle", !this.state);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .vue-hamburger {
    $height: 25px;
    $bar-height: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    height: $height;
    width: 35px;
    top: 25px;
    margin-right: 22px;
    outline: none;
    transition: transform 0.4s ease-in-out;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;

    &:focus > div {
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
    }

    &.vue-hamburger-open {
      transform: rotate(180deg);

      > .top {
        transform: translateY(($height - $bar-height)/2) rotate(45deg);
      }

      > .middle {
        opacity: 0;
      }

      > .bottom {
        transform: translateY(-(($height - $bar-height)/2)) rotate(-45deg);
      }
    }

    > div {
      background: var(--vue-hamburger-color, #212121);
      width: 100%;
      border-radius: 5px;
      height: $bar-height;
      transition: transform 0.4s ease-in-out, opacity 0.3s linear,
        color 0.3s linear;
    }
  }
</style>
