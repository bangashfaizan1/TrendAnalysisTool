import React, { useState } from "react";
import SportsBaseballIcon from "@material-ui/icons/SportsBaseball";
import SportsBasketballIcon from "@material-ui/icons/SportsBasketball";
import SportsSoccerIcon from "@material-ui/icons/SportsSoccer";
import SportsHockeyIcon from "@material-ui/icons/SportsHockey";
import SportsFootballIcon from "@material-ui/icons/SportsFootball";
import faizan from "./assets/faizan.jpg";
import Header from "./Header";
import Tweet from "./Tweet";
import axios from "axios";
import "./Random.css";

const Random = () => {
  const [screenName, setScreenName] = useState([]);

  const iconStyle = {
    color: "var(--primary)",
    fontSize: "100px",
    border: "2px solid var(--primary)",
    borderRadius: "10px",
    margin: "2%"
  };

  const handleClick = e => {
    e.preventDefault();
    const { name } = e.target;

    axios
      .get(`/api/random?screen_name=${name}`)
      .then(response => setScreenName(response.data))
      .catch(error => {
        console.log(`Something is wrong: ${error}`);
      });
  };

  let randomUserTweets = screenName.map(tweet => (
    <Tweet
      key={tweet.id}
      created={tweet.created_at}
      img={tweet.user.profile_image_url}
      name={tweet.user.name}
      screen_name={tweet.user.screen_name}
      text={tweet.text}
      retweet={tweet.retweet_count}
      favorite={tweet.favorite_count}
    />
  ));

  return (
    <>
      <Header />
      <h1 className="random-header">Favorite Users</h1>
      <p className="random-header-p">
        Click search to show tweets from your favorite
      </p>
      <section>
        <div>
          <p className="screen-name">@terajaaanu</p>
          <button id="random-btn" name="terajaaanu" onClick={handleClick}>
            Search Tweets
          </button>
        </div>
        <div>
          <p className="screen-name">@NBA</p>
          <button id="random-btn" name="nba" onClick={handleClick}>
            Search Tweets
          </button>
        </div>
        <div>
          <p className="screen-name">@Elon Musk</p>
          <button id="random-btn" name="elonmusk" onClick={handleClick}>
            Search Tweets
          </button>
        </div>
        <div>
          <p className="screen-name">@Donald Trump</p>
          <button id="random-btn" name="realDonaldTrump" onClick={handleClick}>
            Search Tweets
          </button>
        </div>
        <div>
          <p className="screen-name">@HoopCentral</p>
          <button id="random-btn" name="TheHoopCentral" onClick={handleClick}>
            Search Tweets
          </button>
        </div>
      </section>
      <div className="tweet-card">{randomUserTweets}</div>
    </>
  );
};

export default Random;
