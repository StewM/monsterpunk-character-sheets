<template>
  <v-layout
    row
    justify-center
    align-center>
    <v-flex xs12 md6>
      <v-card>
        <v-card-title class="headline">Character Sheets</v-card-title>
        <v-card-text>
          <v-list>
            <div v-for="(sheet, index) in sheets" :key="sheet.id">
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title v-html="sheet.name"></v-list-tile-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-btn icon nuxt :href="getLink(sheet.id)"><v-icon>edit</v-icon></v-btn>
                </v-list-tile-action>
                
              </v-list-tile>
              <v-divider v-if="index < sheets.length -1"></v-divider>
            </div>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-btn nuxt href="/edit">New Character Sheet</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data() {
      return {
        sheets: []
      }
    },
    methods: {
      getLink: function(id){
        return "/edit?id="+id
      }
    },
    mounted: function() {
      this.$axios.get('/api/character-sheets')
        .then((response) => {
          if(response.data){
            this.sheets = response.data
          }
        })
    }
  }
</script>
