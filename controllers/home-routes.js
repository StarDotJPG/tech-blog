const { Post } = require("../models");
const { User } = require("../models")

const router = require("express").Router();

router.get("/", async (req, res) => {
    Post.findAll({
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                console.log("No posts found!")
                return
            }
            console.log("Post data: " + JSON.stringify(dbPostData))
            const postData = dbPostData.map((r) => (r.toJSON()))
            res.render("home", { postData })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

router.get("/login", async (req, res) => {
    try {
        res.render("login")
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.get("/dashboard", async (req, res) => {
    try {
        res.render("dashboard")
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

module.exports = router;