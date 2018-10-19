<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12 md4>
                <v-text-field label="Name" v-model="name"></v-text-field>
                <v-select :items="types" label="Type" v-model="selectedType"></v-select>
                <v-select :items="classes" label="Class" v-model="selectedClass"></v-select>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    data() {
        return {
            name: '',
            types: [
                'Gestalt',
                'Science',
                'Rider',
                'Summoner'
            ],
            selectedType: '',
            gestaltClasses: [
                'Blood Knight',
                'Elementalist',
                'Predator',
                'Siren'
            ],
            scienceClasses: [
                'Alchemist',
                'Graviton Ranger',
                'Mentalist',
                'Raptor'
            ],
            riderClasses: [
                'Daybreaker',
                'Dragoon',
                'Reaper',
                'Swarm Master'
            ],
            summonerClasses: [
                'Changeling',
                'Chosen',
                'Reanimator',
                'Tulpamancer'
            ],
            selectedClass: ''
        }
    },
    computed: {
        classes: function() {
            switch(this.selectedType) {
                case 'Gestalt':
                    this.selectedClass = ''
                    return this.gestaltClasses
                    break
                case 'Science':
                    this.selectedClass = ''
                    return this.scienceClasses
                    break
                case 'Rider':
                    this.selectedClass = ''
                    return this.riderClasses
                    break
                case 'Summoner':
                    this.selectedClass = ''
                    return this.summonerClasses
                    break
            }
        }
    }
}
</script>
