<template>
  <v-app :dark="darkTheme">
    <router-view/>
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
  watch: {
    darkTheme: function (val) {
      this.$vuetify.theme.text = val ? '#ffffff' : '#000000';
    },
  }
}
</script>
