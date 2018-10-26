<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12 md4 pa-2>
                <v-layout row wrap>
                    <v-flex xs12>
                        <h2 class="section-title">Basic Info</h2>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field label="Name" v-model="name"></v-text-field>
                        <v-select :items="types" label="Type" v-model="selectedType"></v-select>
                        <v-layout row wrap>
                            <v-flex xs10 pr-2><v-select :items="classes" label="Class" v-model="selectedClass"></v-select></v-flex>
                            <v-flex xs2> <v-text-field label="Level" type="number" v-model="level"></v-text-field></v-flex>
                        </v-layout>
                        <v-text-field label="Custom Class Name" v-model="customClassName" v-if="selectedClass == 'Custom'"></v-text-field>
                        <v-text-field label="Obsession" v-model="obsession"></v-text-field>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <h2 class="section-title">Stats</h2>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs2></v-flex>
                    <v-flex xs2>
                        <h3 class="text-xs-center">HP</h3>
                        <v-text-field type="number" v-model="hp" class="text-xs-center"></v-text-field>
                    </v-flex>
                    <v-flex xs1></v-flex>
                    <v-flex xs2>
                        <h3 class="text-xs-center">Speed</h3>
                        <v-text-field type="number" v-model="speed" class="text-xs-center"></v-text-field>
                    </v-flex>
                    <v-flex xs1></v-flex>
                    <v-flex xs2>
                        <h3 class="text-xs-center">Orgone</h3>
                        <v-text-field type="number" v-model="orgone" class="text-xs-center"></v-text-field>
                    </v-flex>
                    <v-flex xs2></v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs12>
                        <h3>Vitality</h3>
                        <v-rating v-model="vitality" empty-icon="favorite_border" full-icon="favorite" length="4" color="red darken-1" background-color=""></v-rating>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs12>
                        <h3>Sanity</h3>
                        <v-rating v-model="sanity" empty-icon="sentiment_very_dissatisfied" full-icon="sentiment_very_satisfied" length="10" color="blue lighten-1" background-color=""></v-rating>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-text-field type="number" v-model="wealth" label="Wealth"></v-text-field> 
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <h2 class="section-title">Goals</h2>
                    </v-flex>
                    <v-flex xs12>
                        <v-textarea label="Short Term" rows="2" v-model="shortTermGoals" box auto-grow="true"> </v-textarea>
                    </v-flex>
                    <v-flex xs12>
                        <v-textarea label="Long Term" v-model="longTermGoals" box auto-grow="true"> </v-textarea>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex xs12 md4 pa-2>
                <v-layout row wrap class="skills">
                    <v-flex xs11><h2 class="section-title">Skills</h2></v-flex>
                    <v-flex xs1><v-btn absolute flat icon @click="addSkill"><v-icon>add</v-icon></v-btn></v-flex>
                    <v-flex xs12 v-for="(skill, index) in skills" :key="index">
                        <v-layout row wrap>
                            <v-flex xs1><v-tooltip left nudge-top="10"><v-checkbox slot="activator" color="" v-model="skill.expertise"></v-checkbox><span>Expertise</span></v-tooltip></v-flex>
                            <v-flex xs10><v-text-field v-model="skill.skill"></v-text-field></v-flex>
                            <v-flex xs1><v-btn absolute flat icon @click="removeSkill(index)"><v-icon>remove</v-icon></v-btn></v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs11><h2 class="section-title">Languages</h2></v-flex>
                    <v-flex xs1><v-btn absolute flat icon @click="addLanguage"><v-icon>add</v-icon></v-btn></v-flex>
                    <v-flex xs12 v-for="(language, index) in languages" :key="index">
                        <v-layout row wrap>
                            <v-flex xs11><v-text-field v-model="language.value"></v-text-field></v-flex>
                            <v-flex xs1><v-btn absolute flat icon @click="removeLanguage(index)"><v-icon>remove</v-icon></v-btn></v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs11><h2 class="section-title">Feats</h2></v-flex>
                    <v-flex xs1><v-btn absolute flat icon @click="addFeat"><v-icon>add</v-icon></v-btn></v-flex>
                    <v-flex xs12 v-for="(feat, index) in feats" :key="index">
                        <v-layout row wrap>
                            <v-flex xs4 pr-2><v-text-field label="Name" v-model="feat.name"></v-text-field></v-flex>
                            <v-flex xs7><v-text-field label="Description" v-model="feat.description"></v-text-field></v-flex>
                            <v-flex xs1><v-btn absolute flat icon @click="removeFeat(index)"><v-icon>remove</v-icon></v-btn></v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex xs12 md4 pa-2>
                <v-layout row wrap>
                    <v-flex xs11><h2 class="section-title">Tricks</h2></v-flex>
                    <v-flex xs1><v-btn absolute flat icon @click="addTrick"><v-icon>add</v-icon></v-btn></v-flex>
                    <v-flex xs12 v-for="(trick, index) in tricks" :key="index">
                        <v-layout row wrap>
                            <v-flex xs11><v-text-field label="Name" v-model="trick.name"></v-text-field></v-flex>
                            <v-flex xs1 align-end><v-btn absolute flat icon @click="removeTrick(index)"><v-icon>remove</v-icon></v-btn></v-flex>
                            <v-flex xs12><v-textarea label="Description" rows="2" v-model="trick.description" box auto-grow="true"> </v-textarea></v-flex>
                            <v-flex xs6 pr-2><v-text-field label="Range" v-model="trick.range"></v-text-field></v-flex>
                            <v-flex xs6><v-text-field label="Action" v-model="trick.action"></v-text-field></v-flex>
                        </v-layout>
                        <v-divider></v-divider>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    data() {
        return {
            id: undefined,
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
                'Siren',
                'Custom'
            ],
            scienceClasses: [
                'Alchemist',
                'Graviton Ranger',
                'Mentalist',
                'Raptor',
                'Custom'
            ],
            riderClasses: [
                'Daybreaker',
                'Dragoon',
                'Reaper',
                'Swarm Master',
                'Custom'
            ],
            summonerClasses: [
                'Changeling',
                'Chosen',
                'Reanimator',
                'Tulpamancer',
                'Custom'
            ],
            selectedClass: '',
            customClassName: '',
            level: undefined,
            obsession: '',
            hp: undefined,
            speed: undefined,
            orgone: undefined,
            vitality: 4,
            sanity: 10,
            wealth: undefined,
            shortTermGoals: undefined,
            longTermGoals: undefined,
            skills: [
                {skill: '', expertise: false}
            ],
            languages: [{value: ''}],
            feats: [{name: '', description: ''}],
            tricks: [
                {
                    name: '',
                    range: '',
                    description: '',
                    action: ''
                }
            ]
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
    },
    methods: {
        addSkill: function() {
            this.skills.push({skill: '', expertise: false})
        },
        removeSkill: function(index) {
            this.skills.splice(index, 1)
        },
        addLanguage: function() {
            this.languages.push({value: ''})
        },
        removeLanguage: function(index) {
            this.languages.splice(index, 1)
        },
        addFeat: function() {
            this.feats.push({name: '', description: ''})
        },
        removeFeat: function(index) {
            this.feats.splice(index, 1)
        },
        addTrick: function() {
            this.tricks.push({
                    name: '',
                    range: '',
                    description: '',
                    action: ''
                })
        },
        removeTrick: function(index) {
            this.tricks.splice(index, 1)
        }
    }
}
</script>
<style>
    .section-title{
        margin-bottom: 10px;
        margin-top: 10px;
    }
</style>

