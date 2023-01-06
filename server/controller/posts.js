import express from "express";
import { Op } from "sequelize";
import db from "../database/connect.js";
import { adminAuth } from '../middleware/auth.js'
import upload from "../middleware/multer.js";
import { postValidator } from "../middleware/validate.js";



const router = express.Router();

//pagrindinis Post router per kuri gaunama visa info

router.get("/", async (req, res) => {
  const options = {}
  //if (req.query.order)
  // options.order=[
  //   ['title', 'DESC']
  // ]
  try {
    const posts = await db.Posts.findAll(options);
    res.json(posts);
  } catch (error) {
    res.status(500).send("Ivyko serverio klaida");
  }
});


//gaunama vieno posto informacija

router.get("/:id", async (req, res) => {

  try {
    const post = await db.Posts.findByPk(req.params.id);
    res.json(post);
  } catch (error) {
    res.status(500).send("Ivyko serverio klaida");

  }
})

//sukuria nauja irasa duomenu bazeje su nuotrauka
router.post("/new", adminAuth, upload.single('image'), async (req, res) => {
  try {
    if (req.file)
      req.body.image = '/uploads/' + req.file.filename
    new db.Posts(req.body).save();
    res.json({ message: "Irasas sekmingai sukurtas" });
  } catch (error) {
    res.status(500).send("Ivyko serverio klaida");
  }

});

//ka daro sitas?

// router.get("/userpost/:id", async (req, res) => {
//   try {
//     const post = await db.Posts.findByPk(req.params.id, {
//       include: db.Users
//     });
//     res.json(post);
//   } catch (error) {
//     res.status(500).send( "Ivyko serverio klaida" );

//   }

// });


// paieskos route'as
router.get('/search/:keyword', async (req, res) => {
  try {
    const posts = await db.Posts.findAll({
      where: {
        title: {
          [Op.like]: '%' + req.params.keyword + '%'
        }
      }
    })
    res.json(posts)
  } catch (error) {
    res.status(500).send('Ivyko serverio klaida')
  }
})



//redagavimo routas pagal id

router.put("/edit/:id", adminAuth, upload.single('image'), async (req, res) => {

  try {
    if (req.file.image)
      req.body.image = req.file.image

    const post = await db.Posts.findByPk(req.params.id);
    post.update(req.body);
    res.json({ message: "Irasas sekmingai atnaujintas" });

  }

  catch (error) {
    res.status(500).send("Ivyko serverio klaida");
  }

});


//istrynimo routas

router.delete("/delete/:id", adminAuth, async (req, res) => {


  try {
    const post = await db.Posts.findByPk(req.params.id);
    post.destroy();
    res.json({ message: "irasas sekmingai istrintas" });
  }
  catch (error) {
    res.status(500).send("Ivyko serverio klaida");
  }

});

export default router;

