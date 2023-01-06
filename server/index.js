import express from "express";
import posts from "./controller/posts.js";
import cors from "cors";
import session from "express-session";
import users from "./controller/users.js";
import orders from "./controller/orders.js"
// import comments from "./controller/comments.js";




const app = express();

app.use(express.urlencoded({ extendet: true }));

app.use('/uploads', express.static('uploads'))


app.use(cors());

app.use(express.json());

app.set('trust proxy', 1) // trust first proxy

app.use(session({
  secret: 'nieko nesuprantu',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 600000
  }
}))



app.use('/api/posts/', posts);

app.use('/users/', users)

app.use('/orders/', orders)


// app.use('/comments/', comments)


app.listen(3000);
