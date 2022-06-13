<template>
    <!--Модальное окно фото-->
    <div @click.self="closeModal" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              <div class="modal-close" @click="closeModal">&#10006;</div>
              <h4>Фото</h4>
            </slot>
          </div>

          <div class="modal-body-photo">
            <slot name="body">
              <img :src='choosePhoto.url' class="Modal_img" alt=""/>
            </slot>
          </div>


          <div v-bind:class="{'modal-footer-photo':photos.comments.length, 'modal-footer-photo-none':!photos.comments.length}">
            <slot name="footer">
              <LoaderSpin v-if="loading"/>
              <ul v-else-if="photos.comments.length" class="Comment-list">
                <li>Комментарии</li>
                <li class="Comment-text" v-for="comment in photos.comments"
                    v-bind:key="comment.id">
                    {{ comment.text }}
                </li>

              </ul>
              <p v-else>Комментариев пока нет:( <br/>Будьте первыми! </p>
            </slot>
          </div>

          <div class="row justify-content-center mb-3" style="position: absolute; bottom:0; width: 100%;">
            <button class="btn btn-outline-secondary btn-lg" @click="OpenModalComments">
              Добавить комментарий
            </button>
          </div>

          <ModalComments
              v-if="modalCommentsShow"
              v-bind:choosePhoto="choosePhoto"
              @closeModalCommentsChild ="CloseModalComments"
          />

        </div>
      </div>
    </div>
</template>

<script>
import LoaderSpin from '@/components/LoaderSpin'
import ModalComments from "@/components/ModalComments";

export default {

  props: {
    //получаем выбранное фото
    choosePhoto: {
      type: Object,
      required: true
    },
  },
  components:{
    LoaderSpin,
    ModalComments
  },

  computed: {
    photos() {
      //получаем фото по id с помощью getter
      this.loading = false
      return this.$store.getters['photos/photoById'](this.choosePhoto.id)
    }
  },

  data(){
    return{
      modalCommentsShow: false,
      loading: true //загрузка спиннер
    }
  },
  methods:{
    closeModal: function () {
      this.$emit('closeModalChild')
    },
    OpenModalComments() {
      this.modalCommentsShow = true
      this.modalShow = false
    },
    CloseModalComments(){
      this.modalCommentsShow = false
    },
  }
}
</script>

<style lang="scss">

//модальное окно
.modal-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.39);
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
  margin-bottom: 20px;
}

.modal-close{
  border-radius: 50%;
  color: #fff;
  background:black;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 7px;
  right: 7px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  transform: rotate(45deg)
}
.modal-close:hover{
  background:gainsboro;
}
.modal-container {
  background: #fff;
  border-radius: 8px;
  padding: 15px;
  width: 450px;
  max-width: 100%;
  position: fixed;
  height: 600px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.modal-body-photo {
  margin: 20px 0 20px 10px;
  display: flex;
  width: 400px;
  max-width: 100%;
  height: 250px;
}
.modal-body-photo .Modal_img{
  width: 350px;
  margin: auto;
}
.modal-footer-photo{
  vertical-align:bottom;
  display:inline-block;
  height: 150px;
  width: 100%;
  margin-bottom: 10px;
  overflow-y: auto;
}
//если комментариев нет
  .modal-footer-photo-none{
    display: flex;
    height: 150px;
    width: 100%;
    justify-content: center;
    text-align: center;
  }
.modal-footer-photo-none p{
  font-size: 24px;
  margin: auto;
}
.btn{
  width: 80%
}
</style>
