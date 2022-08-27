<template lang="pug">
  v-container.pt-16
    v-row(
      justify="center"
    )
      v-col(
        cols="12"
        md="6"
      )
        v-card(
          outlined
        )
          v-card-text
            v-text-field.flex-shrink-1.flex-grow-0(
              label="Search"
              single-line
              prepend-inner-icon="mdi-magnify"
              hide-details
              filled
              :loading="isPending"
              rounded
              dense
              v-model="search"
            )
          v-data-table.clickable(
            :loading="isPending"
            :headers="headers"
            :items="companies"
            no-data-text="No Assessments Found"
            :server-items-length="!isPending? latestQuery.response.total : 0"
            :options.sync="options"
          )
            template(
              #body.prepend
              v-if="isLoggedIn"
            )
              tr
                td(colspan="100")
                  v-btn(
                    color="primary"
                    block
                    text
                    to="/companies/edit/new"
                  )
                    v-icon(
                      left
                    ) mdi-plus
                    | Add Company

            template(v-slot:item.name="{ item: company }")
              nuxt-link(:to="`/companies/${company.slug}`") {{ company.name }}
          //-       span {{ assessment.name }}
          //-     span(v-else) {{ assessment.name }}
          //- template(v-slot:item.createdAt="{ item: assessment }")
          //-   span {{ assessment.createdAt | moment('MMM D, YYYY') }}
          //- template(v-slot:item.score="{ item: assessment }")
          //-   span(
          //-     v-if="assessment.status === 'Completed' && assessment.hasScore"
          //-   ) {{ assessment.score.toFixed(1) }}%
          //-   span.text-uppercase(
          //-     v-else-if="typeof assessment.score === 'string'"
          //-   ) {{ assessment.score }}
          //-   v-icon(
          //-     v-else-if="assessment.status === 'Incomplete'"
          //-     large
          //-     color="grey lighten-1"
          //-   ) mdi-update
          //- template(v-slot:item.facilityId="{ item: assessment }")
          //-   span(v-if="assessment.facility") {{ assessment.facility.name }}
          //- template(v-slot:item.assessorId="{ item: assessment }")
          //-   span(v-if="assessment.assessor") {{ assessment.assessor.fullName }}
          //- template(v-slot:item.pass="{ item: assessment }")
          //-   span(
          //-     v-if="assessment.pass !== null && assessment.isComplete"
          //-   )
          //-     v-chip.passFail(
          //-       dense
          //-       :color="assessment.pass ? 'success' : 'error'"
          //-     ) {{ assessment.pass ? 'Pass' : 'Fail' }}

          //-   v-icon(
          //-     large
          //-     v-if="!assessment.isComplete"
          //-     color="grey lighten-1"
          //-   ) mdi-update

</template>

<script>
import { useFind } from 'feathers-vuex'
import { computed, ref } from '@vue/composition-api'

export default {
  setup (props, context) {
    const { Company } = context.root.$FeathersVuex.api

    const search = ref('')

    const headers = computed(() => {
      return [
        {
          text: 'Name',
          value: 'name'
        },
        {
          text: 'Score',
          value: 'score'
        }
      ]
    })

    const options = ref({
      page: 1,
      itemsPerPage: 15,
      sortBy: ['name'],
      sortDesc: [false]
    })

    const sortBy = computed(() => {
      const obj = {}

      if (options.value.sortBy && options.value.sortBy.length) {
        obj[options.value.sortBy[0]] = options.value.sortDesc[0] ? -1 : 1
      }

      return obj
    })

    const limit = computed(() => {
      if (options.value.itemsPerPage !== -1) {
        return options.value.itemsPerPage
      } else {
        return 999
      }
    })

    const companiesParams = computed(() => {
      const query = {
        $limit: limit.value,
        $skip: options.value.itemsPerPage * (options.value.page - 1),
        $sort: sortBy.value
      }

      if (search.value) {
        query.name = {
          $regex: search.value,
          $options: 'gi'
        }
      }

      return {
        query
      }
    })

    const {
      items: companies,
      isPending,
      paginationData,
      latestQuery
    } = useFind({
      model: Company,
      params: companiesParams
    })

    return {
      search,
      headers,
      companies,
      options,
      latestQuery,
      paginationData,
      isPending
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
    handleRowClick (company) {
      this.$router.push(`/companies/${company.slug}`)
    }
  }
}
</script>
