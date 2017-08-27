
const opts = {
  nodeEnv: process.env.NODE_ENV,
  isProd: process.env.NODE_ENV === 'production',
  PORT: process.env.PORT,

  db: {
    url: ""
  }
}

module.exports = opts