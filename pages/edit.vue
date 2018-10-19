<template>
    <v-layout row wrap>
        <v-flex xs-12>
            <v-card>
                <v-card-title>
                    <h1>Test</h1>
                </v-card-title>
                <v-card-text>
                    <character-sheet/>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>
<script>
import CharacterSheet from '~/components/CharacterSheet.vue'
export default {
    components: {
        CharacterSheet
    }
}
</script>
