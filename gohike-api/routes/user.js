const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/:sessionToken', async (req, res) => {
    try {
        const sessionToken = req.params.sessionToken
        let userData = await User.getUserInfo(sessionToken)
        res.status(201).json({ user: userData })
    } catch {
        res.status(400).json({ msg: "Could not retrieve user info." })
    }
    
})

router.get('/posts/:sessionToken', async (req, res) => {
    try {
        const sessionToken = req.params.sessionToken
        let posts = await User.getUserPosts(sessionToken)
        res.status(201).json({ posts })
    } catch (err){
        console.log(err)
        res.status(400).json({ msg: "Could not retrieve user posts." })
    }
    
})

router.put('/profilePhoto', async (req, res) => {
    try {
        let sessionToken = req.body.sessionToken
        let picture = req.body.picture

        await User.changeProfilePicture(sessionToken, picture)
        res.status(201).json( { msg: "Changed profile photo" } )
    } catch {
        res.status(400).json( { msg: "Failed to change profile photo" } )
    }

})

router.put('/coverPhoto', async (req, res) => {
    try {
        let sessionToken = req.body.sessionToken
        let picture = req.body.picture

        await User.changeCoverPicture(sessionToken, picture)
        res.status(201).json( { msg: "Changed cover photo" } )
    } catch {
        res.status(400).json( { msg: "Failed to change cover photo" } )
    }
})

router.get('/view/:username', async (req, res) => {
    try {
        const username = req.params.username
        let userData = await User.getViewUserInfo(username)
        res.status(201).json({ user: userData })
    } catch {
        res.status(400).json({ msg: "Could not retrieve user info." })
    }
    
})

router.get('/view/posts/:username', async (req, res) => {
    try {
        const username = req.params.username
        let posts = await User.getViewUserPosts(username)
        res.status(201).json({ posts })
    } catch {
        res.status(400).json({ msg: "Could not retrieve user posts." })
    }
    
})

router.put('/addFriend', async (req, res) => {
    try {
        const sessionToken = req.body.sessionToken
        const username = req.body.username
        await User.sendFriendRequest(sessionToken, username)
        res.status(201).json({ msg: "Sent friend request"})
    } catch {
        res.status(400).json({ msg: "Could not send friend request." })
    }
    
})

router.put('/acceptFriend', async (req, res) => {
    try {
        const sessionToken = req.body.sessionToken
        const username = req.body.username
        await User.acceptFriendRequest(sessionToken, username)
        res.status(201).json({ msg: "Accepted friend request"})
    } catch {
        res.status(400).json({ msg: "Could not accept friend request." })
    } 
})

router.put('/declineFriend', async (req, res) => {
    try {
        const sessionToken = req.body.sessionToken
        const username = req.body.username
        await User.declineFriendRequest(sessionToken, username)
        res.status(201).json({ msg: "Declined friend request"})
    } catch {
        res.status(400).json({ msg: "Could not decline friend request." })
    } 
})

module.exports = router;