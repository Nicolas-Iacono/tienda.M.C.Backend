// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const { User } = require('../models');

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findByPk(id);
//     done(null, user);
//   } catch (error) {
//     done(error, null);
//   }
// });

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: '/auth/google/callback',
//       scope: ['profile', 'email']
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         // Buscar si el usuario ya existe
//         let user = await User.findOne({ where: { googleId: profile.id } });

//         if (!user) {
//           // Si no existe, crear un nuevo usuario
//           user = await User.create({
//             googleId: profile.id,
//             email: profile.emails[0].value,
//             name: profile.displayName,
//             // Puedes agregar más campos según tu modelo de usuario
//           });
//         }

//         return done(null, user);
//       } catch (error) {
//         return done(error, null);
//       }
//     }
//   )
// );
