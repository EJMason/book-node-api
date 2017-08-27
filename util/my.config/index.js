require('dotenv').config()

const opts = {
  nodeEnv: process.env.NODE_ENV,
  isProd: process.env.NODE_ENV === 'production',
  PORT: process.env.PORT | 8001,

  db: {
    url: ""
  },
}

module.exports = opts