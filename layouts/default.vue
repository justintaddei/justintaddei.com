<template>
  <div>
    <PageHeader />
    <nuxt />
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/main.scss';
</style>

<script>
import PageHeader from '@/components/PageHeader'
export default {
  components: { PageHeader }
}
</script>
