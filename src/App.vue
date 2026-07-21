<template>
  <nav class="app-nav">
    <router-link to="/properties">Properties</router-link>
    <router-link to="/recommendations">Recommendations</router-link>
    <div class="end">
      <template v-if="uid">
        <a href="#" @click.prevent="logout">Exit</a>
      </template>
      <router-link v-else to="/login">Login</router-link>
    </div>
  </nav>
  <router-view/>
</template>

<script>
export default {
  data() {
    return {
      uid: localStorage.getItem('uid')
    }
  },
  methods: {
    login(userId) {
      localStorage.setItem('uid', userId)
      this.uid = userId
    },
    logout() {
      localStorage.removeItem('uid')
      this.uid = null
      this.$router.push('/login')
    }
  },
  provide() {
    return {
      login: this.login,
      logout: this.logout
    }
  }
}
</script>



<style>
</style>