const { Post } = require("../models")
const { User } = require("../models")
const { Comment } = require("../models")

const router = require("express").Router()
const withAuth = require('../utils/auth')

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
            res.render("home", { postData, loggedIn: req.session.loggedIn, username: req.session.username })
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
            res.render("dashboard", { postData, loggedIn: req.session.loggedIn, username: req.session.username })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

router.get("/singlepost/:id", withAuth, async (req, res) => {
    Post.findOne({
        where: [{
            id: req.params.id
        }],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    }
                ]
            }
        ]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                console.log("Post not found!")
                return
            }
            console.log("Post data: " + JSON.stringify(dbPostData))
            const postData = dbPostData.toJSON()
            let userCreatedPost = false;
            if (dbPostData.user_id === req.session.user_id) {
                userCreatedPost = true
            }
            res.render("singlepost", { postData, loggedIn: req.session.loggedIn, username: req.session.username, userCreatedPost })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

module.exports = router