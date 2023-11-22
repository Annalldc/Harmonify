const express = require('express');
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;

const app = express();

app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new SpotifyStrategy(
      {
        clientID: 'SEU_CLIENT_ID',
        clientSecret: 'SEU_CLIENT_SECRET',
        callbackURL: 'http://localhost:3000/callback', // Substitua pela sua URL real de retorno
      },
      function (accessToken, refreshToken, expires_in, profile, done) {
        // Aqui você pode realizar operações com o accessToken, por exemplo, fazer chamadas à API do Spotify
        return done(null, profile);
      }
    )
  );