const { Post } = require("../models");

const router = require("express").Router();

router.get("/", async (req, res) => {
    Post.findAll({})
        .then(dbPostData => {
            if (!dbPostData) {
                console.log("No posts found!")
                return
            }
            console.log("Post data: " + JSON.stringify(dbPostData))
            const postData = dbPostData.map( (r) => ( r.toJSON() ) )
            res.render("home", { postData })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

module.exports = router;