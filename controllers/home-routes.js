const { Post } = require("../models");
const { User } = require("../models")

const router = require("express").Router();
const withAuth = require('../utils/auth');

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
            res.render("home", { postData, loggedIn: req.session.loggedIn })
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

router.get("/dashboard", withAuth, async (req, res) => {
    Post.findAll({
        where: [{
            user_id: req.session.user_id
        }],
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
            res.render("dashboard", { postData, loggedIn: req.session.loggedIn })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

module.exports = router;