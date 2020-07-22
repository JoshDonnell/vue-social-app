<template>
  <div class="o-row  o-row--grey">
    <div class="o-container">
      <div v-if="errors">
        <span>{{ errors }}</span>
      </div>
      <div class="o-layout  o-layout--gutter">
        <div class="o-layout__item  u-width-1/2">
          <form action="" @submit.prevent="login">
            <div>
              <input name="email" type="email" v-model="loginFields.email" placeholder="Enter email">
            </div>
            <div class="u-mt-half">
              <input name="email" type="password" v-model="loginFields.password" placeholder="Enter Password">
            </div>
            <button class="u-mt-half">Login</button>
          </form>
        </div>

        <div class="o-layout__item  u-width-1/2">
          <form action="" @submit.prevent="register">
            <div>
              <input name="email" type="email" v-model="registerFields.email" placeholder="Enter email">
            </div>
            <div class="u-mt-half">
              <input name="email" type="password" v-model="registerFields.password" placeholder="Enter Password">
            </div>
            <div class="u-mt-half">
              <input name="email" type="text" v-model="registerFields.name" placeholder="Enter Name">
            </div>
            <div class="u-mt-half">
              <input name="email" type="text" v-model="registerFields.username" placeholder="Enter Username">
            </div>
            <button class="u-mt-half">Register</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginFields: {
        email: '',
        password: ''
      },
      registerFields: {
        email: '',
        name: '',
        username: '',
        password: ''
      }
    }
  },

  methods: {
    login() {
      this.$store.dispatch('auth/login', {
        email: this.loginFields.email,
        password: this.loginFields.password
      })
    },

    register() {
      this.$store.dispatch('auth/register', {
        email: this.registerFields.email,
        name: this.registerFields.name,
        username: this.registerFields.username,
        password: this.registerFields.password
      })
    }
  },

  computed: {
    errors() {
      return this.$store.state.auth.errors
    }
  },

  mounted() {
    this.$store.commit('auth/clearErorrs')
  }
}
</script>

<style>

</style>