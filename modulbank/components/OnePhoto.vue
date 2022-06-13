<template>
  <div>
      <div class="PhotoItem">
        <img :src="photo.url" @click="showModal" alt=""/>
      </div>
        <ModalPhoto
          v-if="modalShow"
          v-bind:choosePhoto="photo"
          @closeModalChild = "closeModal"
        />
  </div>
</template>


<script>
import ModalPhoto from "@/components/ModalPhoto";

export default {

  //загружаем комментарии
  created() {
    this.$store.dispatch('photos/fetchComments',this.photo)
  },

  components:{
    ModalPhoto,
  },
  props: {
    photo: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      modalShow: false,
    };
  },
  methods: {
    showModal() {
      this.modalShow = true
   },
    closeModal(){
      this.modalShow = false
    }
  },
}
</script>
<style lang="scss">

//фото элемент
.PhotoItem{
  margin: 8px;
  cursor: pointer;
  transition: 1s;
}
.PhotoItem:hover{
  transform: scale(1.05);
}

//стили для списка комментариев
.Comment-list {
  list-style: none;
  padding: 0;
  border: 1px solid rgba(0,0,0, .2);
}
.Comment-list li {
  overflow: hidden;
  padding: 6px 10px;
  font-size: 18px;
}
.Comment-list li:first-child {
  font-weight: bold;
  padding: 10px 0 10px 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid rgba(0,0,0, .2);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  color: #679bb7;
  font-size: 24px;
  box-shadow: 0 10px 20px -5px rgba(0,0,0, .2);
  text-align: start;
}
.Comment-list li:first-child:before {
  content: "\270E";
  margin-right: 10px;
}

</style>
