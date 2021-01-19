<template>
  <div>
    <h1 class="cl2">{{errorPosts}} </h1>
    <div v-show="this.$store.state.visible">
      <button
        type="button"
        class="btn btn-success m-3"
        @click="backUsers()"
        >Back</button>
      <h1 class="ml-3">Post by {{this.userName.name}}</h1>
      <div
        v-for="post in posts"
        :key="post.id"
        class="post p-3 m-3"
        >
          <h4>Title: {{ post.title }}</h4>
          <p>Text: {{ post.body }}</p>
          <app-comments
            :propsId="post.id"
           ></app-comments> <!-- Передаем id поста в propsId  -->
      </div>
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
      showPostId: null,
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
          this.$store.state.errorMessage = error
          this.$store.state.visible = false
          console.log(this.$store.state.errorMessage)
          return error;
        })
    },
    getPosts() {
      axios
        .get('https://jsonplaceholder.typicode.com/posts?userId=' + this.$route.params.userId)
        .then(response => (this.posts = response.data)) //Получаем посты выбранного пользователя
        .catch((error) => {
          this.$store.state.errorMessage = error
          this.visible = false
          console.log(this.$store.state.errorMessage)
          return error;
        })
    },
    backUsers() {
      this.$router.push({
        name: 'user' // Переход на страницу пользователей
      })
    }
  },
  computed: {
    errorPosts() {
      return this.$store.state.errorMessage
    }
  },
  mounted() {
    this.getNameUser();
    this.getPosts();

  }
}
</script>

<style scoped>
  .post {
    border: 1px solid;
  }
  .cl2 {
    color: red;
  }
</style>
