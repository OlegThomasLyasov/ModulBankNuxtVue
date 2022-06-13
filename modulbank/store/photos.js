export const state = () => ({
  photos: [],
  errors:[]
})

export const mutations = {

  setPhotos(state, photos) {
      state.photos = photos
  },

  addComment(state,comment){
    let n = getters.photoById(state)(comment.photoId)
    n.comments.push(comment)
  },

  setComments(state, comments) {
    let n = getters.photoById(state)(comments[1])
    n.comments = comments[0]
  },

  setError(state,error){
    state.errors.push(error)
  },

  deleteError(state){
    state.errors.length=0
  }
}

export const actions = {

  async fetch({commit}) {
    //получение всех фото
    const photos = await this.$axios.$get('https://boiling-refuge-66454.herokuapp.com/images')

    //создание пустого массива для комментариев
    let new_photos = photos.map(function (item,i){
      photos[i].comments = []
      return photos[i]
    });

    commit('setPhotos', new_photos)
  },

  async fetchComments({commit},photo) {
      //подтягиваем комментарии
      const comments = await this.$axios.$get('https://boiling-refuge-66454.herokuapp.com/images/'+photo.id)
      commit('setComments', [comments.comments, photo.id])
    },

  async AddCommentFetch({commit},photo){

    await this.$axios
        //отправляем post запрос
        .$post('https://boiling-refuge-66454.herokuapp.com/images/'+photo[0]+'/comments',photo[1])
        .then((res) => {
          if (res.status === 204) {
            //проверка на отправленность комментария пройдена
            alert('Комментарий успешно добавлен!');
            commit('addComment',photo[1]) //добавляем комментарий
            commit('deleteError')//обнуляем ошибки
            return new Promise((resolve) => resolve(null))
          }
          if (!res.ok) {
            //комментарий отправлен в кеш, проверка пройдена
            alert('Комментарий добавлен в кеш, не покидайте страницу')
            commit('addComment',photo[1]) //добавляем комментарий
            commit('deleteError')//обнуляем ошибки
            return new Promise((resolve) => resolve(null))
          }
          return res.json();
        })
        .catch((error) => {
          alert('Заполните все поля!');
          commit('setError', error)
          return new Error('Ошибка')
        })
    }
}

export const getters = {
  photos: s => s.photos,
  // возвращаем фото по id для комментариев
  photoById: (state) => (id) => {
    return state.photos.find(photos => photos.id === id)
  },
  errors:s=>s.errors
}
