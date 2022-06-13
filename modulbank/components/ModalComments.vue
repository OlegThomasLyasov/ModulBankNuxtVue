<template>
  <!--Модальное окно для комментариев-->
  <div @click.self="closeModalComments" class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">

        <div class="modal-header">
          <slot name="header">
            <div class="modal-close" @click="closeModalComments">&#10006;</div>
            <h4>Добавить комментарий</h4>
          </slot>
        </div>

        <div class="modal-body">
          <slot name="body">
            <form v-on:submit.prevent="submitForm" >

              <div class="form-group">
                <label for="name">Введите имя: </label>
                <input type="text" class="form-control" id="name" placeholder="Ваше имя" v-model="form.name" >
              </div>
              <p v-show="errors.length" class="validation">Заполните поле!</p>

              <label for="text">Ваш комментарий</label>
              <div class="form-group">
                <textarea name="text" class="form-control" id="text" v-model="form.comment"></textarea>
              </div>
              <p v-show="errors.length" class="validation">Заполните поле!</p>

              <div class="form-group">
                <div class="row justify-content-center mt-4">
                  <button class="btn btn-outline-secondary" >Оставить комментарий</button>
                </div>
              </div>
            </form>
          </slot>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {

  props:{
    //выбранное фото
    choosePhoto: {
      type: Object,
      required: true
    },
  },

  computed:{
    //получение ошибок
    errors(){
      return this.$store.getters['photos/errors']
    },
  },

  data(){
    return{
      validationName:false,
      validationComments:false,//валидация
      form: {
        id: null,
        name: '',
        photoId:null,
        text:'',
        comment:'',
        date:''
      },
    }
  },
  methods: {
    //закрытие модального окна
    closeModalComments() {
      this.$emit('closeModalCommentsChild')
    },
    //форма отправления
    submitForm() {
      this.form.id = Date.now();
      this.form.photoId = this.choosePhoto.id;
      this.form.text = this.form.comment;
      this.form.date = Date.now();
      // Используем dispatch чтобы вызвать экшен с добавлением комментария
      this.$store.dispatch('photos/AddCommentFetch', [this.form.photoId, this.form])
        .then(() => {
          if (!this.errors.length) {
            //если ошибок нет - возвращаемся на исходную
            this.$emit('closeModalCommentsChild')
          }
        })
    },
  }
}
</script>

<style scoped lang="scss">
.btn{
  width: 80%;
}
//форма заполнения
.form-group{
  margin-bottom: 10px;
}
textarea{
  height: 245px;
  width: 100%;
}
//валидация
.validation{
  font-size: 14px;
  color:red;
  display: flex;
  justify-content: start;
}
</style>
