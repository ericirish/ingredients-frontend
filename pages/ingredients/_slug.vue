<template lang="pug">
  v-container.pt-16
    v-row
      v-col
        h1.text-h3.mb-12 {{ ingredient.name }}

        v-row
          v-col
            .overline Pairs best with
            v-card(
              outlined
            )
              v-simple-table
                thead
                  tr
                    th Ingredient
                    th Correlation
                tbody
                  tr(
                    v-for="pairing in bestPairings"
                    :key="pairing._id"
                  )
                    td {{ notThisIngredient(pairing).name }}
                    td {{ pairing.correlation }}
          v-col
            .overline Pairs worst with
            v-card(
              outlined
            )
              v-simple-table
                thead
                  tr
                    th Ingredient
                    th Correlation
                tbody
                  tr(
                    v-for="pairing in worstPairings"
                    :key="pairing._id"
                  )
                    td {{ notThisIngredient(pairing).name }}
                    td {{ pairing.correlation }}
</template>

<script>
import { models } from 'feathers-vuex'

export default {
  async asyncData ({ params, $http }) {
    const { Ingredient, Pairing } = models.api

    const { data: { 0: ingredient } } = await Ingredient.find({
      query: {
        slug: params.slug,
        $limit: 1
      },
      $populateParams: {
        name: 'withAll'
      }
    })

    const { data: bestPairings } = await Pairing.find({
      query: {
        ingredientIds: ingredient._id,
        $sort: {
          correlation: -1
        },
        $limit: 5
      },
      $populateParams: {
        name: 'withAll'
      }
    })

    const { data: worstPairings } = await Pairing.find({
      query: {
        ingredientIds: ingredient._id,
        $sort: {
          correlation: 1
        },
        $limit: 5
      },
      $populateParams: {
        name: 'withAll'
      }
    })

    return {
      ingredient,
      bestPairings,
      worstPairings
    }
  },
  head () {
    return {
      title: `${this.ingredient.name}`,
      meta: [
        { hid: 'description', name: 'description', content: this.metaDescription },
        { hid: 'og:description', name: 'og:description', content: this.metaDescription },
        { hid: 'og:title', property: 'og:title', content: this.ingredient.name }
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
    notThisIngredient (pairing) {
      const notThisIngredient = pairing.ingredients.filter(ingredient => ingredient._id !== this.ingredient._id)

      return notThisIngredient[0]
    }
  }
}
</script>
