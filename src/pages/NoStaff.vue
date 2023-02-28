<template>
    <v-layout>
      <!-- <h1>Test</h1> -->
      <!-- <button @click="handleClickGetAuth">get auth code</button> -->
      <!-- <button @click="handleClickSignIn" v-if="!isSignIn" :disabled="!isInit">signIn</button> -->
      <!-- <button @click="handleClickSignOut" v-if="isSignIn" :disabled="!isInit">signOout</button> -->
    </v-layout>
</template>
<script>
/* ============
 * Po Index Page
 * ============
 *
 * The home index page.
 */
import VLayout from '@/layouts/Minimal.vue'
import Painting from '@/components/Painting.vue'
import jwt from 'jwt-simple'
import md5 from 'js-md5'
// const Painting = () => externalComponent('http://10.100.12.155:8101/Uploads/Painting.js')
export default {
  /**
   * The name of the page.
   */
  name: 'NoStaff',

  /**
   * The components that the page can use.
   */
  components: {
    VLayout, Painting
  },
  beforeCreate () {
    // document.body.className = 'fixed layout-top-nav fixed-footer'
    // const authCode = await this.$gAuth.getAuthCode()
  },
  data () {
    return {
    }
  },
  mounted () {
    let now = new Date()
    let month = now.getMonth() + 1
    let date = now.getDate()
    // let minute = now.getMinutes()
    // let hours = now.getHours()
    var secret = md5(((date + month)) + '')
    var payload = { foo: 'bar' }
    // var secret = 'xxx'
    var token = jwt.encode(payload, secret)
    var decoded = jwt.decode(token, secret)
    console.log(token, decoded, secret)
  },
  methods: {
    handleClickGetAuth () {
      // this.$gAuth.getAuthCode()
      // .then(authCode => {
      //   // On success
      //   console.log(authCode)
      //   // return this.$http.post('http://your-backend-server.com/auth/google', { code: authCode, redirect_uri: 'postmessage' })
      // })
      // .then(response => {
      //   // And then
      // })
      // .catch(error => {
      //   // On fail do something
      // })
    }
  }
}
</script>
