const Sequelize = require('sequelize')
const BundleModel = require('./models/bundle_model')

const sequelize = new Sequelize('bundlesdb', 'user', '1234', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

const Bundle = BundleModel(sequelize, Sequelize)
//if force:true is not commented sync will drop table then recreate
sequelize.sync(/*{force:true}*/)
  .then(() => {
    console.log(`Database & tables created!`)
  })

module.exports = Bundle