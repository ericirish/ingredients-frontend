<template lang="pug">
  v-autocomplete.search(
    filled
    rounded
    prepend-inner-icon="mdi-magnify"
    :append-icon="null"
    hide-details
    placeholder="Search Ingredients"
    :search-input.sync="searchTerm"
    no-data-text="No Ingredients Found"
    :items="ingredients"
    :hide-no-data="!haveLoaded || !searchTerm.length"
    item-text="name"
    @change="makeSelection"
    return-object
    :loading="areIngredientsPending"
    v-bind="$attrs"
    no-filter
  )
</template>

<script>
import { ref, computed } from '@vue/composition-api'
import { useFind, models } from 'feathers-vuex'

export default {
  setup (props, context) {
    const { Ingredient } = models.api

    const searchTerm = ref(null)

    // Necessary because the local store may contain facilities and region outside of the user's pervue due to joins
    const ingredientsParams = computed(() => {
      if (searchTerm.value === null || searchTerm.value === '') {
        return null
      }

      const query = {
        name: {
          $regex: searchTerm.value,
          $options: 'gi'
        },
        $limit: 5
      }

      return { query }
    })

    const { items: ingredients, isPending: areIngredientsPending, haveLoaded } = useFind({ model: Ingredient, params: ingredientsParams, immediate: false })

    return {
      ingredients,
      searchTerm,
      ingredientsParams,
      areIngredientsPending,
      haveLoaded
    }
  },
  methods: {
    makeSelection (ingredient) {
      this.$router.push(`/ingredients/${ingredient.slug}`)

      // doesn't work
      // this.$nextTick(() => {
      //   this.searchTerm = null
      // })
    }
  }
}
</script>
