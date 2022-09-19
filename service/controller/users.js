import express from "express";
import db from "../database/connect.js";
import bcrypt from 'bcrypt'
import { auth } from '../middleware/auth.js'
import upload from "../middleware/multer.js";

const router = express.Router()

const saltRounds = 10;


router.get('/all-posts/:userid', async (req, res) => {
    try {
        const user = await db.Users.findByPk(req.params.userid, {
            include: db.Posts
        })
        res.json(user)
    } catch (error) {
        res.send('ivyko serverio klaida')
    }
})


router.post('/register', upload.single('profile_photo'), async (req, res) => {

    try {
        const userExists = await db.Users.findOne({
            where: {
                email: req.body.email
            }
        })
        console.log(req.body)
        if (req.file)
            req.body.profile_photo = '/uploads/' + req.file.filename
        if (userExists) {
            res.status(401).send('Toks vartotojas jau egzistuoja')
            return
        }

        req.body.password = await bcrypt.hash(req.body.password, saltRounds)
        await db.Users.create(req.body)
        console.log(req.body);
        res.send('vartotojoas sekmingai sukurtas')

    }
    catch (error) {
        console.log(error)
        res.status(400).send('registracija nepavyko')
    }
})


router.post('/login', async (req, res) => {

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

router.get("/", async (req, res) => {
    try {
        const users = await db.Users.findAll({
        });

        res.json(users);
    } catch (error) {

        res.status(500).send("Ivyko serverio klaida");
    }
});






router.get('/logout', (req, res) => {
    req.session.destroy()
    res.send('Jus sekmingai atsijungete')
})
router.get('/check-auth', auth, async (req, res) => {
    res.json(req.session.user)
})



export default router