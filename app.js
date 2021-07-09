const express = require("express") ;

const passport = require('passport') ;
const session = require('express-session') ;
const SequelizeStore = require('connect-session-sequelize')(session.Store) ;
const sequelize = require('./database.js');
const User = require("./user.js") ;
const passportConfig = require('./passport.js') ;

require('dotenv').config() ;

/**
 * initialize sequelizestore which connects session to sequelize database.
 *This process prepares and generates a session table in our postgres database
*/
const sessionStore = new SequelizeStore({
  db: sequelize,
})
User.sync({ alter: true });
sessionStore.sync() ;

const app = express()
app.set("view engine", "pug");
app.use(express.urlencoded({ extended: true })) ;
passportConfig() ;


app.use(
  session({
    secret: process.env.SESSION_SECRETE, 
    resave: false,
    saveUninitialized: true,
    name: 'testingpassport',
    cookie: {
      secure: false, //CRITICAL on localhost
      maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    },
    store: sessionStore,
  }),
  passport.initialize(),
  passport.session()
);



app.get('/', (req, res) =>
  req.session.passport ? res.render('index') : res.render('signup')
)

app.post("/register", async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.create({ email, password })

    req.login(user, (err) => {
      if (err) return res.render("error", { message: err })
      return res.redirect("/")
    })
  } catch (error) {
    res.statusCode = 500
    let message = "An error occurred"
    if (error.name === "SequelizeUniqueConstraintError") {
      message = "User already exists. Use login instead."
    }
    res.render("error", { message })
  }
});

app.get("/login", (req, res) =>{
  console.log('login session') ;
  return req.session.passport ? res.render("index") : res.render("login")}
);

app.post('/login', async (req, res) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return res.render('error', { message: err })
    if (!user) return res.render('error', { message: 'No user matching credentials' })

    req.login(user, (err) => {
      if (err) return res.render('error', { message: err })
      return res.redirect('/')
    })
  })(req, res)
})

app.get("/logout", async (req, res) => {
  req.logout()
  req.session.destroy()
  return res.redirect("/")
})


app.listen(3000, () => console.log("Server ready"))