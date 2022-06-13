<template>
  <div>
    <h1>Тестовое задание</h1>
    <div class="container">
        <div class="row">
        <PhotoItem class="col"
          v-for="photo of photos"
          v-bind:photo="photo"
          v-bind:key="photo.id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PhotoItem from '@/components/OnePhoto'

export default {
  components:
    {
      PhotoItem
    },
  computed: {
    photos() {
      return this.$store.getters['photos/photos']
    }
  },
}
</script>

<style>
h1{
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 30px;
}
</style>
