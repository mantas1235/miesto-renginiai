import express from "express";
import { auth } from "../middleware/auth.js";
import { commentValidator } from "../middleware/validate.js";
import db from '../database/connect.js'


const Router = express.Router()



Router.post('/', auth, commentValidator, async (req, res) => {
    try {
        await db.Comments.create(req.body)
        res.send('komentaras isssaugotas')
    } catch (error) {
        console.log(error)
        res.status(500).send('ivyko serverio klaida')
    }
})


export default Router