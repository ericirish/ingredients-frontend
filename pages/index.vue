<template lang="pug">
  v-container.fill-height
    v-row.fill-height(
      justify="center"
      align="center"
    )
      v-col(
        cols="12"
      )
        v-row(
          justify="center"
        )
          v-col(
            cols="12"
            md="6"
          )
            Search.mb-16

</template>

<script>
import { models } from 'feathers-vuex'

export default {
  layout: 'search',
  data: () => ({
    unapprovedEventCount: 0
  }),
  computed: {
    currentUser () {
      return this.$store.getters['auth/user']
    }
  },
  watch: {
    async currentUser (user) {
      console.log(user)

      const { Event } = models.api
      this.unapprovedEventCount = await Event.count({ query: { approved: false } })
    }
  },
  methods: {
    makeSelection (company) {
      this.$router.push(`/companies/${company.slug}`)
    }
  }
}
</script>
