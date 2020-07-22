<template>
  <div>
      <header class="c-header  o-row  u-pt  u-pb-0">
        <div class="o-container  u-flex  u-space-between  u-v-center">
          <nuxt-link to="/" class="c-logo">
            <img class="c-log__media" src="https://w0.pngwave.com/png/959/481/cafe-coffee-logo-restaurant-coffee-trifold-design-material-png-clip-art.png" alt="">
          </nuxt-link>

          <nav>
            <nuxt-link class="u-mr" v-if="user" to="/profile">{{ user.displayName }}</nuxt-link>
            <span v-if="user" @click="logout">Logout</span>
            <nuxt-link v-else to="/login">Login</nuxt-link>
          </nav>
        </div>
      </header>

      <transition
        name="fade"
        mode="out-in"
      >
        <Nuxt /> 
    </transition>
  </div>
</template>

<script>
  export default {
    methods: {
      logout() {
        this.$store.dispatch('auth/logout')
      }
    },
    computed: {
      user() {
        return this.$store.state.auth.userProfile
      }
    }
  }
</script>


<style scoped>
  .c-logo {
    display: block;
    width: 100px;
  }

    .c-logo__media {
      width: 100%;
    }
</style>