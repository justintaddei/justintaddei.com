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
        d="M0,49.346l130,0c13.75,0 28.74,-38.794 46.168,-19.432c16.501,18.331 67.435,19.432 83.832,19.432l130,0"
        style="fill:none;stroke:currentColor;stroke-width:1.5px"
      />
    </svg>
  </div>
</template>

<script>
  export default {
    name: "Button",
    props: {
      href: {
        type: String,
        default: "/"
      }
    }
  };
</script>

<style lang="scss">
  @import "@/assets/scss/_color.scss";

  .button {
    position: relative;
    height: 45px;
    overflow: hidden;
    margin: 0 5px;
    font-size: 20px;
    outline: none;

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
    outline: none;
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
    &:focus::before {
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

  .larger {
    width: 200px;
    height: 60px;
    font-size: 20px;
    margin: 10px 0;
  }

  .primary {
    width: 200px;
    height: 60px;
    font-size: 20px;
    margin: 10px 0;
    color: #fff;
    background: #22252b;
    background: $home-blue;
    // border-radius: 10px;
    box-shadow: 0 12px 10px 2px rgba(0, 0, 0, 0.14),
      0 6px 10px 5px rgba(0, 0, 0, 0.12), 0 8px 8px -4px rgba(0, 0, 0, 0.2);
  }

  .menu {
    @media screen and (max-width: 720px) {
      svg {
        display: none;
      }

      .text {
        font-size: 20px;

        &:focus {
          background: rgba(0, 0, 0, 0.3);
        }
      }
    }
  }
</style>
