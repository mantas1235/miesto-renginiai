import express from 'express'
import db from '../database/connect.js'
import { eventsValidator } from '../middleware/validate.js'
import { adminAuth } from '../middleware/auth.js'

const Router = express.Router()

Router.get('/', async (req, res) => {
    const options = {}

    if (req.query.sort === '1') {
        options.order = [
            ['name', 'ASC']
        ]
    }

    if (req.query.sort === '2') {
        options.order = [
            ['name', 'DESC']
        ]
    }

    try {
        const events = await db.Events.findAll(options)
        res.json(events)
    } catch (error) {
        console.log(error)
        res.status(500).send('Įvyko klaida')
    }
})

Router.get('/single/:id', adminAuth, async (req, res) => {
    try {
        const events = await db.Events.findByPk(req.params.id)
        res.json(Eventsloon)
    } catch (error) {
        console.log(error)
        res.status(500).send('Įvyko klaida išssaugant duomenis')
    }
})

Router.post('/new', async (req, res) => {
    try {
        await db.Events.create(req.body)
        res.send('Salonas sėkmingai sukurtas')
    } catch (error) {
        console.log(error)
        res.status(500).send('Įvyko klaida išssaugant duomenis')
    }
})

Router.put('/edit/:id', adminAuth, eventsValidator, async (req, res) => {
    try {
        const Events = await db.Events.findByPk(req.params.id)
        await Events.update(req.body)
        res.send('Salonas sėkmingai atnaujintas')
    } catch (error) {
        console.log(error)
        res.status(500).send('Įvyko klaida išssaugant duomenis')
    }
})

Router.delete('/delete/:id', adminAuth, async (req, res) => {
    try {
        const Events = await db.Events.findByPk(req.params.id)
        await Events.destroy()
        res.send('Salonas sėkmingai ištrintas')
    } catch (error) {
        console.log(error)
        res.status(500).send('Įvyko klaida')
    }
})

export default Router