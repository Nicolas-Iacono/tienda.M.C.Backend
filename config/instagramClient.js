const Instagram = require('instagram-web-api');
const dotenv = require('dotenv');

dotenv.config({
    path: process.env.NODE_ENV === 'production' 
        ? '.env.production' 
        : '.env.development'
});

const instagramClient = new Instagram({
    username: process.env.INSTAGRAM_USERNAME,
    password: process.env.INSTAGRAM_PASSWORD
});

module.exports = instagramClient;
