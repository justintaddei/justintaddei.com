<template>
  <div @keypress.enter="login" class="login">
    <img src="@/static/imgs/logo.png" alt="Justin Taddei's logo" />
    <h1>Login</h1>
    <p>
      <input type="text" placeholder="Username" v-model="user" />
      <input type="password" placeholder="Password" v-model="pass" />
    </p>
    <span @click="login()"><Button fake class="primary">Login</Button></span>
  </div>
</template>

<script>
  import Button from "@/components/inputs/Button.vue";

  export default {
    middleware: ["auth"],
    layout: "admin",
    components: { Button },
    data() {
      return {
        pass: "",
        user: ""
      };
    },
    methods: {
      login() {
        console.log("login");
        this.$auth
          .loginWith("local", {
            data: {
              username: this.user,
              password: this.pass
            }
          })
          .catch(err => {
            console.error(err);
          });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    img {
      $s: 150px;
      width: $s;
      height: $s;
      border-radius: 50%;
    }
    color: #fff;
    > p {
      display: inline-flex;
      flex-direction: column;
      > * {
        margin: 5px 0;
      }
    }
  }
</style>
