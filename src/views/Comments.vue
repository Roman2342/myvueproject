<template>
  <div>
    <button
      type="button"
      class="btn btn-danger"
      @click="selectPost(propsId)"
      >{{ btnText(propsId) }}</button>
      <h1 class="text-danger">{{this.errorMessage}}</h1>
      <div class="row pl-3 pt-3">
        <div
          class="col-md-11"
          v-for="comment in comments"
          v-show="propsId === showPostId"
          :key="comment.id"
        >
            <h5><b>Author:</b> {{ comment.email.toLowerCase() }}</h5>
            <h5><b>Name:</b> {{ comment.name }}</h5>
            <p><b>Text:</b> {{ comment.body }}</p>
            <hr/>
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ['propsId'], // Получаем id выбранного поста
  data() {
    return {
      showPostId: null,
      comments: [],
      errorMessage: null
    }
  },
  methods: {
    selectPost(userPostId) {
      if(this.showPostId === userPostId) {
        this.showPostId = null
      }
      else {
        axios
          .get('https://jsonplaceholder.typicode.com/comments?postId=' + userPostId)
          .then(response => {
            this.comments = response.data;
            this.showPostId = userPostId
          }) // Получаем комментарии выбранного поста и показываем их в случае равенства showPostId и userPostId
          .catch((error) => {
            this.errorMessage = 'Error loading comments:' + error
          })

      }
    },
    btnText(postId) {
      if (this.showPostId === postId) {
        return 'Hide comments'
      }
        return 'Upload comments'
    } // Меняем надпись кнопки в зависимости от выполнения условия равенства showPostId и postId
  },
  mounted() {
    this.selectPost()
  }
}
</script>
