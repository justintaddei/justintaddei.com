<template>
  <div class="button">
    <nuxt-link class="text" :to="href"><slot /></nuxt-link>
    <svg
      class="wobble-line"
      style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421"
      version="1.1"
      xml:space="preserve"
      viewBox="0 0 390 50"
    >
      <path
        fill="none"
        stroke-width="1.5"
        d="M0,47.585c0,0,97.5,0,130,0  c13.75,0,28.74-38.778,46.168-19.416C192.669,46.5,243.603,47.585,260,47.585c31.821,0,130,0,130,0"
        style="stroke:currentColor"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Button',
  props: {
    href: {
      type: String,
      default: '/'
    }
  }
}
</script>

<style lang="scss">
.button {
  position: relative;
  height: 45px;
  overflow: hidden;
  margin: 0 5px;
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
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.1);
    opacity: 0;
    transition: opacity 0.2s;
  }
  &:hover::before {
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
</style>
