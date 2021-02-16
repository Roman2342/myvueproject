<template>
   <div class="m-3">
      <button
        type="button"
        class="btn btn-success mb-3"
        @click="backUsers()"
      >
        Back
      </button>

      <h2>Post by {{this.userName.name}}</h2>
      <h1 class="text-danger">{{this.errorPosts}}</h1>

      <div
        v-for="post in posts"
        :key="post.id"
        class="border border-2 p-3 mb-3"
      >
          <h4>Title: {{ post.title }}</h4>
          <p>Text: {{ post.body }}</p>
          <app-comments
            :propsId="post.id"
           ></app-comments> <!-- Передаем id поста в propsId  -->
      </div>
   </div>
</template>

<script>
import axios from 'axios'
import Comment from './Comments.vue'

export default {
  data() {
    return {
      userName: [],
      posts: [],
      propsId: null,
      errorPosts: null
    }
  },
  name: 'post',
  components: {
    appComments: Comment
  },
  methods: {
    getNameUser() {
      axios
        .get('https://jsonplaceholder.typicode.com/users/' + this.$route.params.userId)
        .then(response => (this.userName = response.data)) // Получаем страницу выбранного пользователя
        .catch((error) => {
        return error;
        })
    },
    getPosts() {
      axios
        .get('https://jsonplaceholder.typicode.com/posts?userId=' + this.$route.params.userId)
        .then(response => (this.posts = response.data)) //Получаем посты выбранного пользователя
        .catch((error) => {
          this.errorPosts = error
          return error;
        })
    },
    backUsers() {
      this.$router.push({
        name: 'user' // Переход на страницу пользователей
      })
    }
  },
  mounted() {
    this.getNameUser();
    this.getPosts();
  }
}
</script>
