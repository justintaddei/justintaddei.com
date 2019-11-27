<template>
  <div class="login">
    <h1>Login</h1>
    <p>
      <input type="text" v-model="user" />
      <input type="text" v-model="pass" />
      <button @click="login">login</button>
    </p>
  </div>
</template>

<script>
export default {
  middleware: ["auth"],
  layout: "admin",
  data() {
    return {
      pass: "",
      user: ""
    };
  },
  methods: {
    login() {
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
  padding: 50px;
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
