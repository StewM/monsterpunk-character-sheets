<template>
  <v-app :dark="dark">
    <v-toolbar>
      <v-toolbar-title><nuxt-link to="/">Monsterpunk Character Sheets</nuxt-link></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat icon @click="toggleDark"><v-icon v-if="dark">wb_sunny</v-icon><v-icon v-else-if="!dark">brightness_3</v-icon></v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        dark: true,
      }
    },
    methods: {
      toggleDark: function (event) {
        this.dark = !this.dark
        this.$cookies.set('dark', this.dark, {
          path: '/',
          maxAge: 2147483647
        })
      }
    },
    mounted: function () {
      let cookieValue = this.$cookies.get('dark')
      if (cookieValue != undefined) {
          if (cookieValue == true) this.dark = true
          else if (cookieValue == false) this.dark = false
      }
    }
  }
</script>
<style>
  .theme--dark .v-toolbar__title a{
    color: #fff;
  }
  .v-toolbar__title a{
    text-decoration: none;
  }
</style>

