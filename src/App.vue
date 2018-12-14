<template>
  <v-app :dark="darkTheme">
    <router-view :toggleTheme="toggleTheme"/>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      darkTheme: true,
    }
  },
  mounted () {
    console.log("ENV VARs:", process.env)
    console.log("API KEY:", process.env.VUE_APP_GOOGLE_MAPS_API_KEY)
  },
  watch: {
    darkTheme: function (val) {
      this.$vuetify.theme.text = val ? '#ffffff' : '#000000';
    },
  },
  methods: {
    toggleTheme: function() {
      this.darkTheme = !this.darkTheme
    }
  }
}
</script>
