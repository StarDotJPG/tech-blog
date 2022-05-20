const express = require("express");
const session = require("express-session");

const exphbs = require("express-handlebars");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const path = require("path");

const hbs = exphbs.create();

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'ultra secret',
    cookie: { sameSite: 'strict' },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));
app.use(routes);

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
