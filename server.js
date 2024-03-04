const express = require("express");
const cors = require("cors");
const { auth } = require("express-openid-connect");

const app = express();
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: "a long, randomly-generated string stored in env",
  baseURL: "http://localhost:3000",
  clientID: "i4ObrgAsWsM7n1JUiOtp8AxTu6qQT7oM",
  issuerBaseURL: "https://dev-xvv0pvrqkgxsikp3.us.auth0.com",
};
const { requiresAuth } = require("express-openid-connect");

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(cors());
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  if (req.oidc.isAuthenticated()) {
    res.send(JSON.stringify(req.oidc.user));
  } else {
    res.status(401).send("User is not authenticated");
  }
});

app.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
