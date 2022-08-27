<template lang="pug">
  v-container.pt-16
    v-row(
      justify="center"
    )
      v-col(
        cols="12"
        md="6"
      )
        FeathersVuexFormWrapper(
          v-if="item"
          :item="item"
        )
          template(v-slot="{ clone, save, reset, remove }")
            v-form(
              ref="form"
              v-model="valid"
              @submit.prevent="saveCompany(save)"
            )
              .overline Details
              v-card.mb-10(outlined)
                v-card-text
                  v-text-field(
                    filled
                    label="Name"
                    v-model="clone.name"
                    :rules="[rules.required]"
                  )

                  v-select(
                    filled
                    label="Sector"
                    v-model="clone.sector"
                    :items="sectors"
                  )

                  v-text-field(
                    filled
                    label="Founded"
                    type="number"
                    v-model="clone.founded"
                  )

                  v-text-field(
                    filled
                    label="Symbol"
                    v-model="clone.symbol"
                  )

                  v-text-field(
                    filled
                    label="Headquarters"
                    v-model="clone.headquarters"
                  )

                  v-text-field(
                    type="number"
                    filled
                    label="Employees"
                    v-model="clone.employees"
                  )

              .overline Links
              v-card(outlined).mb-10
                v-card-text
                  v-text-field(
                    filled
                    label="Website"
                    prepend-inner-icon="mdi-link"
                    v-model="clone.website"
                  )
                  v-text-field(
                    filled
                    label="Twitter"
                    prepend-inner-icon="mdi-twitter"
                    prefix="https://twitter.com/"
                    single-line
                    v-model="clone.twitter"
                  )
                  v-text-field(
                    filled
                    label="Facebook"
                    prepend-inner-icon="mdi-facebook"
                    prefix="https://www.facebook.com/"
                    single-line
                    v-model="clone.facebook"
                  )
                  v-text-field(
                    filled
                    label="Wikipedia"
                    prepend-inner-icon="mdi-wikipedia"
                    prefix="https://en.wikipedia.org/wiki/"
                    single-line
                    v-model="clone.wikipedia"
                  )

              v-btn(
                block
                color="secondary"
                large
                type="submit"
              ) Save

</template>

<script>
import { FeathersVuexFormWrapper } from 'feathers-vuex'
import validations from '~/mixins/validationRulesMixin.js'

export default {
  components: {
    FeathersVuexFormWrapper
  },
  mixins: [
    validations
  ],
  middleware: ['authenticated'],
  computed: {
    id () {
      return this.$route.params.slug
    },
    // Returns a new Todo if the route `id` is 'new', or returns an existing Todo.
    item () {
      const { Company } = this.$FeathersVuex.api

      return this.id === 'new' ? new Company() : Company.getFromStore(this.id)
    },
    sectors () {
      return [
        'Communication Services',
        'Consumer Discretionary',
        'Consumer Staples',
        'Energy',
        'Financials',
        'Health Care',
        'Industrials',
        'Information Technology',
        'Materials',
        'Real Estate',
        'Utilities'
      ]
    }
  },
  watch: {
    id: {
      handler (val) {
        // Early return if the route `:id` is 'new'
        if (val === 'new') {
          return
        }
        const { Company } = this.$FeathersVuex.api
        const existingRecord = Company.getFromStore(val)

        // If the record doesn't exist, fetch it from the API server
        // The `item` getter will automatically update after the data arrives.
        if (!existingRecord) {
          Company.get(val)
        }
      },
      // We want the above handler handler to run immediately when the component is created.
      immediate: true
    }
  },
  methods: {
    async saveCompany (save) {
      if (!this.$refs.form.validate()) { return }

      const savedCompany = await save()

      console.log(savedCompany)

      this.$router.push(`/companies/${savedCompany.slug}`)
    }
  }
}
</script>
