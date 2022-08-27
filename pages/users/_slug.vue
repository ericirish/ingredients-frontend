<template lang="pug">
.users
  v-container.pt-16
    v-row
      v-col
        v-row(
          justify="space-between"
          align="end"
        )
          v-col(
            cols="12"
            md="auto"
          )
            h1.text-h4.mb-0
              v-icon(left) mdi-account
              | {{ user.username }}
          v-col(
            cols="12"
            md="auto"
          )
            h2.text-h5
              strong {{ total }}
              | &nbsp;contributions
  v-divider
</template>

<script>
import { models } from 'feathers-vuex'

export default {
  async asyncData ({ params, $http }) {
    const { User, Event } = models.api

    const { data: { 0: user } } = await User.find({
      query: {
        username: params.slug,
        $limit: 1
      }
    })

    const { total } = await Event.find({
      query: {
        creatorId: user._id,
        $limit: 0
      }
    })

    return {
      total,
      user
    }
  },
  data () {
    return {

    }
  },
  head () {
    return {
      // title: `${this.user.username} - Are They Woke?`,
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex' }
      ]
    }
  },
  computed: {
    currentUser () {
      return this.$store.getters['auth/user']
    },
    isLoggedIn () {
      return this.$store.getters['auth/isAuthenticated']
    }
  },
  methods: {

  }
}
</script>
