<template>
    <v-layout row wrap>
        <v-flex xs11><v-text-field label="Name" v-model="tech.name"></v-text-field></v-flex>
        <v-flex xs1 align-end><v-btn absolute flat icon @click="remove"><v-icon>remove</v-icon></v-btn></v-flex>
        <v-flex xs12><v-text-field label="Targeting" v-model="tech.targeting"></v-text-field></v-flex>
        <v-flex xs12><v-text-field label="Drawback" v-model="tech.drawback"></v-text-field></v-flex>
        <v-flex xs12><v-text-field label="Base Effect" v-model="tech.base"></v-text-field></v-flex>
        <v-flex xs4 pr-2><v-text-field label="Bonus 1" v-model="tech.bonus1"></v-text-field></v-flex>
        <v-flex xs4 pr-2><v-text-field label="Bonus 2" v-model="tech.bonus2"></v-text-field></v-flex>
        <v-flex xs4><v-text-field label="Bonus 3" v-model="tech.bonus3"></v-text-field></v-flex>
        <v-flex xs6 pr-2><v-text-field label="Range" v-model="tech.range"></v-text-field></v-flex>
        <v-flex xs6><v-text-field label="Action" v-model="tech.action"></v-text-field></v-flex>
    </v-layout>
</template>
<script>
export default {
    props: ['tech'],
    methods: {
        remove: function() {
            this.$emit('remove')
        }
    }
}
</script>
<style>
    
</style>
