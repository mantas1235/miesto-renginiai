import express from "express";
import db from "../database/connect.js";
import bcrypt from 'bcrypt'
import { registerValidator, loginValidator } from "../middleware/validate.js";
import { auth } from '../middleware/auth.js'

const router = express.Router()

const saltRounds = 10;



//ka daro sitas routas???

// router.get('/all-posts/:userid', async (req,res)=> {
//  try {
// 	   const user = await db.Users.findByPk(req.params.userid, {
//         include: db.Posts
//        })
//        res.json(user)
// } catch (error) {
// 	res.send ('ivyko serverio klaida')
// }
// })



// registravimosi routas

router.post('/register', registerValidator, async (req, res) => {

    try {
        const userExists = await db.Users.findOne({
            where: {
                email: req.body.email
            }
        })
        if (userExists) {
            res.status(401).send('Toks vartotojas jau egzistuoja')
            return
        }
        req.body.password = await bcrypt.hash(req.body.password, saltRounds)
        await db.Users.create(req.body)
        res.send('vartotojoas sekmingai sukurtas')
    }
    catch (error) {
        res.status(400).send('registracija nepavyko')
    }
})


//prisijungimo routas

router.post('/login', loginValidator, async (req, res) => {

    try {
        const user = await db.Users.findOne({
            where: {
                email: req.body.email
            }
        })
        if (!user)
            return res.status(401).send('Toks vartotojas nerastas')
        if (await bcrypt.compare(req.body.password, user.password)
        ) {
            req.session.loggedIn = true
            req.session.user = {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                role: user.role
            }
            res.send({ message: 'Prisijungimas pavyko', user: req.session.user })
        }
        else {
            res.status(401).send('nepavyko prisijungti')
        }
    } catch (error) {
        res.status(418)
    }
})

//atsijungimo routas
router.get('/logout', (req, res) => {
    req.session.destroy()
    res.send('Jus sekmingai atsijungete')
})


router.get('/check-auth', auth, async (req, res) => {
    res.json(req.session.user)
})



router.delete("/delete/:id", async (req, res) => {


    try {
        const user = await db.Users.findByPk(req.params.id);
        user.destroy();
        res.json({ message: "Vartotojas sėkmingai ištrintas" });
    }
    catch (error) {
        res.status(500).send("Ivyko serverio klaida");
    }

});

export default router