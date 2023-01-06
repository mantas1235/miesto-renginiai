import { Sequelize } from 'sequelize'
import mysql from 'mysql2/promise'
import { Users, Events, Services, Ratings, Orders } from '../model/index.js'

const database = {}
const credentials = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Renginiai'
}

try {
    const connection = await mysql.createConnection({
        host: credentials.host,
        user: credentials.user,
        password: credentials.password
    })

    await connection.query('CREATE DATABASE IF NOT EXISTS ' + credentials.database)

    const sequelize = new Sequelize(credentials.database, credentials.user, credentials.password, { dialect: 'mysql' })

    database.Users = Users(sequelize)
    database.Events = Events(sequelize)
    database.Services = Services(sequelize)
    // database.Workers = Workers(sequelize)
    database.Ratings = Ratings(sequelize)
    database.Orders = Orders(sequelize)

    // database.Events.hasOne(database.Workers)
    // database.Workers.belongsTo(database.Events)

    database.Events.hasMany(database.Services)
    database.Services.belongsTo(database.Events)

    database.Users.hasMany(database.Orders)
    database.Orders.belongsTo(database.Users)

    database.Services.hasOne(database.Orders)
    database.Orders.belongsTo(database.Services)

    database.Users.hasOne(database.Ratings)
    database.Ratings.belongsTo(database.Users)

    // database.Workers.hasMany(database.Ratings)
    // database.Ratings.belongsTo(database.Workers)

    // database.Workers.hasMany(database.Orders)
    // database.Orders.belongsTo(database.Workers)

    database.Orders.hasOne(database.Ratings)
    database.Ratings.belongsTo(database.Orders)

    await sequelize.sync({ alter: true })
} catch (error) {
    console.log(error)
    console.log('Nepavyko prisijungti prie duomenų bazės');
}

export default database