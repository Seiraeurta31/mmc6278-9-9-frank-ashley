const { User } = require("../models");

async function login(req, res) {
  try {
    //take in username and password from user logging in
    const { username, password } = req.body;

    //if no match, redirect to log in page with error message
    if (!username || !password)
      return res.redirect("/login?error=must include username and password");

    //collect username and password from database per username entered  
    const user = await User.findByUsername(username);

    //validate user info was found
    if (!user)
      return res.redirect("/login?error=username or password is incorrect");

    //compare password the user entered with stored password from database  
    const passwordMatches = await User.checkPassword(password, user.password);

    //if no match, redirect to log in page with error message
    if (!passwordMatches)
      return res.redirect("/login?error=username or password is incorrect");

    //set session logegdin status to true, save the session and send to /
    req.session.isLoggedIn = true;
    req.session.userId = user.id;
    req.session.save(() => res.redirect("/private"));
  } catch (err) {
    res.status(500).send(err.message);
  }
}



async function logout(req, res) {
  req.session.destroy(() => res.redirect("/"));
}

module.exports = { login, logout };