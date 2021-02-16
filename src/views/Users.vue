<template>
    <div class="container fluid m-5">
      <div class="row justify-content-center">
        <div class="col-md-7">
          <h2>List users</h2>
        </div>
      </div>
      <div class="row">
        <div class="col-md-7">
          <h3 class="text-danger">{{errorUsers}}</h3>
          <ul class="list-group">
              <li
                class="list-group-item list-group-item-action list-group-item-success"
                v-for="user in users"
                :key="user.id"
                @click="selectUser(user.id)"
              >
                <h5 class="text-primary">USER {{user.id}}</h5>
                <b>Name:</b> {{ user.name }}
                <b>Email:</b> {{ user.email.toLowerCase() }}
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
      errorUsers: null
    }
  },
  name: 'user',
  methods: {
    getUsers() {
      axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        this.users = response.data
      }) // Получаем список пользователей
      .catch((error) => {
        this.errorUsers = error
        return error;
      })
    },
    selectUser(userId) {
      this.$router.push({
        name: 'post',
        params: {userId},
      })
    } // Передаем id пользователя для получения его постов
  },
  mounted() {
    this.getUsers();
  }
}
</script>
