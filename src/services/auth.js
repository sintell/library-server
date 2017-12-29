import passport from 'koa-passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as AtlassianStrategy } from 'passport-atlassian';
import UserService from './user';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const us = new UserService();
  try {
    const user = await us.getUserById(id);
    done(null, user);
  } catch (error) {
    console.error(error);
    done(error);
  }
});


passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  const us = new UserService();
  try {
    const user = await us.create({ email });
    done(null, user);
  } catch (error) {
    console.error(error);
    done(error);
  }
}));

passport.use(new AtlassianStrategy({
  applicationURL: 'jira.hh.ru',
  callbackURL: 'http://localhost:3000/api/auth/atlassian-oauth/callback', // TODO: use real url
  consumerKey: 'randomkey',
  consumerSecret: 'randomsecret',
}, async (token, tokenSecret, profile, done) => {
  const us = new UserService();
  try {
    const user = await us.create({ email: profile.email })
      .saveOrUpdate();
    done(null, user);
  } catch (error) {
    console.error(error);
    done(error);
  }
}));
