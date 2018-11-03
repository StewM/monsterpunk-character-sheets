# Monsterpunk Character Sheets

A simple site for character sheets for the rpg [Monsterpunk](https://gimmicklabs.blogspot.com/) built with [Nuxt.js](https://nuxtjs.org/), [Vuetify](https://vuetifyjs.com/en/), [Express](https://expressjs.com/), and [Sequelize](http://docs.sequelizejs.com/). It's essentially a Nuxt app with a simple api built in Express with Sequelize. I mainly built this to get some more experience with Nuxt. The api is slapped on in the simplest way possible at the moment to avoid needing to run it in a separate heroku instance.

This was built for my group to use in a game we are running, it's intended for a group to run their own instance of it. 

![](https://i.imgur.com/vinrFSd.png)

## Local Setup

If you want to run this on your own computer to mess around with it or contribute, you'll need to do the following.

First make sure you have a postgres server running with a database and user set up. You can check out the [postgres docs](https://www.postgresql.org/) if you don't know how to do that.

Second make sure you have Node and Yarn installed. You should be able to use npm if you want, but you may need to modify some configs. Also my yarn.lock file is included, just delete it if you want to update the dependencies yourself.

You can set your database credentials in the following environment variables otherwise it will use the defaults:
```
DBUSER //default: test
DBPASS //default: test
DBHOST //default: localhost
DBNAME //default: monsterpunk
DBPORT //default: 5432
```
If you set this enviroment variable DATABASE_URL to the full postgres connection url, it will use that over the above values. This is how heroku sets its postgres connection info.

Next you just clone the repo and do the following to get it up and running:

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run dev
```

## Heroku Setup

I personally have the app running on a free [Heroku](https://www.heroku.com/) dyno with the free postgres addon as it's more than sufficient for my group's uses, easy to set up, and free. I'd recommend you do the same.

To get this running on Heroku just set up a free app and add a free tier postgres addon to it. This can be done of the website or via their cli tool. The postgres addon should have added the DATABASE_URL environment variable. Then you'll need to set a couple more environment variables. Again this can be done either on the website or via the cli.

```
HOST: 0.0.0.0
NODE_ENV: production
NPM_CONFIG_PRODUCTION: false
API_URL: https://yourappname.herokuapp.com //this is so the frontend can know where to make the api calls to, just replace it with your url
```

Once that's done, just push up the app to heroku and it should all be ready to go. If you don't know how to do any of this, just look at the heroku docs, there's a lot of great info on how to use heroku.

## Other Notes

If you use this, thanks! If you find any bugs or have any feature suggestions, please open an issue or feel free to send a pull request if you want to contribute.

Thanks to Gimmick Labs for making such a cool RPG.

### Planned Features:
- Delete button on list of character sheets
- Character sheet view that will be a bit nicer to play from than just the form
- A DM view with stat blocks for all the characters
- Simple authentication so you can prevent people who aren't in your group from accessing the site
- The model definitions are not currently set up with migrations because I didn't have time to get that all set up right now and I'm hoping the fields on the character sheets aren't going to change. If the model definition needs to change in the future, I'll switch to a migration system and be sure to include intructions to move your data over.
