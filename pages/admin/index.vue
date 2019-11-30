<template>
  <div class="admin">
    <h1>Admin</h1>
    <p v-if="complete">Uploaded</p>
    <form v-else @submit.prevent="submit" enctype="multipart/form-data">
      <div>
        <input placeholder="Name/Domain" type="text" v-model="domain" />
        <input placeholder=".COM" type="text" v-model="topLevelDomain" />
      </div>
      <textarea v-model="about"></textarea>
      <select multiple v-model="type">
        <option value="individual">Individual</option>
        <option value="small business">Small Business</option>
        <option value="business">Business</option>
        <option value="online store">Online Store</option>
        <option value="blog">Blog</option>
        <option value="creative work">Creative Work</option>
        <option value="portfolio">Portfolio</option>
      </select>
      <label>
        Desktop
        <input ref="desktopImage" type="file" accept="image/*" />
      </label>
      <label>
        Mobile
        <input ref="mobileImage" type="file" accept="image/*" />
      </label>

      <input type="submit" value="Add website" />
    </form>
  </div>
</template>

<script>
  export default {
    middleware: ["auth"],
    layout: "admin",
    data() {
      return {
        domain: "",
        topLevelDomain: ".com",
        about: "",
        type: [],
        complete: false
      };
    },
    methods: {
      submit() {
        const formData = new FormData();

        formData.append("domain", this.domain);
        formData.append("topLevelDomain", this.topLevelDomain);
        formData.append("about", this.about);
        formData.append("type", this.type);
        formData.append("desktopImage", this.$refs.desktopImage.files[0]);
        formData.append("mobileImage", this.$refs.mobileImage.files[0]);

        this.$axios.$post("/api/portfolio", formData).then(res => {
          this.complete = true;
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .admin {
    padding: 50px;
    color: #fff;

    form {
      display: flex;
      flex-direction: column;
    }
  }
</style>
