const passport = require('passport') ;
const LocalStrategy = require('passport-local').Strategy ;
const User = require("./user.js") ;

console.log('passport initialization...') ;

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