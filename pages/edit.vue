<template>
    <v-layout row wrap>
        <v-flex xs-12>
            <v-card>
                <v-card-title>
                    <h1>Edit Character Sheet</h1>
                </v-card-title>
                <v-card-text>
                    <character-sheet-editor/>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>
<script>
import CharacterSheetEditor from '~/components/CharacterSheetEditor.vue'
export default {
    components: {
        CharacterSheetEditor
    }
}
</script>
