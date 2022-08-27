<template lang="pug">
  v-app(light)
    snack-stack
    v-app-bar(
      color="white"
      fixed
      app
      elevate-on-scroll
    )
      v-container
        v-row(
          align="center"
          justify="space-between"
        )
          v-col(cols="auto")
            nuxt-link.text-decoration-none.text--primary.d-flex.align-center(to="/")

          v-col(
            md="auto"
          )
            Search(
              dense
            )
          v-col(cols="auto")
            v-menu(
              bottom
              left
              v-if="isLoggedIn"
            )
              template(v-slot:activator="{ on }")
                v-avatar.white--text(
                  v-on="on"
                  color="primary"
                  size="40"
                )
                  span {{ currentUser.initial }}
              v-list(min-width="150")
                v-list-item(to="/")
                  v-list-item-title My Account
                v-list-item(@click="logout")
                  v-list-item-title Logout

            v-btn(
              v-else
              :outlined="$vuetify.breakpoint.mdAndUp"
              @click="isLoginOpen = true"
              :icon="$vuetify.breakpoint.smAndDown"
            )
              span(v-if="$vuetify.breakpoint.mdAndUp") Login
              v-icon(v-else) mdi-login

          LoginDialog(
            v-model="isLoginOpen"
          )

    v-main.background
      Nuxt
</template>

<script>
export default {
  data: () => ({
    isLoginOpen: false
  }),
  computed: {
    currentUser () {
      return this.$store.getters['auth/user']
    },
    isLoggedIn () {
      return this.$store.getters['auth/isAuthenticated']
    }
  },
  methods: {
    async logout () {
      await this.$store.dispatch('auth/logout')
      window.location.reload()
    }
  }
}
</script>

<style lang="scss">

</style>
