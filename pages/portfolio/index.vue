<template>
  <div>
    <div class="section-one">
      <div id="portfolioAnimation">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="square"></div>
        <div class="square"></div>
        <div class="square"></div>
        <div class="triangle"></div>
        <div class="triangle"></div>
        <div class="triangle"></div>
        <div class="cross"></div>
        <div class="cross"></div>
        <div class="cross"></div>
      </div>
      <h1 class="page-title">Portfolio</h1>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea qui vel
        unde in cumque laboriosam laborum accusamus consectetur doloribus
        laudantium voluptas reiciendis nihil iusto cupiditate, natus nulla minus
        alias non!
      </p>
    </div>
    <div class="section-two"></div>
  </div>
</template>

<script>
import anime from 'animejs'
export default {
  created() {
    this.$store.commit('theme/setIsHeaderDark', true)
    this.$store.commit('theme/setShouldHeaderHaveTitle', true)
  },

  mounted() {
    this.startAnimation()
  },

  beforeDestroy() {
    if (this.animation) this.animation.pause()
  },

  methods: {
    startAnimation() {
      const animationContainer = document.querySelector('#portfolioAnimation')
      this.animation = anime({
        targets: animationContainer.querySelectorAll(
          '.circle, .square, .triangle, .cross'
        ),
        translateX() {
          return `${anime.random(
            window.innerWidth * 0.1,
            window.innerWidth * 0.9
          )}px`
        },
        translateY() {
          return `${anime.random(
            window.innerHeight * 0.1,
            window.innerHeight * 0.75
          )}px`
        },
        rotate() {
          return `${anime.random(0, 5) + Math.random()}turn`
        },
        duration: 7000,
        complete: this.startAnimation.bind(this)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/ui-components/_shape.scss';
@import '@/assets/scss/_color.scss';
.section-one {
  background: #22252b;
  background: #292c34;
  min-height: 500px;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;
  color: #fff;

  padding: 0 25%;

  &::after {
    @extend %shape;
    height: 25%;
    background: no-repeat url('/imgs/waves/wave-portfolio-first.svg');
  }

  width: 100%;
  h1 {
    margin: 0;
    position: relative;
  }
  p {
    margin: 0;
    position: relative;
  }

  #portfolioAnimation {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .circle {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: $brand-purple;
      transform: translate(-100px, 0);
      pointer-events: none;
      opacity: 0.5;
      position: fixed;
    }
    .square {
      width: 50px;
      height: 50px;
      background: $brand-green;
      transform: translate(-100px, 0);
      pointer-events: none;
      opacity: 0.5;
      position: fixed;
    }

    .cross {
      transform: translate(-100px, 0);
      pointer-events: none;
      opacity: 0.5;
      position: fixed;
      background: #00447a;
      height: 50px;
      width: 10px;
      &:after {
        background: #00447a;
        content: '';
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
      opacity: 0.5;
      position: fixed;
      width: 0;
      height: 0;
      border-left: 25px solid transparent;
      border-right: 25px solid transparent;
      border-bottom: 50px solid #7a0039;
    }
  }
}

.section-two {
  width: 100%;
  height: 100vw;
  background: #22252b;
}
</style>
