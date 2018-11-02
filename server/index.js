
const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
const Sequelize = require('sequelize')
const dburl = process.env.DATABASE_URL || false
const pguser = process.env.DBUSER || 'test'
const pgpass = process.env.DBPASS || 'test'
const pghost = process.env.DBHOST || 'localhost'
const pgdb = process.env.DBNAME || 'monsterpunk'
const pgport = process.env.DBPORT || '5432'
let url = ''

if(dburl != false) {
  url = dburl
} else {
  url = 'postgres://'+pguser+':'+pgpass+'@'+pghost+':'+pgport+'/'+pgdb
}

const sequelize = new Sequelize(url)

const env = process.env.NODE_ENV

const CharacterSheet = sequelize.define('character_sheet', {
  id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: Sequelize.STRING},
  type: {type: Sequelize.STRING},
  class: {type: Sequelize.STRING},
  custom_class: {type: Sequelize.STRING},
  level: {type: Sequelize.INTEGER},
  obsession: {type: Sequelize.STRING},
  hp: {type: Sequelize.INTEGER},
  speed: {type: Sequelize.INTEGER},
  orgone: {type: Sequelize.INTEGER},
  wealth: {type: Sequelize.INTEGER},
  short_term_goals: {type: Sequelize.TEXT},
  long_term_goals: {type: Sequelize.TEXT},
  skills: {type: Sequelize.JSON},
  languages: {type: Sequelize.JSON},
  feats: {type: Sequelize.JSON},
  tricks: {type: Sequelize.JSON},
  basics: {type: Sequelize.JSON},
  advanced: {type: Sequelize.JSON},
  supports: {type: Sequelize.JSON},
  limits: {type: Sequelize.JSON},
  monster_name: {type: Sequelize.STRING},
  monster_class: {type: Sequelize.STRING},
  monster_hp: {type: Sequelize.INTEGER},
  monster_speed: {type: Sequelize.INTEGER},
  monster_feats: {type: Sequelize.JSON},
  monster_basics: {type: Sequelize.JSON},
  monster_supports: {type: Sequelize.JSON},
  character_desc: {type: Sequelize.TEXT},
  monster_desc: {type: Sequelize.TEXT},
  equipment: {type: Sequelize.JSON},
  friends_and_foes: {type: Sequelize.JSON},
  notes: {type: Sequelize.TEXT}
})

sequelize.sync()

function saveSheet(sheet, data, res) {
  sheet.name = data.name
  sheet.type = data.selectedType
  sheet.class = data.selectedClass
  sheet.custom_class = data.customClassName
  sheet.level = data.level
  sheet.obsession = data.obsession
  sheet.hp = data.hp
  sheet.speed = data.speed
  sheet.orgone = data.orgone
  sheet.wealth = data.wealth
  sheet.short_term_goals = data.shortTermGoals
  sheet.long_term_goals = data.longTermGoals
  sheet.skills = data.skills
  sheet.languages = data.languages
  sheet.feats = data.feats
  sheet.tricks = data.tricks
  sheet.basics = data.basics
  sheet.advanced = data.advanced
  sheet.supports = data.supports
  sheet.limits = data.limits
  sheet.monster_name = data.monsterName
  sheet.monster_class = data.monsterClass
  sheet.monster_hp = data.monsterHP
  sheet.monster_speed = data.monsterSpeed
  sheet.monster_feats = data.monsterFeats
  sheet.monster_basics = data.monsterBasics
  sheet.monster_supports = data.monsterSupports
  sheet.character_desc = data.characterDescription
  sheet.monster_desc = data.monsterDescription
  sheet.equipment = data.equipment
  sheet.friends_and_foes = data.friendsAndFoes
  sheet.notes = data.notes

  sheet.save().then(saved => { res.json(saved.id)})
}

app.set('port', port)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // set up CORS so my post will work
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
  })

  app.use(express.json())
  app.use(express.urlencoded())

  // get all character sheets for index
  app.get('/api/character-sheets', (req, res) => {
    CharacterSheet.findAll().then(sheets => {
      res.json(sheets)
    })
  })

  // get specific character sheet
  app.get('/api/character-sheet', (req, res) => {
    let params = req.query

    CharacterSheet.findById(params.id).then(sheet => {
      res.json(sheet)
    })
  })

  // post character sheet
  app.post('/api/character-sheet', (req, res) => {
    let data = req.body
    let id = ''

    if(data.id){
      CharacterSheet.findById(data.id).then(sheet => {
        saveSheet(sheet, data, res)
      })
    } else {
      let sheet = CharacterSheet.build()
      saveSheet(sheet, data, res)
    }
  })

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
