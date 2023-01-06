import Posts from "../model/posts.js";
import { Sequelize } from "sequelize";
import mysql from "mysql2/promise";
import Users from "../model/users.js";
import Orders from "../model/order.js"
// import Comments from "../model/comments.js";

const database = {};

const credent = {
  host: "localhost",
  user: "root",
  password: "",
  database: "Miesto_renginiai",
};

//SCHEMA KAIP PRISIJUNGTI PRIE SERVERIO
try {
  const connection = await mysql.createConnection({
    host: credent.host,
    user: credent.user,
    password: credent.password,
  });

  //sukuria duomenu baze
  await connection.query("CREATE DATABASE IF NOT EXISTS " + credent.database);

  const sequelize = new Sequelize(
    credent.database,
    credent.user,
    credent.password,
    { dialect: "mysql" }
  );

  database.Posts = Posts(sequelize);
  database.Users = Users(sequelize);
  database.Orders = Orders(sequelize);

  // database.Comments = Comments(sequelize);


  // database.Users.hasMany(database.Posts, {
  //   onDelete: 'RESTRICT',
  //   onUpdate: 'RESTRICT'
  // })


  database.Posts.belongsTo(database.Users)
  database.Posts.hasOne(database.Users)
  database.Users.hasMany(database.Posts)
  // database.Posts.hasMany(database.Comments)

  await sequelize.sync({ alter: true });
} catch (error) {
  console.log(error);
  console.log("Nepavyko prisijungti prie domenu bazes");
}

export default database;


