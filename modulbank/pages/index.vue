<template>
    <AllPhoto
    />
</template>

<script>

import  AllPhoto from '@/components/AllPhotos' //инициализируем компонент
export default {

  async fetch({store}) {
    if (store.getters['photos/photos'].length === 0) {
      await store.dispatch('photos/fetch')
    }
  },
  computed: {
    photos() {
      return this.$store.getters['photos/photos']
    }
  },
  components: {
    AllPhoto
  }
}
</script>

<style>
body{
  background-color: beige;
}
</style>
