const express = require("express");
const axios = require("axios");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

var keyword;

let bearer;

let getToken = () => {
  if (!bearer) {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      auth: {
        username: 'hUCoKzWG7ZoSJNQGDkvA4ueJT',
        password: 'f439GoS0JutJs3SDzrf7FaxLvpDcEIY7imsq2NRXc04rfAlHtG'
      }
    };

    bearer = axios
      .post(
        "https://api.twitter.com/oauth2/token",
        "grant_type=client_credentials",
        config
      )
      .then(response => {
        return response.data.access_token;
      })
      .catch(error => console.log(`Something went wrong: ${error}`));
  }
  return bearer;
};

app.use(express.static(path.join(__dirname, "client/build")));


app.get("/api/search", async (req, res) => {
  const url = `https://api.twitter.com/1.1/search/tweets.json`;

  

  const token = await getToken();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {
      q: req.query.search_term,
      count: 20,
      result_type: "popular"
    }
  };
  axios
    .get(url, config)
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      console.log(`Something went wrong: ${error}`);
      res.sendStatus(500);
    });
});

app.get("/api/user", async (req, res) => {
  const url = `"https://api.twitter.com/1.1/statuses/user_timeline.json" `;

  const token = await getToken();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {
      screen_name: req.query.screen_name,
      count: 6

    }
  };
  axios
    .get(url, config)
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      console.log(`Something went wrong: ${error}`);
      res.sendStatus(500);
    });
});

app.get("/api/random", async (req, res) => {
  const url = `https://api.twitter.com/1.1/statuses/user_timeline.json`;

  const token = await getToken();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {
      screen_name: req.query.screen_name,
      count: 10
    }
  };
  axios
    .get(url, config)
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      console.log(`Something went wrong: ${error}`);
      res.sendStatus(500);
    });
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});


app.listen(port, () => console.log(`Server Started on port ${port}!`));
