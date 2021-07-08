const express = require("express") ;

const passport = require('passport') ;
const session = require('express-session') ;
const SequelizeStore = require('connect-session-sequelize')(session.Store) ;
const LocalStrategy = require('passport-local').Strategy ;
const sequelize = require('./database.js');
const User = require("./user.js") ;
User.sync({ alter: true });

//require('passport') ;

require('dotenv').config() ;

//database initialization section


//initialize sequelizestore which connects session to sequelize database. This process prepares and generates a session table in our postgres database
const sessionStore = new SequelizeStore({
  db: sequelize,
})
sessionStore.sync() ;

const app = express()
app.set("view engine", "pug");
//app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true })) ;

/**
 * add middlewares to express in this order:
 * app.use(session);
 * app.use(passport.initialize())
 * app.use(passport.session())
 */
app.use(
  session({
    secret: process.env.SESSION_SECRETE, //enter a random string here
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

async function verifyCallback (email, password, done){
    const user =  await User.findOne({where:{email:email}}) ;
    if(!user){
        return done('User not found', null) ;
    }

    const isPasswordValid = await user.checkPassword(password) ;
    if (!isPasswordValid) {
        done("Email and password do not match", null)
        return
    }

    done(null, user)
}

const localStrategy = new LocalStrategy(
    {
        usernameField: "email",
        passwordField: "password",
    },
    verifyCallback) ;



passport.serializeUser((user, done) => {
  done(null, user.email)
})

passport.deserializeUser((email, done) => {
  User.findOne({ where: { email: email } }).then((user) => {
    done(null, user)
  })
})

passport.use(localStrategy) ;

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