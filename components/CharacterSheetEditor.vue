<template>
    <div>
        <v-tabs v-model="activeTab" fixed-tabs>
            <v-tab :key="1">
                Basic Info
            </v-tab>
            <v-tab :key="2">
                Techs
            </v-tab>
            <v-tab :key="3">
                Monster/Misc
            </v-tab>
            <v-tab-item :key="1">
                <v-container>
                    <v-layout row wrap>
                        <v-flex xs12 md6 pa-2>
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
                                    <v-textarea label="Short Term" rows="2" v-model="shortTermGoals" box auto-grow> </v-textarea>
                                </v-flex>
                                <v-flex xs12>
                                    <v-textarea label="Long Term" v-model="longTermGoals" box auto-grow> </v-textarea>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex xs12 md6 pa-2>
                            <v-layout row wrap class="skills">
                                <v-flex xs11><h2 class="section-title">Skills</h2></v-flex>
                                <v-flex xs1><v-btn absolute flat icon @click="addSkill"><v-icon>add</v-icon></v-btn></v-flex>
                                <v-flex xs12 v-for="(skill, index) in skills" :key="index">
                                    <v-layout row wrap>
                                        <v-flex xs1><v-tooltip left nudge-top="10"><v-checkbox slot="activator" color="" v-model="skill.expertise"></v-checkbox><span>Expertise</span></v-tooltip></v-flex>
                                        <v-flex xs10><v-text-field v-model="skill.skill"></v-text-field></v-flex>
                                        <v-flex xs1><v-btn absolute flat icon @click="removeItem('skills', index)"><v-icon>remove</v-icon></v-btn></v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                            <v-divider></v-divider>
                            <v-layout row wrap>
                                <v-flex xs11><h2 class="section-title">Languages</h2></v-flex>
                                <v-flex xs1><v-btn absolute flat icon @click="addString('languages')"><v-icon>add</v-icon></v-btn></v-flex>
                                <v-flex xs12 v-for="(language, index) in languages" :key="index">
                                    <v-layout row wrap>
                                        <v-flex xs11><v-text-field v-model="language.value"></v-text-field></v-flex>
                                        <v-flex xs1><v-btn absolute flat icon @click="removeItem('languages', index)"><v-icon>remove</v-icon></v-btn></v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                            <v-divider></v-divider>
                            <v-layout row wrap>
                                <v-flex xs11><h2 class="section-title">Feats</h2></v-flex>
                                <v-flex xs1><v-btn absolute flat icon @click="addFeat('feats')"><v-icon>add</v-icon></v-btn></v-flex>
                                <v-flex xs12 v-for="(feat, index) in feats" :key="index">
                                    <v-layout row wrap>
                                        <v-flex xs4 pr-2><v-text-field label="Name" v-model="feat.name"></v-text-field></v-flex>
                                        <v-flex xs7><v-text-field label="Description" v-model="feat.description"></v-text-field></v-flex>
                                        <v-flex xs1><v-btn absolute flat icon @click="removeItem('feats', index)"><v-icon>remove</v-icon></v-btn></v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-tab-item>
            <v-tab-item :key="2">
                <v-container>
                    <v-layout row wrap>
                        <v-flex xs12 md4 pa-2>
                            <v-layout row wrap pa-2>
                                <v-flex xs11><h2 class="section-title">Tricks</h2></v-flex>
                                <v-flex xs1><v-btn absolute flat icon @click="addTech('tricks')"><v-icon>add</v-icon></v-btn></v-flex>
                                <v-flex xs12 v-for="(trick, index) in tricks" :key="index">
                                    <tech-editor :tech="trick" @remove="removeItem('tricks', index)" />
                                    <v-divider></v-divider>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap pa-2>
                                <v-flex xs11><h2 class="section-title">Support Tech</h2></v-flex>
                                <v-flex xs1><v-btn absolute flat icon @click="addTech('supports')"><v-icon>add</v-icon></v-btn></v-flex>
                                <v-flex xs12 v-for="(support, index) in supports" :key="index">
                                    <tech-editor :tech="support" @remove="removeItem('supports', index)" />
                                    <v-divider></v-divider>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap pa-2>
                                <v-flex xs11><h2 class="section-title">Limit Tech</h2></v-flex>
                                <v-flex xs1><v-btn absolute flat icon @click="addTech('limits')"><v-icon>add</v-icon></v-btn></v-flex>
                                <v-flex xs12 v-for="(limit, index) in limits" :key="index">
                                    <tech-editor :tech="limit" @remove="removeItem('limits', index)" />
                                    <v-divider></v-divider>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex xs12 md4 pa-2>
                            <v-layout row wrap pa-2>
                                <v-flex xs11><h2 class="section-title">Basic Tech</h2></v-flex>
                                <v-flex xs1><v-btn absolute flat icon @click="addCombatTech('basics')"><v-icon>add</v-icon></v-btn></v-flex>
                                <v-flex xs12 v-for="(basic, index) in basics" :key="index">
                                    <combat-tech-editor :tech="basic" @remove="removeItem('basics', index)" />
                                    <v-divider></v-divider>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex xs12 md4 pa-2>
                            <v-layout row wrap pa-2>
                                <v-flex xs11><h2 class="section-title">Advanced Tech</h2></v-flex>
                                <v-flex xs1><v-btn absolute flat icon @click="addCombatTech('advanced')"><v-icon>add</v-icon></v-btn></v-flex>
                                <v-flex xs12 v-for="(advancedTech, index) in advanced" :key="index">
                                    <combat-tech-editor :tech="advancedTech" @remove="removeItem('advanced', index)" />
                                    <v-divider></v-divider>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-tab-item>
            <v-tab-item :key="3">
                <v-container>
                    <v-layout row wrap>
                        <v-flex xs12 md4 pa-2 v-if="hasMonster">
                            <div>
                                <v-layout row wrap>
                                    <v-flex xs12>
                                        <h2 class="section-title">Monster Info</h2>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field label="Name" v-model="monsterName"></v-text-field>
                                        <v-text-field label="Class" v-model="monsterClass"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-textarea label="Description" v-model="monsterDescription" box auto-grow="true"> </v-textarea>
                                    </v-flex>
                                </v-layout>
                                <v-layout row wrap v-if="selectedType != 'Gestalt'">
                                    <v-flex xs2 offset-xs3>
                                        <h3 class="text-xs-center">HP</h3>
                                        <v-text-field type="number" v-model="monsterHP" class="text-xs-center"></v-text-field>
                                    </v-flex>
                                    <v-flex xs2 offset-xs2>
                                        <h3 class="text-xs-center">Speed</h3>
                                        <v-text-field type="number" v-model="monsterSpeed" class="text-xs-center"></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-divider></v-divider>
                                <v-layout row wrap>
                                    <v-flex xs11><h2 class="section-title">Feats</h2></v-flex>
                                    <v-flex xs1><v-btn absolute flat icon @click="addFeat('monsterFeats')"><v-icon>add</v-icon></v-btn></v-flex>
                                    <v-flex xs12 v-for="(feat, index) in monsterFeats" :key="index">
                                        <v-layout row wrap>
                                            <v-flex xs4 pr-2><v-text-field label="Name" v-model="feat.name"></v-text-field></v-flex>
                                            <v-flex xs7><v-text-field label="Description" v-model="feat.description"></v-text-field></v-flex>
                                            <v-flex xs1><v-btn absolute flat icon @click="removeItem('monsterFeats', index)"><v-icon>remove</v-icon></v-btn></v-flex>
                                        </v-layout>
                                    </v-flex>
                                </v-layout>
                                <v-divider></v-divider>
                                <v-layout row wrap>
                                    <v-flex xs11><h2 class="section-title">Basic Tech</h2></v-flex>
                                    <v-flex xs1><v-btn absolute flat icon @click="addCombatTech('monsterBasics')"><v-icon>add</v-icon></v-btn></v-flex>
                                    <v-flex xs12 v-for="(basic, index) in monsterBasics" :key="index">
                                        <combat-tech-editor :tech="basic" @remove="removeItem('monsterBasics', index)" />
                                        <v-divider></v-divider>
                                    </v-flex>
                                </v-layout>
                                <v-layout row wrap>
                                    <v-flex xs11><h2 class="section-title">Support Tech</h2></v-flex>
                                    <v-flex xs1><v-btn absolute flat icon @click="addTech('monsterSupports')"><v-icon>add</v-icon></v-btn></v-flex>
                                    <v-flex xs12 v-for="(support, index) in monsterSupports" :key="index">
                                        <tech-editor :tech="support" @remove="removeItem('monsterSupports', index)" />
                                        <v-divider></v-divider>
                                    </v-flex>
                                </v-layout>
                            </div>
                        </v-flex>
                        <v-flex xs12 v-bind:md4="hasMonster" v-bind:md6="!hasMonster" pa-2>
                            <v-layout row wrap>
                                <v-flex xs11><h2 class="section-title">Equipment</h2></v-flex>
                                <v-flex xs1><v-btn absolute flat icon @click="addString('equipment')"><v-icon>add</v-icon></v-btn></v-flex>
                                <v-flex xs12 v-for="(eq, index) in equipment" :key="index">
                                    <v-layout row wrap>
                                        <v-flex xs11><v-text-field v-model="eq.value"></v-text-field></v-flex>
                                        <v-flex xs1><v-btn absolute flat icon @click="removeItem('equipment', index)"><v-icon>remove</v-icon></v-btn></v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                            <v-divider></v-divider>
                            <v-layout row wrap>
                                <v-flex xs11><h2 class="section-title">Friends And Foes</h2></v-flex>
                                <v-flex xs1><v-btn absolute flat icon @click="addString('friendsAndFoes')"><v-icon>add</v-icon></v-btn></v-flex>
                                <v-flex xs12 v-for="(faf, index) in friendsAndFoes" :key="index">
                                    <v-layout row wrap>
                                        <v-flex xs11><v-text-field v-model="faf.value"></v-text-field></v-flex>
                                        <v-flex xs1><v-btn absolute flat icon @click="removeItem('friendsAndFoes', index)"><v-icon>remove</v-icon></v-btn></v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex xs12 v-bind:md4="hasMonster" v-bind:md6="!hasMonster" pa-2>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <h2 class="section-title">Character Description</h2>
                                </v-flex>
                                <v-flex xs12>
                                    <v-textarea v-model="characterDescription" box auto-grow="true"> </v-textarea>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <h2 class="section-title">Notes</h2>
                                </v-flex>
                                <v-flex xs12>
                                    <v-textarea v-model="notes" box auto-grow="true"> </v-textarea>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-tab-item>
        </v-tabs>
        <v-btn @click="submit">save</v-btn>
    </div>
</template>
<script>
import CombatTechEditor from '~/components/CombatTechEditor.vue'
import TechEditor from '~/components/TechEditor.vue'
export default {
    components: {
        CombatTechEditor,
        TechEditor
    },
    data() {
        return {
            saving: false,
            activeTab: "1",
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
            ],
            basics: [
                {
                    name: '',
                    range: '',
                    action: '',
                    targeting: '',
                    drawback: '',
                    base: '',
                    bonus1: '',
                    bonus2: '',
                    bonus3: ''
                }
            ],
            advanced: [
                {
                   name: '',
                    range: '',
                    action: '',
                    targeting: '',
                    drawback: '',
                    base: '',
                    bonus1: '',
                    bonus2: '',
                    bonus3: '' 
                }
            ],
            supports: [
                {
                    name: '',
                    range: '',
                    description: '',
                    action: ''
                }
            ],
            limits: [
                {
                    name: '',
                    range: '',
                    description: '',
                    action: ''
                }
            ],
            monsterName: '',
            monsterClass: '',
            monsterHP: undefined,
            monsterSpeed: undefined,
            monsterFeats: [],
            monsterBasics: [],
            monsterSupports: [],
            characterDescription: '',
            monsterDescription: '',
            equipment: [{value:''}],
            friendsAndFoes: [{value:''}],
            notes: '',
            tempSelectedClass: ''
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
        },
        hasMonster: function() {
            return (this.selectedType != 'Science' && this.selectedType != '')
        },
        submitText: function () {
            if(this.saving){
                return "saving"
            }
            return "save"
        }
    },
    methods: {
        addSkill: function() {
            this.skills.push({skill: '', expertise: false})
        },
        addString: function(listName) {
            this[listName].push({value: ''})
        },
        addFeat: function(listName) {
            this[listName].push({name: '', description: ''})
        },
        addTech: function(listName) {
            this[listName].push({
                    name: '',
                    range: '',
                    description: '',
                    action: ''
                })
        },
        addCombatTech: function(listName) {
            this[listName].push({
                    name: '',
                    range: '',
                    action: '',
                    targeting: '',
                    drawback: '',
                    base: '',
                    bonus1: '',
                    bonus2: '',
                    bonus3: ''
                })
        },
        removeItem: function(listName, index) {
            this[listName].splice(index, 1)
        },
        submit: function() {
            this.saving = true
            this.$axios.post('/api/character-sheet', this.$data).then((response) => {
                this.id = response.data
                this.saving = false
            })
        }
    },
    mounted: function () {
        if(this.$route.query.id){
            this.$axios.get('/api/character-sheet', {
                params: {
                    id: this.$route.query.id
                }
            }).then((response) => {
                let data = response.data
                if(data){
                    this.id = data.id
                    this.name = data.name
                    this.selectedType = data.type
                    this.selectedClass = data.class
                    this.tempSelectedClass = data.class
                    this.customClassName = data.custom_class
                    this.level = data.level
                    this.obsession = data.obsession
                    this.hp = data.hp
                    this.speed = data.speed
                    this.orgone = data.orgone
                    this.wealth = data.wealth
                    this.shortTermGoals = data.short_term_goals
                    this.longTermGoals = data.long_term_goals
                    this.skills = data.skills
                    this.languages = data.languages
                    this.feats = data.feats
                    this.tricks = data.tricks
                    this.basics = data.basics
                    this.advanced = data.advanced
                    this.supports = data.supports
                    this.limits = data.limits
                    this.monsterName = data.monster_name
                    this.monsterClass = data.monster_class
                    this.monsterHP = data.monster_hp
                    this.monsterSpeed  = data.monster_speed
                    this.monsterFeats = data.monster_feats
                    this.monsterBasics = data.monster_basics
                    this.monsterSupports = data.monster_supports
                    this.characterDescription = data.character_desc
                    this.monsterDescription = data.monster_desc
                    this.equipment = data.equipment
                    this.friendsAndFoes = data.friends_and_foes
                    this.notes = data.notes
                }
            })
        }
    },
    updated: function() {
        if(this.tempSelectedClass != ''){
            this.selectedClass = this.tempSelectedClass
            this.tempSelectedClass = ''
        }
    }
}
</script>
<style>
    .section-title{
        margin-bottom: 10px;
        margin-top: 10px;
    }
    .theme--dark.primary--text {
        color: #ffffff !important;
        caret-color: #ffffff !important;
    }
    .theme--dark .v-tabs__slider {
        background-color: #fff !important;
        border-color: #fff !important;
    }
</style>

