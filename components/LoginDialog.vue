<template lang="pug">
v-dialog(
  :value="value"
  :max-width="500"
)
  v-card
    v-form(
      ref="form"
      @submit.prevent="login"
      v-model="valid"
    )
      v-card-title Login
      v-card-text
        v-sheet.pa-4.mb-6(
          v-if="loginError"
          color="error lighten-2"
        )
          h3.text-center {{ loginError }}
        v-text-field(
          label='Email'
          name='email'
          v-model="userLogin.email"
          filled
          type='text'
          :rules="[rules.required, rules.email]"
        )
        v-text-field#password(
          label='Password'
          filled
          v-model="userLogin.password"
          name='password'
          type='password'
          :rules="[rules.required]"
        )
      v-card-actions
        v-btn.ml-auto(
          text
          type="submit"
          :disabled="!valid"
          :loading="sendingLogin"
          color="primary"
        ) Login

      //- div.mt-4
        router-link(
          :to="{ name: 'reset-password-request' }"
        ) Forgot password?
</template>

<script>
import { mapActions } from 'vuex'

import validations from '@/mixins/validationRulesMixin'

export default {
  mixins: [validations],
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    userLogin: {
      email: '',
      password: ''
    },
    loginError: '',
    sendingLogin: false
  }),
  methods: {
    ...mapActions('auth', ['authenticate']),
    async login () {
      this.sendingLogin = true

      try {
        const response = await this.authenticate({ ...this.userLogin, strategy: 'local' })
        console.log('Authentication Success: ', response)

        this.$emit('input', false)
      } catch (error) {
        this.sendingLogin = false
        if (error.message === 'Invalid login') {
          this.loginError = 'Your email and/or password are invalid'
        } else {
          this.loginError = error.message
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
