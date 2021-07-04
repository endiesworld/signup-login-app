const express = require("express") ;

const User = require("./user.js") ;
User.sync({ alter: true });


const app = express()
app.set("view engine", "pug");

app.use(express.urlencoded({ extended: true })) ;

app.get("/", (req, res) => res.render("signup")) ;

app.post("/register", async (req, res) => {
  const { email, password } = req.body ;
  const user = await User.create({ email, password }) ;
  console.log('email is: ', email) ;
  console.log('password is: ', password) ;
});


app.listen(3001, () => console.log("Server ready"))