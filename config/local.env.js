'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
module.exports = merge(prodEnv, {
    NODE_ENV: '"local"',
    BASE_URL: '"/"',
    // API_URL: '"http://10.115.40.155:8096/"',
    API_URL: '"http://localhost:8899/"',
    PAGE_SIZE: 30,
    DATETIME_FORMAT: '"HH:mm DD/MM/YYYY"',
    DATE_FORMAT: '"DD/MM/YYYY"',
    TIME_FORMAT: '"HH:mm"',
    GOOGLE_CAPTCHA_SITE_KEY: '"6Le-TpgUAAAAAFuVBMGirRLgBR9WmzuyYeB5Fu3b"',
    AppVersion: '"21102022"'
})

