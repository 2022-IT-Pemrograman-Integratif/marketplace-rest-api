const express = require('express');
const db = require('../config/db');
const adminrouter = express.Router();

const {
    hashSync,
    genSaltSync,
    compareSync
} = require("bcrypt");

adminrouter.delete('/:id', async (req, res, next) => {
    try {
        const userId = req.params.id
        //const user = await db.deleteUser(userId);
        await db.deleteUser(userId);
        res.status(200).json({
            status: "200",
            message: "User deleted"
        });
    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});

adminrouter.get('/:id', async (req, res, next) => {
    try {
        const userId = req.params.id
        //const user = await db.deleteUser(userId);
        users = await db.oneUser(userId);
        res.status(200).json({
            status: "200",
            users: users
        });

    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});

adminrouter.get('/', async (req, res, next) => {
    try {
        const users = await db.allUser("user");
        res.status(200).json({
            status: "200",
            users: users
        });
    } catch (e) {
        console.log(e);
    }
});

module.exports = adminrouter;