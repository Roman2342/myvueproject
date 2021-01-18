<template>
  
  <div class="conteiner fluid m-5">
    <div class="row">
      <div :class="cl1">
        <h1 :style="{ color: heading }">{{errorUsers}}</h1>
        <ul class="list-group">
            <li
              class="list-group-item"
              v-for="user in users"
              :key="user.id"
              @click="selectUser(user.id)"
            >
              <b>Name:</b> {{ user.name }}<br>
              <b>Email:</b> {{ user.email.toLowerCase() }}<br>
              <b>City:</b> {{ user.address.city }}
            </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      users: [],
      heading: '',
      cl1: 'col-md-6'
    }
  },
  name: 'user',
  components: {

  },
  computed: {
    errorUsers() {
      return this.$store.state.errorMessage
    }
  },
  methods: {
    getUsers() {
      axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        this.users = response.data
        this.$store.state.errorMessage = 'List users'
      }) // Получаем список пользователей
      .catch((error) => {
        this.$store.state.errorMessage = error
        this.heading = 'red'
        this.cl1 = 'col-md-12'
        console.log(this.$store.state.errorMessage)
        return error;
      })
    },
    selectUser(userId) {
      this.$router.push({
        name: 'post',
        params: {userId},
      })
      this.$store.state.errorMessage = ''
    } // Передаем id пользователя для получения его постов
  },
  mounted() {
    this.getUsers();
  }
}
</script>
